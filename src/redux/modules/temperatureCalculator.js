
const CELSIUS_CHANGE = 'redux-example/temperatureCalculator/CELSIUS_CHANGE';
const FAHRENHEIT_CHANGE = 'redux-example/temperatureCalculator/FAHRENHEIT_CHANGE';

const initialState = {
    temperature: '',
    scale: 'c',
};

// Reducer
export default function reducer(state = initialState, action) {

  switch (action.type) {

    case CELSIUS_CHANGE: {
      return {
        ...state,
        scale: 'c',
        temperature: action.temperature
      };
    }

    case FAHRENHEIT_CHANGE: {
      return {
        ...state,
        scale: 'f',
        temperature: action.temperature
      };
    }

    default:
      return state;
  }
}

// Action Creators
export function celsiusChange(temperature) {
  return {
    type: CELSIUS_CHANGE,
    temperature
  };
}

export function fahrenheitChange(temperature) {
  return {
    type: FAHRENHEIT_CHANGE,
    temperature
  };
}
