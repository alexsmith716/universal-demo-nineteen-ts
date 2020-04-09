// Actions
// -------------------
const LOAD = 'redux-example/infoAlertThree/LOAD';
const LOAD_SUCCESS = 'redux-example/infoAlertThree/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/infoAlertThree/LOAD_FAIL';

import { postRequestConcatExportASYNC } from '../../utils/mockAPI';

const initialState = {
  loaded: false,
  data: null,
};

// Reducer
// -------------------
export default function reducer(state = initialState, action = {}) {

  switch (action.type) {

    case LOAD:
      console.log('>>>>>>>>>>>>>>>> INFOALERTTHREE > LOAD > REDUCER > state: ', state);
      console.log('>>>>>>>>>>>>>>>> INFOALERTTHREE > LOAD > REDUCER > action: ', action);
      return {
        ...state,
        loading: true,
      };

    case LOAD_SUCCESS:
      console.log('>>>>>>>>>>>>>>>> INFOALERTTHREE > LOAD_SUCCESS > REDUCER > state: ', state);
      console.log('>>>>>>>>>>>>>>>> INFOALERTTHREE > LOAD_SUCCESS > REDUCER > action: ', action);
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
      };

    case LOAD_FAIL:
      console.log('>>>>>>>>>>>>>>>> INFOALERTTHREE > LOAD_FAIL > REDUCER > state: ', state);
      console.log('>>>>>>>>>>>>>>>> INFOALERTTHREE > LOAD_FAIL > REDUCER > action: ', action);
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
  return globalState.infoAlertThree && globalState.infoAlertThree.loaded;
}

export function load() {
  console.log('>>>>>>>>>>>>>>>> INFOALERTTHREE > load() +++++++++++++++++++++++++++');
  let location = 'https://api.github.com/feeds';
  // let location = 'https://www.metaweather.com/api/location/2459115/';
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: () => postRequestConcatExportASYNC('resolve', true, 2600)
      .then(
        result => {
          console.log('>>>>>>>>>>>>>>>> INFOALERTTHREE > load() > THEN > RESULT: ', result);
          return result;
        }, 
      )
  };
};
