// Actions
// -------------------
const LOAD = 'redux-example/lineChart/LOAD';
const LOAD_SUCCESS = 'redux-example/lineChart/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/lineChart/LOAD_FAIL';

const ADD_NEW_DATA_LOAD = 'redux-example/lineChart/ADD_NEW_DATA_LOAD';
const ADD_NEW_DATA_LOAD_SUCCESS = 'redux-example/lineChart/ADD_NEW_DATA_LOAD_SUCCESS';
const ADD_NEW_DATA_LOAD_FAIL = 'redux-example/lineChart/ADD_NEW_DATA_LOAD_FAIL';

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
      return {
        ...state,
        loading: true,
      };

    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        errorResponse: {message:'', documentation_url:''},
        data: action.result.values,
      };

    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: true,
        errorResponse: action.result,
      };

    case ADD_NEW_DATA_LOAD:
      return {
        ...state,
        loading: true,
      };

    case ADD_NEW_DATA_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        // loaded: true,
        error: false,
        errorResponse: {message:'', documentation_url:''},
        data: action.result.data,
      };

    case ADD_NEW_DATA_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        // loaded: false,
        error: true,
        errorResponse: {message: action.error.message, documentation_url:''},
      };

    default:
      return state;
  }
}

// Actions (action creators)
// -------------------------------------------------------------------------------------
export function loadFunc(req) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: ({ client }) => client.get(req.request)
  };
};

export function addNewDataFunc(req) {
  return {
    types: [ADD_NEW_DATA_LOAD, ADD_NEW_DATA_LOAD_SUCCESS, ADD_NEW_DATA_LOAD_FAIL],
    promise: () => postRequestConcatExportASYNC('resolve', true, 1600, req)
      .then(result => {
        result.message += ' P4,'
        return result;
      })
      .then(result => {
        result.message += ' P5,'
        return result;
      })
      .then(
        result => {
          result.message += ' P6.'
          return result;
        }, 
        error => {
          return Promise.reject(error);
          throw error;
        }
      )
      // .catch(error => {
      //   console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > redux > Action > addNewDataFunc() > CATCH:ERROR:', error);
      //   return Promise.reject(error);
      //   throw error;
      // })
  };
}
