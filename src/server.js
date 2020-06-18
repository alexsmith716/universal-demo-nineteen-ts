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

import defineHeaders from './graphql/defineHeaders';

import { GetReviews, GetADroid, GetCharacter } from './graphql/queries/queries.graphql';
import * as graphqlQueries from './graphql/queries/queries.js';
import { resolvers } from './graphql/resolvers/resolvers.js';

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
	ApolloLink,
	gql,
} from '@apollo/client';

import { RestLink } from 'apollo-link-rest';
import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/react-ssr';

// -------------------------------------------------------------------

const customFetch = (uri, options) => {
	const pending = fetch(uri, {
		method: options.method,
		body: options.body,
		headers: options.headers
	})
	return pending.then((response) => {
		console.log('>>>> SERVER > customFetch > response: ', response);
		return response;
	}, (error) => {
		console.log('>>>> SERVER > customFetch > ERROR: ', error);
	})
};

const customFetchAsync = async (uri, options) => {
	console.log('>>>> SERVER > customFetchAsync > uri: ', uri);
	console.log('>>>> SERVER > customFetchAsync > options: ', options);
	const response = await fetch(uri, {
		method: options.method,
		body: options.body,
		headers: options.headers
	})
	try {
		console.log('>>>> SERVER > customFetchAsync > response: ', response);
		return response;
	} catch (error) {
		console.log('>>>> SERVER > customFetchAsync > ERROR: ', error);
	}
};

/* eslint-disable consistent-return */

// -------------------------------------------------------------------

