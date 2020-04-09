// Actions
// -------------------
const LOAD = 'redux-example/filterableTable/LOAD';
const LOAD_SUCCESS = 'redux-example/filterableTable/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/filterableTable/LOAD_FAIL';

const DROPDOWN_CHANGE = 'redux-example/filterableTable/DROPDOWN_CHANGE';
const FILTER_TEXT_CHANGE = 'redux-example/filterableTable/FILTER_TEXT_CHANGE';
const IN_STOCK_CHANGE = 'redux-example/filterableTable/IN_STOCK_CHANGE';
const initialState = {
  loaded: false,
  data: null,
  // didInvalidate: false,
};

// Reducer
// -------------------
export default function reducer(state = initialState, action = {}) {

  switch (action.type) {

    case DROPDOWN_CHANGE:
      return {
        ...state,
        loading: true,
        dropDownOptionSelected: action.value,
      };

    case FILTER_TEXT_CHANGE:
      return {
        ...state,
        filterText: action.value,
      };

    case IN_STOCK_CHANGE:
      return {
        ...state,
        inStockOnly: action.value,
      };

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
        filterText: '',
        inStockOnly: null,
        data: action.result,
      };

    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: true,
        errorResponse: {message: action.error.message, documentation_url: action.error.documentation_url},
      };

    default:
      return state;
  }
};

// Actions (action creators)
// -------------------------------------------------------------------------------------
// load({ request: dropDownOptionSelected });
export function load(value) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: ({ client }) => client.get(value.request)
  };
};

export function actionHandleDropdownChange(prop) {
  return {
    type: DROPDOWN_CHANGE,
    value: prop.data
  };
};

export function actionFilterTextChange(prop) {
  return {
    type: FILTER_TEXT_CHANGE,
    value: prop.data
  };
};

export function actionInStockChange(prop) {
  return {
    type: IN_STOCK_CHANGE,
    value: prop.data
  };
};
