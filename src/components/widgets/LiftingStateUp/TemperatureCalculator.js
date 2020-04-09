import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'multireducer';
import { connect } from 'react-redux';
import * as temperatureCalculatorActions from '../../../redux/modules/temperatureCalculator';

import BoilingVerdict from './BoilingVerdict';
import TemperatureInput from './TemperatureInput';
import { toCelsius, toFahrenheit, tryConvert } from './stateHelpers';

@connect(
  (state, { multireducerKey: key }) => ({ 
    temperature: state.temperatureCalculatorCollection[key].temperature,
    scale: state.temperatureCalculatorCollection[key].scale,
  }),
  (dispatch, { multireducerKey: key }) => bindActionCreators(temperatureCalculatorActions, dispatch, key)
)

class TemperatureCalculator extends Component {

  static propTypes = {
    temperature: PropTypes.string.isRequired,
    scale: PropTypes.string.isRequired,
    celsiusChange: PropTypes.func.isRequired,
    fahrenheitChange: PropTypes.func.isRequired,
  };

  render() {

    const { temperature, scale, celsiusChange, fahrenheitChange } = this.props;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    const styles = require('./scss/TemperatureCalculator.scss');

    return (

      <div className="d-flex justify-content-center">
        <div className="bg-color-ivory width-400">
          <div className="my-1 container-padding-border-radius-2 text-break">
            <form>

              <TemperatureInput
                scale="c"
                temperature={ celsius }
                onTemperatureChangeProp={ celsiusChange } />

              <TemperatureInput
                scale="f"
                temperature={ fahrenheit }
                onTemperatureChangeProp={ fahrenheitChange } />

            </form>

            <BoilingVerdict celsius={ parseFloat(celsius) } />
          </div>
        </div>
      </div>
    );
  }
};

export default TemperatureCalculator;
