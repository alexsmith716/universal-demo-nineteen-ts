import React, { Component, createRef } from 'react';
// import PropTypes from 'prop-types';
import { bindActionCreators } from 'multireducer';
import { connect } from 'react-redux';

import Loading from '../../Loading/Loading';
import * as lineChartActions from '../../../redux/modules/lineChart';
import drawVisualization from "../../../d3/drawLineChartBasic";

@connect(
  (state, { multireducerKey: key }) => ({
    online: state.online,
    loading: state.lineChartCollection[key].loading,
    loaded: state.lineChartCollection[key].loaded,
    data: state.lineChartCollection[key].data,
    error: state.lineChartCollection[key].error,
    errorResponse: state.lineChartCollection[key].errorResponse,
  }),
  (dispatch, { multireducerKey: key }) => bindActionCreators({ ...lineChartActions }, dispatch, key)
)

class LineChart extends Component {

  constructor(props){
    super(props);
    this.containerRef = createRef();
    this.inputXValueRef = createRef();
    this.inputYValueRef = createRef();
  }

  componentDidMount() {
    const { data } = this.props;
    if (data === null) {
      const { request, loadFunc } = this.props;
      loadFunc({ request: request });
    } else {
      const containerTarget = this.containerRef.current;
      drawVisualization(data, containerTarget);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { loading, loaded, error, errorResponse, data } = this.props;
    const containerTarget = this.containerRef.current;


    if (loaded && !loading) {
      drawVisualization(data, containerTarget);
    }
  }

  handleUpdate = (e) => {
    const { data, addNewDataFunc } = this.props;

    e.preventDefault();

    let xValue = this.inputXValueRef.current;
    let yValue = this.inputYValueRef.current;

    if (xValue.value !== '' && yValue.value !== '') {

      let x = new Date(xValue.value).toUTCString();
      let y = parseInt(yValue.value);
      let newData = {x, y};

      let request = {
        data: data,
        newData: newData
      }

      addNewDataFunc(request);
    }

    this.inputXValueRef.current.value = '';
    this.inputYValueRef.current.value = '';
  };

  // ================================================================================

  render() {

    const { loading, loaded, title, data, error, errorResponse } = this.props;
    const { containerRef, inputXValueRef, inputYValueRef } = this;
    const { online } = this.props;

    return (

      <div className="d-flex justify-content-center">
        <div className="bg-color-ivory width-500">
          <div className="my-1 container-padding-border-radius-2">

            <p>{title}</p>

            {/* (>>>>>>>>>>>>>>>>>>>>>> ONLINE >>>>>>>>>>>>>>>>>>>>>>>>) */}

            {!online &&
              !loaded && (
                <div className="alert alert-danger fade show" role="alert">
                  <div className="text-center">NETWORK ERROR</div>
                </div>
            )}

            {/* (>>>>>>>>>>>>>>>>>>>>>> LOADING >>>>>>>>>>>>>>>>>>>>>>>>) */}

            {loading && (
                <Loading text="Loading" />
              )}

            {/* (>>>>>>>>>>>>>>>>>>>>>> ERROR >>>>>>>>>>>>>>>>>>>>>>>>) */}
            {/* (>>>>>>>>>>>>>>>>>>>>>> test '!loaded' vs 'loaded' >>>>>>>>>>>>>>>>>>>>>>>>) */}

            {error &&
              !loading && (

                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <div className="text-center">RENDERING ERROR<br/><span>{`Message: ${errorResponse.message}`}</span></div>
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

              )}

            {/* (>>>>>>>>>>>>>>>>>>>>>> DATA LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}

            {loaded &&
              !loading && (

                <div>

                  <div className={`svg-container mb-4`} ref={containerRef}></div>

                  <form className="form-inline" onSubmit={this.handleUpdate}>

                    <div className="form-group mb-2">
                      <label htmlFor="datePicker1" className="sr-only">Enter Time</label>
                      <input type="date" className="form-control" id="datePicker1" ref={inputXValueRef} placeholder="Enter Time" />
                    </div>
                    <div className="form-group mx-sm-3 mb-2">
                      <label className="enterValue1" className="sr-only">Enter Value</label>
                      <input type="number" className="form-control" id="enterValue1" ref={inputYValueRef} placeholder="Enter Value" />
                    </div>
                    <button type="submit" className="btn btn-primary mb-2">Submit</button>
                  </form>
                </div>

              )}

          </div>
        </div>
      </div>
    );
  }
}

export default LineChart;
