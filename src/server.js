import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { Router, StaticRouter } from 'react-router';
import { createMemoryHistory } from 'history';
import { renderRoutes } from 'react-router-config';
// import { CookieStorage, NodeCookiesWrapper } from 'redux-persist-cookie-storage';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { HelmetProvider } from 'react-helmet-async';
import serialize from 'serialize-javascript';
import axios from 'axios';
import fetch from 'node-fetch';

import asyncGetPromises from './utils/asyncGetPromises';

import routes from './routes';
import configureStore from './redux/configureStore';
import initialStatePreloaded from './redux/initial-preloaded-state';
import { getUserAgent, isBot } from './utils/device';

import Html from './helpers/Html';
import apiClient from './helpers/apiClient';

import {
	ApolloProvider,
	ApolloClient,
	createHttpLink,
	InMemoryCache,
	gql
} from '@apollo/client';
// import { SchemaLink } from '@apollo/link-schema';
import { getDataFromTree } from 'react-apollo';

/* eslint-disable consistent-return */

// -------------------------------------------------------------------

export default ({ clientStats }) => async (req, res) => {
	req.counterPreloadedState = Math.floor(Math.random() * (100 - 1)) + 1;
	req.userAgent = getUserAgent(req.headers['user-agent']);
	req.isBot = isBot(req.headers['user-agent']);

	const history = createMemoryHistory({ initialEntries: [req.originalUrl] });

	const preloadedState = initialStatePreloaded(req);

	const providers = {
		client: apiClient(req),
	};

	const store = configureStore({
		history,
		data: { ...preloadedState },
		helpers: providers,
	});

	// =====================================================
	// URI pointing to the backend GraphQL endpoint that Apollo Client will communicate with
	// "ssrMode": Apollo Client for SSR, set to true for 'getDataFromTree' function
	// "link":  Apollo Client Link instance to serve as its network layer
	// "cache": Apollo Client Cache instance to handle caching strategy
	// "ssrForceFetchDelay": A time interval before Apollo Client force-fetches queries after SSR render
	// "queryDeduplication": set to false to force all created queries to be sent to server, 
	// 		even if a query with completely identical parameters (query, variables, operationName) is already in flight
	// "defaultOptions": provide to set application-wide default values for options 'watchQuery', 'query', and mutate functions
	// "ObservableQuery"
	// *** override any default option in 'defaultOptions' by providing a different value for the same option in individual function calls
	// useQuery: called when components are mounted

	// GraphQL axios HTTP request
	// Fetching Data from a GraphQL API
	// Forming Calls with GraphQL

	//	The `HttpLink` constructor accepts the following options:
	//		uri:               A string endpoint or function that resolves to the GraphQL server you want to execute operations against. (default: `/graphql`)
	//		includeExtensions: If `true`, you can pass an `extensions` field to your GraphQL server. (default: `false`)
	//		fetch:             A `fetch`-compatible API for making a request. See [Providing a `fetch` replacement for certain environments](#providing-a-fetch-replacement-for-certain-environments).
	//		headers:           An object containing header names and values to include in each request.
	//		credentials:       A string representing the credentials policy to use for the `fetch` call. (valid values: `omit`, `include`, `same-origin`)
	//		fetchOptions:      Include this to override the values of certain options that are provided to the `fetch` call.
	//		useGETForQueries:  If `true`, `HttpLink` uses `GET` requests instead of `POST` requests to execute query operations (but not mutation operations). (default: `false`)

	//	########## Providing a `fetch` replacement for certain environments ##########
	//		`HttpLink` requires that `fetch` is present in your runtime environment. 
	//		This is the case for React Native and most modern browsers. 
	//		If you're targeting an environment that _doesn't_ include `fetch` (such as older browsers or the server), 
	//			you need to pass your own `fetch` to `HttpLink` via its [constructor options](#constructor-options). 
	//		We recommend [`unfetch`](https://github.com/developit/unfetch) for older browsers 
	//			and [`node-fetch`](https://github.com/bitinn/node-fetch) for Node.js.
	//		fetchOptions
	//		customFetch

	const clientApollo = new ApolloClient({
		ssrMode: true,
		link: createHttpLink({
			uri: 'http://localhost:4000/graphql',
			fetch: fetch,
		}),
		cache: new InMemoryCache(),
	});
	// =====================================================

	function hydrate(a) {
		res.write('<!doctype html>');
		ReactDOM.renderToNodeStream(<Html assets={a} store={store} />).pipe(res);
	}

	try {

		await asyncGetPromises(routes, req.path, store);

		// -------------------------------------------------------------------

		await clientApollo.query({query: gql`{
				__schema {
					types {
						name
						kind
						description
						fields {
							name
						}
					}
				}
			}
		`});

		await clientApollo.query({query: gql`query {droid(id: 2001) {name}}`});
		await clientApollo.query({query: gql`query {droid(id: 2000) {name}}`});

		// -------------------------------------------------------------------

		const helmetContext = {};
		const context = {};

		const component = (
			<HelmetProvider context={helmetContext}>
				<ApolloProvider client={clientApollo}>
					<Provider store={store} {...providers}>
						<Router history={history}>
							<StaticRouter location={req.originalUrl} context={context}>
								{renderRoutes(routes)}
							</StaticRouter>
						</Router>
					</Provider>
				</ApolloProvider>
			</HelmetProvider>
		);

		// -------------------------------------------------------------------

		// The `getDataFromTree` function takes your React tree, determines which queries are needed to render them, and then fetches them all. 
		// It does this recursively down the whole tree if you have nested queries. 
		// It returns a promise which resolves when the data is ready in your Apollo Client store.

		// At the point that the promise resolves, your Apollo Client store will be completely initialized, 
		//   which should mean your app will now render instantly (since all queries are prefetched) and 
		//   you can return the stringified results in the response:

		await getDataFromTree(component);
		// await Promise.all([getDataFromTree(component)]);

		const content = ReactDOM.renderToString(component);
		const assets = flushChunks(clientStats, { chunkNames: flushChunkNames() });
		// const status = context.status || 200;

		if (__DISABLE_SSR__) {
			return hydrate(assets);
		}

		if (context.url) {
			return res.redirect(301, context.url);
		}

		const { location } = history;

		const loc = location.pathname + location.search;
		if (decodeURIComponent(req.originalUrl) !== decodeURIComponent(loc)) {
			return res.redirect(301, location.pathname);
		}

		const reduxStore = serialize(store.getState());

		const graphqlInitialState = serialize(clientApollo.extract());

		const html = <Html assets={assets} content={content} store={reduxStore} graphqlState={graphqlInitialState} />;

		const ssrHtml = `<!DOCTYPE html><html lang="en-US">${ReactDOM.renderToString(html)}</html>`;
		res.status(200).send(ssrHtml);
	} catch (error) {
		res.status(500);
		hydrate(flushChunks(clientStats, { chunkNames: flushChunkNames() }));
	}
};
