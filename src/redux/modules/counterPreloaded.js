// Actions
const INCREMENT_COUNTER_PRELOADED_STATE = 'redux-example/counter/INCREMENT_COUNTER_PRELOADED_STATE';
const DECREMENT_COUNTER_PRELOADED_STATE = 'redux-example/counter/DECREMENT_COUNTER_PRELOADED_STATE';

const initialState = {
  counterPreloadedState: null,
};

// Reducer
export default function reducer(state = initialState, action = {}) {

  switch (action.type) {

    case INCREMENT_COUNTER_PRELOADED_STATE:
      return {
        ...state,
        counterPreloadedState: state.counterPreloadedState + 1,
      };

    case DECREMENT_COUNTER_PRELOADED_STATE:
      return {
        ...state,
        counterPreloadedState: state.counterPreloadedState - 1,
      };

    default:
      return state
  }
}

// Action Creators
export function incrementPreloadedState() {
  return {
    type: INCREMENT_COUNTER_PRELOADED_STATE
  };
}

export function decrementPreloadedState() {
  return {
    type: DECREMENT_COUNTER_PRELOADED_STATE
  };
}
