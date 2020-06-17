// Actions
// -------------------
const LOAD = 'redux-example/infoTEST/LOAD';
const LOAD_SUCCESS = 'redux-example/infoTEST/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/infoTEST/LOAD_FAIL';

// import { postRequestConcatExportASYNC } from '../../utils/mockAPI';
// import { postRequestConcatExportASYNC } from '../../utils/mockSERVER';

const initialState = {
	loaded: false,
	data: null,
};

// Reducer
// -------------------
export default function reducer(state = initialState, action = {}) {

	switch (action.type) {

		case LOAD:
			console.log('>>>>>>>>>>>>>>>> infoTEST > LOAD > REDUCER > state: ', state);
			console.log('>>>>>>>>>>>>>>>> infoTEST > LOAD > REDUCER > action: ', action);
			return {
				...state,
				loading: true,
			};

		case LOAD_SUCCESS:
			console.log('>>>>>>>>>>>>>>>> infoTEST > LOAD_SUCCESS > REDUCER > state: ', state);
			console.log('>>>>>>>>>>>>>>>> infoTEST > LOAD_SUCCESS > REDUCER > action: ', action);
			return {
				...state,
				loading: false,
				loaded: true,
				data: action.result,
			};

		case LOAD_FAIL:
			console.log('>>>>>>>>>>>>>>>> infoTEST > LOAD_FAIL > REDUCER > state: ', state);
			console.log('>>>>>>>>>>>>>>>> infoTEST > LOAD_FAIL > REDUCER > action: ', action);
			return {
				...state,
				loading: false,
				loaded: false,
				// error: action.error,
				error: true,
				errorResponse: {message: action.error.message, documentation_url:''},
			};

		default:
			return state;
	}
}

// Actions (action creators)
// -------------------
export function isLoaded(globalState) {
	return globalState.infoTEST && globalState.infoTEST.loaded;
}

export function load() {
	console.log('>>>>>>>>>>>>>>>> REDUX > infoTEST > load() +++++++++++++++++++++++++++');
	let location = 'https://api.github.com/feeds';
	// let location = 'https://www.metaweather.com/api/location/2459115/';
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: ({ client }) => client.get('https://api.github.com/feeds')
			.then(
				result => {
					console.log('>>>>>>>>>>>>>>>> infoTEST > load() > THEN > RESULT: ', result);
					return result;
				}, 
			)
	};
};
