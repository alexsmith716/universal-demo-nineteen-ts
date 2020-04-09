import React, { Component } from 'react';
import { connect } from 'react-redux';
import { load } from '../../redux/modules/info';
import Loading from '../Loading/Loading';

@connect(
  (state) => ({ 
    data: state.info.data,
    loading: state.info.loading,
    error: state.info.error,
    errorResponse: state.info.errorResponse,
  }),
  { load }
)

export class InfoBar extends Component {

  render() {

    const { data, loading, load, error, errorResponse } = this.props;
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> InfoBar > this.props.data: ', this.props.data);
    const styles = require('./scss/InfoBar.scss');

    return (
      <div className="d-flex justify-content-center bg-color-mediumorchid-1">
        <div className="text-center mt-2 mb-2">

          {/* (>>>>>>>>>>>>>>>>>>>>>> LOADING >>>>>>>>>>>>>>>>>>>>>>>>) */}
          {loading && (
            <Loading text="Loading" />
          )}

          {/* (>>>>>>>>>>>>>>>>>>>>>> ERROR >>>>>>>>>>>>>>>>>>>>>>>>) */}
          {error && (
            <div className="alert alert-danger text-center" role="alert">
              RENDERING ERROR
              <br/>
              <span>{`Message: ${errorResponse.message}`}</span>
              <br/>
              <span>{`Url: ${errorResponse.documentation_url}`}</span>
            </div>
          )}

          {/* (>>>>>>>>>>>>>>>>>>>>>>>> LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}
          {!loading && (
            <div>
              <div className={`card-title ${styles.infoBar}`}>
                <h5>InfoBar message: '<span className={styles.message}>{data ? data.message : 'no message!'}</span>'</h5>

                <h6>{data && new Date(data.time).toString()}</h6>

                <h6>{data && data.timeElapsed}</h6>
              </div>

              <button type="button" className="btn btn-primary" onClick={load}>
                Reload from server
              </button>
            </div>
          )}

        </div>
      </div>
    );
  }
}
