import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
import { load } from '../../redux/modules/infoAlertFour';
import Loading from '../../components/Loading/Loading';

@connect(
  (state) => ({ 
    data: state.infoAlertFour.data,
    loading: state.infoAlertFour.loading,
    error: state.infoAlertFour.error,
    errorResponse: state.infoAlertFour.errorResponse,
  }),
  { load }
)

class AboutFour extends Component {

  render() {

    const { data, loading, load, error, errorResponse } = this.props;

    console.log('>>>>>>>>>>>>>>>>>>>>>>>> AboutFour > this.props: ', this.props);

    const aboutImageMain = require('../../theme/images/about-750-450.png');
    const aboutImageOurCustomers = require('../../theme/images/about-500-300.png');
    const styles = require('./scss/AboutFour.scss');

    return (

      <div className="container">

        <Helmet title="About Four" />

        <h1 className={styles.uniqueColor}>About Four</h1>

        {/* (>>>>>>>>>>>>>>>>>>>>>> NEW STUFF >>>>>>>>>>>>>>>>>>>>>>>>) */}

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
                <div className="card-title">
                  <h5>InfoBar AboutFour message: '<span>{data ? data.message : 'no message!'}</span>'</h5>

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

        {/* (>>>>>>>>>>>>>>>>>>>>>> OLD STUFF >>>>>>>>>>>>>>>>>>>>>>>>) */}

        <h2 className="font-tester-font2">Our Team</h2>

        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="card h-100 text-center">
              <img className="card-img-top" src={aboutImageMain} alt="" />
              <div className="card-body">
                <h4 className="card-title">Team Member</h4>
                <h6 className="card-subtitle mb-2 text-muted">Position</h6>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus aut mollitia eum ipsum fugiat odio officiis odit.</p>
              </div>
              <div className="card-footer">
                <a href="#">name@example.com</a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="card h-100 text-center">
              <img className="card-img-top" src={aboutImageMain} alt="" />
              <div className="card-body">
                <h4 className="card-title">Team Member</h4>
                <h6 className="card-subtitle mb-2 text-muted">Position</h6>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus aut mollitia eum ipsum fugiat odio officiis odit.</p>
              </div>
              <div className="card-footer">
                <a href="#">name@example.com</a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="card h-100 text-center">
              <img className="card-img-top" src={aboutImageMain} alt="" />
              <div className="card-body">
                <h4 className="card-title">Team Member</h4>
                <h6 className="card-subtitle mb-2 text-muted">Position</h6>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus aut mollitia eum ipsum fugiat odio officiis odit.</p>
              </div>
              <div className="card-footer">
                <a href="#">name@example.com</a>
              </div>
            </div>
          </div>
        </div>

        <h2 className="font-tester-font2">Our Customers</h2>
        <div className="row">
          <div className="col-lg-2 col-sm-4 mb-4">
            <img className="img-fluid" src={aboutImageOurCustomers} alt="" />
          </div>
          <div className="col-lg-2 col-sm-4 mb-4">
            <img className="img-fluid" src={aboutImageOurCustomers} alt="" />
          </div>
          <div className="col-lg-2 col-sm-4 mb-4">
            <img className="img-fluid" src={aboutImageOurCustomers} alt="" />
          </div>
          <div className="col-lg-2 col-sm-4 mb-4">
            <img className="img-fluid" src={aboutImageOurCustomers} alt="" />
          </div>
          <div className="col-lg-2 col-sm-4 mb-4">
            <img className="img-fluid" src={aboutImageOurCustomers} alt="" />
          </div>
          <div className="col-lg-2 col-sm-4 mb-4">
            <img className="img-fluid" src={aboutImageOurCustomers} alt="" />
          </div>
        </div>

      </div>

    );
  }
};

export default AboutFour;
