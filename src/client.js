import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { createBrowserHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';

import localForage from 'localforage';
import { getStoredState } from 'redux-persist';
import { AppContainer } from 'react-hot-loader';

import {
	ApolloProvider,
	ApolloClient,
	createHttpLink,
	InMemoryCache,
	ApolloLink
} from '@apollo/client';

import { RestLink } from 'apollo-link-rest';
import { onError } from "@apollo/link-error";

import defineHeaders from './graphql/defineHeaders';

import { Provider } from 'react-redux';
import asyncGetPromises from './utils/asyncGetPromises';

// import RouterTrigger from './components/RouterTrigger/RouterTrigger';
import RouterTriggerTEST from './components/RouterTriggerTEST/RouterTriggerTEST';

import { ScrollToTop } from './components';
import routes from './routes';
import apiClient from './helpers/apiClient';
import configureStore from './redux/configureStore';
import isOnline from './utils/isOnline';
import './js/app';

const persistConfig = {
	key: 'root',
	storage: localForage,
	// redux-persist:
	// inboundState:  the state being rehydrated from storage
	// originalState: the state before the REHYDRATE action
	stateReconciler(inboundState, originalState) {
		// preloadedState from window object
		return originalState;
	},
	// redux-persist:
	whitelist: ['device', 'info', 'infoAlert', 'infoAlertThree', 'infoAlertFour'],
};

const spinnerContainer = document.createElement('div');
spinnerContainer.classList.add('d-inline-flex', 'spinner-layered', 'text-light');
// spinnerContainer.className = 'd-inline-flex spinner-layered text-light';
const dest = document.getElementById('react-root');
document.body.insertBefore(spinnerContainer, dest);

const client = apiClient();

const providers = {
	client,
};

// =====================================================

(async () => {

	// redux-persist:
	// delays rendering of app UI until persisted state has been retrieved and saved to redux
	const preloadedState = await getStoredState(persistConfig);
	const online = window.REDUX_DATA ? true : await isOnline();
	const history = createBrowserHistory();

	defineHeaders();

	const store = configureStore({
		history,
		data: {
			...preloadedState,
			...window.REDUX_DATA,
			online,
		},
		helpers: providers,
		persistConfig,
	});

	const triggerHooks = async (_routes, pathname) => {
		// console.log('>>>> CLIENT > triggerHooks > store.getState() 1111 ######: ', store.getState());
		spinnerContainer.classList.add('spinner-border');

		// Don't fetch data for initial route, server has already done the work:
		if (window.__PRELOADED__) {
			// Delete initial data so that subsequent data fetches can occur:
			console.log('>>>> CLIENT > triggerHooks > window.__PRELOADED__ YES: ', window.__PRELOADED__);
			delete window.__PRELOADED__;
		} else {
			// Fetch mandatory data dependencies for 2nd route change onwards:
			console.log('>>>> CLIENT > triggerHooks > window.__PRELOADED__ NO > await asyncGetPromises()');
			await asyncGetPromises(_routes, pathname, store);
		}

		spinnerContainer.classList.remove('spinner-border');
		// console.log('>>>> CLIENT > triggerHooks > store.getState() 2222 ######: ', store.getState());
	};

	const httpLink = createHttpLink({
		uri: 'http://localhost:4000/graphql',
	});

	const restLink = new RestLink({ 
		uri: 'http://localhost:4001/api/',
	});

	const errorLink = onError(({ graphQLErrors, networkError }) => {
		if (graphQLErrors) {
			graphQLErrors.map(({ message, locations, path }) =>
				console.log(`>>>> CLIENT > [GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,),
			);
		}

		if (networkError) {
			console.log(`>>>> CLIENT > [Network error]: ${networkError}`);
		}
	});

	const link = ApolloLink.from([
		restLink,
		errorLink,
		httpLink,
	]);

	const clientApollo = new ApolloClient({
		ssrMode: false,
		cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
		link,
	});

	const hydrate = (_routes) => {
		const element = (
			<HelmetProvider>
				<AppContainer>
					<ApolloProvider client={clientApollo}>
						<Provider store={store} {...providers}>
							{/* ---------------------------------------------------------------- */}
							<Router history={history}>
								{/* ------------- */}
								<ScrollToTop />
								{/* ------------- */}
								{/* ------------------------------------------------- */}
								<RouterTriggerTEST triggerProp={(pathname) => triggerHooks(_routes, pathname)}>
									{renderRoutes(_routes)}
								</RouterTriggerTEST>
								{/* ------------- */}
							</Router>
							{/* ---------------------------------------------------------------- */}
						</Provider>
					</ApolloProvider>
				</AppContainer>
			</HelmetProvider>
		);

		if (dest.hasChildNodes()) {
			ReactDOM.hydrate(element, dest);
		} else {
			ReactDOM.render(element, dest);
		}
	};

	hydrate(routes);

	if (module.hot) {
		module.hot.accept('./routes', () => {
			const nextRoutes = require('./routes');
			hydrate(nextRoutes.__esModule ? nextRoutes.default : nextRoutes);
		});
	}

	if (!__DEVELOPMENT__ && 'serviceWorker' in navigator) {
		try {
			const registration = await navigator.serviceWorker.register('/service-worker.js');
			// console.log('>>>> CLIENT > serviceWorker in navigator > SW Registered! > ');
			// registration
			registration.onupdatefound = () => {
				const installingWorker = registration.installing;
				installingWorker.onstatechange = () => {
					switch (installingWorker.state) {
						case 'installed':
							if (navigator.serviceWorker.controller) {
								// old content purged and fresh content added to cache
								// console.log('>>>> CLIENT > serviceWorker > new or updated content is available <<<<');
							} else {
								// precaching complete
								// console.log('>>>> CLIENT > serviceWorker > content cached for offline use <<<<');
							}
							break;
						case 'redundant':
							// console.log('>>>> CLIENT > serviceWorker > installed service worker redundant <<<<');
							break;
						default: // ignore
					}
				};
			};
		} catch (error) {
			// console.log('>>>> CLIENT > serviceWorker > Error registering service worker: ', error);
		}

		await navigator.serviceWorker.ready;
		// console.log('>>>> CLIENT > serviceWorker > SW Ready! <<<<')
		// registration.active
	} else {
		// console.log('>>>> CLIENT > !__DEVELOPMENT__ && serviceWorker in navigator NO!! <<<<');
	}
})();