export default ({ clientStats }) => async (req, res) => {
	req.counterPreloadedState = Math.floor(Math.random() * (100 - 1)) + 1;
	req.userAgent = getUserAgent(req.headers['user-agent']);
	req.isBot = isBot(req.headers['user-agent']);

	const history = createMemoryHistory({ initialEntries: [req.originalUrl] });

	const preloadedState = initialStatePreloaded(req);

	const providers = {
		//	app: createApp(req),
		client: apiClient(req)
	};

	const store = configureStore({
		history,
		data: { ...preloadedState },
		helpers: providers,
	});

	// =====================================================

	//	Composing a link chain:
	//	Each link should represent a self-contained modification to a GraphQL operation. 
	//	By composing these links into a chain, you can create an arbitrarily complex model for your client's data flow.

	//	There are two forms of link composition: additive and directional.
	//		* Additive composition involves combining a set of links into a serially executed chain.
	//		* Directional composition involves branching to one of multiple links, depending on the details of an operation.
	//	Directional composition: defined with the "split" method of an ApolloLink instance

	//	https://www.apollographql.com/docs/react/v3.0-beta/api/link/apollo-link-rest/
	//	setup "RestLink" instance:
	//	specify endpoint to use in the rest directive:

	//	https://github.com/afuh/rick-and-morty-api
	//	REST:			https://rickandmortyapi.com/api/
	//	GRAPHQL:	https://rickandmortyapi.com/graphql/

	defineHeaders();

	const httpLink = createHttpLink({
		uri: 'http://localhost:4000/graphql',
		// fetch: customFetchAsync,
		fetch: fetch,
	});

	const restLink = new RestLink({ 
		uri: 'https://rickandmortyapi.com/api/',
		customFetch: fetch,
	});

	const cache = new InMemoryCache();

	const errorLink = onError(({ graphQLErrors, networkError }) => {
		if (graphQLErrors) {
			graphQLErrors.map(({ message, locations, path }) =>
				console.log(`>>>> SERVER > [GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,),
			);
		}

		if (networkError) {
			console.log(`>>>> SERVER > [Network error]: ${networkError}`);
		}
	});

	//	"httpLink" is terminating so must be last, while retry & error wrap the links to their right
	//	State & context links should happen before (to the left of) restLink
	//	one of "uri" or "link" is required; if both are specified, "link" will take precedence
	const link = ApolloLink.from([
		//	authLink,
		//	restLink,
		errorLink,
		//	retryLink,
		httpLink,
	]);

	const clientApollo = new ApolloClient({
		ssrMode: true,
		cache,
		link,
		resolvers,
	});

	// =====================================================

	function hydrate(a) {
		res.write('<!doctype html>');
		ReactDOM.renderToNodeStream(<Html assets={a} store={store} />).pipe(res);
	}

	try {

		await asyncGetPromises(routes, req.path, store);

		console.log('>>>> SERVER > InMemoryCache > CACHE > cache.extract() 1: ', cache.extract());

		// ==========================================================================
		// ==========================================================================

		//	https://www.apollographql.com/docs/tutorial/local-state/
		//	https://www.apollographql.com/docs/react/data/local-state/
		//	https://www.apollographql.com/docs/react/v3.0-beta/data/local-state/

		//	implement a client side GraphQL:
		//		1) apollo-link-rest
		//		2) local resolvers

		//	Tools to manage local state:
		//		How to store and query local data in the Apollo cache:
		//			https://www.apollographql.com/docs/tutorial/local-state/

		//	"local resolvers":
		//		The same mechanisms that exist in a GraphQL server (schema paired with resolvers) are used for managing 'InMemoryCache'
		//		result closely resembles a server-side GraphQL solution
		//	resolver: to implement the local state update as a GraphQL mutation
		//	return the same type of data specified in the schema or a promise for that data

		//	write a client schema and resolvers for your local data
		//	query (client schema/local data) with @client directive

		//	-----------------------
		//	TODO:
		//	write local schema to be directly portable to a server-side (as if existed server-side)
		//	write local resolvers that fetch requested data from a REST API
		//		(wrapping a REST API on the client)
		//	-----------------------

		//	@client directive: query and update cache (InMemoryCache)

		//	https://rickandmortyapi.com/documentation/
		//	'https://rickandmortyapi.com/api/episode/'
		//	`https://rickandmortyapi.com/api/character/${ids}`
		//	`https://rickandmortyapi.com/api/episode/${id}`
		//	https://rickandmortyapi.com/api/character/6
		//	https://rickandmortyapi.com/api/character/?name=rick&status=alive
		//	https://rickandmortyapi.com/api/location/3,21

		//	const queryCharacter = await clientApollo.query({query: gql`
		//		query Character($id: ID){
		//			character(id: "1") @rest(type: "Post", path: "character/1") {
		//				id
		//				name
		//				status
		//				species
		//				type
		//				gender
		//				origin {
		//					name
		//					type
		//					dimension
		//				}
		//				location {
		//					name
		//					type
		//					dimension
		//				}
		//				image
		//				episode {
		//					name
		//					episode
		//				}
		//			}
		//		}
		//	`});

		//	console.log('>>>> SERVER > clientApollo.query > REST: ', queryCharacter);

		clientApollo.writeQuery({
			query: gql`
				query GetCartItems {
					cartItems
				}
			`,
			data: {
				cartItems: []
			}
		});

		//	const q = await clientApollo.query({
		//		fetchPolicy: 'network-only',
		//		query: gql`
		//			query {
		//				character
		//			}`
		//	}).then(result => console.log(result))

		// ==========================================================================
		// ==========================================================================

		//	prefetch data (load data into cache): "client.query"
		//	set "initialState" of data
		// -------------------------------------------------------------------
		// const qq = await clientApollo.query({ query: GetCharacter });
		// const qq = await clientApollo.query({ query: GetReviews, variables: { episode: "EMPIRE" } });
		// const qq = await clientApollo.query({ query: GetADroid, variables: { droidID: 2001 } });
		await clientApollo.query({ query: graphqlQueries.GET_HERO, });
		// await clientApollo.query({ query: graphqlQueries.GET_THE_SCHEMA, });
		// -------------------------------------------------------------------

		// console.log('>>>> SERVER > clientApollo.query: ', JSON.stringify(qq));

		//	Object.keys(q).forEach(key => {
		//		const k = q[key];
		//		console.log('>>>> SERVER > clientApollo.query > Object.keys().forEach(): ', k);
		//	});

		console.log('>>>> SERVER > InMemoryCache > CACHE > cache.extract() 2: ', cache.extract());

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
		// It does this recursively down the whole tree if you have "nested queries".
		// It returns a promise which resolves when the data is ready in your Apollo Client store.

		// At the point that the promise resolves, your Apollo Client store will be completely initialized,
		//   which should mean your app will now render instantly (since all queries are prefetched) and
		//   you can return the stringified results in the response:

		// getMarkupFromTree:
		//		returns a promise for the generated HTML, so no an extra render to get the HTML

		// await GraphQL data coming from the API server
		// determines which queries are needed to render, then fetch them all
		await getDataFromTree(component);
		// await Promise.all([getDataFromTree(component)]);

		const content = ReactDOM.renderToString(component);
		const assets = flushChunks(clientStats, { chunkNames: flushChunkNames() });

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

		console.log('>>>> SERVER > InMemoryCache > CACHE >>>>>>>>>>>>>>>>>>>: ', cache);

		const html = <Html assets={assets} content={content} store={reduxStore} graphqlState={graphqlInitialState} />;

		const ssrHtml = `<!DOCTYPE html><html lang="en-US">${ReactDOM.renderToString(html)}</html>`;
		res.status(200).send(ssrHtml);
	} catch (error) {
		console.log('>>>> SERVER > RESPONSE > ERRRRRRROOOOORRRR!!!: ', error);
		res.status(500);
		hydrate(flushChunks(clientStats, { chunkNames: flushChunkNames() }));
	}
};
