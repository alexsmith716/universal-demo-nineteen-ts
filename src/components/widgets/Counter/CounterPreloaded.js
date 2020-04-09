import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { incrementPreloadedState, decrementPreloadedState  } from '../../../redux/modules/counterPreloaded';

// UI bindings
@connect(
  (state) => ({ count: state.counterPreloaded.counterPreloadedState }),
  (dispatch) => bindActionCreators({ incrementPreloadedState, decrementPreloadedState }, dispatch)
)

class CounterPreloaded extends Component {

  // static propTypes = {
  //   count: PropTypes.number.isRequired,
  //   incrementPreloadedState: PropTypes.func.isRequired,
  //   decrementPreloadedState: PropTypes.func.isRequired,
  // };

  render() {

    const { count, incrementPreloadedState, decrementPreloadedState } = this.props;

    return (

      <div className="text-center">
        <div className="row">

          <div className="col mb-3">
            Counter Preloaded State Clicked: {count} times.
          </div>

        </div>

        <div className="row">

          <div className="col-lg-6 col-md-6 col-sm-12 mb-lg-0 mb-md-0 mb-sm-2 mb-2">
            <button onClick={decrementPreloadedState} className="btn btn-primary">decrement counter</button>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12">
            <button onClick={incrementPreloadedState} className="btn btn-primary">increment counter</button>
          </div>

        </div>
      </div>
    );
  }
};

export default CounterPreloaded;
