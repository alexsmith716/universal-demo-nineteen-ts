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
import fetch from 'node-fetch';
import axios from 'axios';

import asyncGetPromises from './utils/asyncGetPromises';

import routes from './routes';
import configureStore from './redux/configureStore';
import initialStatePreloaded from './redux/initial-preloaded-state';
import { getUserAgent, isBot } from './utils/device';

import Html from './helpers/Html';
import apiClient from './helpers/apiClient';
// import makeAxiosRequest from './helpers/makeAxiosRequest';

import {
	ApolloProvider,
	ApolloClient,
	createHttpLink,
	InMemoryCache,
	gql
} from '@apollo/client';
// import { SchemaLink } from '@apollo/link-schema';
import { getDataFromTree } from 'react-apollo';

//	async function customFetch(uri, options) {
//		const config = {
//			url: uri, 
//			method: options.method, 
//			headers: options.headers, 
//			data: options.body
//		}
//		console.log('>>>> SERVER > customFetch > config: ', config);
//		try {
//			const response = await axios(config)
//			console.log('>>>> SERVER > customFetch > response.data: ', response.data);
//			return response.data;
//		} catch (error) {
//			console.log('>>>> SERVER > customFetch > ERROR: ', error);
//		}
//	}

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

	const clientApollo = new ApolloClient({
		ssrMode: true,
		cache: new InMemoryCache(),
		link: createHttpLink({
			uri: 'http://localhost:4000/graphql',
			fetch: fetch,
			// fetch: customFetch
		}),
	});
	// =====================================================

	function hydrate(a) {
		res.write('<!doctype html>');
		ReactDOM.renderToNodeStream(<Html assets={a} store={store} />).pipe(res);
	}

	try {

		await asyncGetPromises(routes, req.path, store);

		// -------------------------------------------------------------------

		//	await clientApollo.query({query: gql`{
		//			__schema {
		//				types {
		//					name
		//					kind
		//					description
		//					fields {
		//						name
		//					}
		//				}
		//			}
		//		}
		//	`});

		// await clientApollo.query({query: gql`query {droid(id: 2001) {name}}`});
		// await clientApollo.query({query: gql`query {droid(id: 2000) {name}}`});

		await clientApollo.query({query: gql`
			query GetHeroName {
				hero {
					name
				}
			}
		`});

		const GetADroid = await clientApollo.query({query: gql`
			query GetADroid {
				droid(id: 2001) {
					id
					name
					appearsIn
					primaryFunction
				}
			}
		`});

		console.log('>>>> SERVER > await clientApollo.query > GetADroid: ', GetADroid);

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
