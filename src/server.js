import fs from 'fs';
import axios from 'axios';
import path from 'path';

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
// import fetch from 'cross-fetch';

import * as graphqlQueries from "./graphql/queries";
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
import { getDataFromTree } from 'react-apollo';

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

//	async function customFetchAsyncAxios (uri, options) {
//	  return new Promise(async (resolve, reject) => {
//	
//	    const writer = fs.createWriteStream(uri)
//	
//	    const response = await axios({
//	      uri,
//	      method: 'POST',
//	      data: options.body,
//	      responseType: 'stream'
//	    })
//	
//	    response.data.pipe(writer)
//	    writer.on('finish', resolve)
//	    writer.on('error', reject)
//	  })
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
			fetch: customFetchAsync,
			// fetch: fetch,
			// fetch: customFetchAsyncAxios
		}),
	});
	// =====================================================

	function hydrate(a) {
		res.write('<!doctype html>');
		ReactDOM.renderToNodeStream(<Html assets={a} store={store} />).pipe(res);
	}

	try {

		await asyncGetPromises(routes, req.path, store);

		//	await clientApollo.query({query: gql`
		//		{
		//			droid(id: 2001) {
		//				name
		//			}
		//		}
		//	`});

		await clientApollo.query({ query: graphqlQueries.GET_A_DROID, });
		// await clientApollo.query({ query: graphqlQueries. , variables: { : } });

		// -------------------------------------------------------------------

		//	await clientApollo.query({query: gql`
		//		{
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

		//	await clientApollo.query({query: gql`
		//		{
		//			droid(id: 2000) {
		//				name
		//			}
		//		}
		//	`});

		//	await clientApollo.query({query: gql`
		//		{
		//			hero {
		//				name
		//			}
		//		}
		//	`});

		//	const GetADroid = await clientApollo.query({query: gql`
		//		{
		//			droid(id: 2001) {
		//				id
		//				name
		//				appearsIn
		//				primaryFunction
		//			}
		//		}
		//	`});
		//	console.log('>>>> SERVER > await clientApollo.query > GetADroid: ', GetADroid);

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
		console.log('>>>> SERVER > RESPONSE > ERRRRRRROOOOORRRR!!!: ', error);
		res.status(500);
		hydrate(flushChunks(clientStats, { chunkNames: flushChunkNames() }));
	}
};
