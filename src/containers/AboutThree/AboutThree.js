import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
import { load } from '../../redux/modules/infoAlertThree';
import Loading from '../../components/Loading/Loading';
// import { DragAndDrop } from '../../components';

@connect(
  (state) => ({ 
    data: state.infoAlertThree.data,
    loading: state.infoAlertThree.loading,
    error: state.infoAlertThree.error,
    errorResponse: state.infoAlertThree.errorResponse,
  }),
  { load }
)

class AboutThree extends Component {

  render() {

    const { data, loading, load, error, errorResponse } = this.props;

    const aboutImageMain = require('../../theme/images/about-750-450.png');
    const aboutImageOurCustomers = require('../../theme/images/about-500-300.png');
    const styles = require('./scss/AboutThree.scss');

    return (

      <div className="container">

        <Helmet title="About Three" />

        <h1 className={styles.uniqueColor}>About Three</h1>

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
                  <h5>InfoBar AboutThree message: '<span>{data ? data.message : 'no message!'}</span>'</h5>

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

        <h2 className="font-tester-font2">About Three Stuff</h2>

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center font-tester-font2">
                Drag And Drop Hooks!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Drag And Drop
                </h5>

                <div className="basic-outer-box padding-two-border-radius-six">

                  <div className="basic-inner-box padding-five-border-radius-three">

                    <div className="row justify-content-center">
                      <div className="col-md-auto">

                        <div className="d-flex bg-color-ivory container-padding-border-radius-2">

                          <div className="width-400 text-center">

                            <div className="row">

                              <div className="col">
                                {/* <DragAndDrop /> */}
                              </div>

                            </div>

                          </div>
                        </div>

                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">
          <div className="col-lg-6">
            <img className="img-fluid rounded mb-4" src={aboutImageMain} alt="" />
          </div>
          <div className="col-lg-6">
            <h2 className="font-tester-font2">About Three Modern Business</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed voluptate nihil eum consectetur similique? Consectetur, quod, incidunt, harum nisi dolores delectus reprehenderit voluptatem perferendis dicta dolorem non blanditiis ex fugiat.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe, magni, aperiam vitae illum voluptatum aut sequi impedit non velit ab ea pariatur sint quidem corporis eveniet. Odit, temporibus reprehenderit dolorum!</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, consequuntur, modi mollitia corporis ipsa voluptate corrupti eum ratione ex ea praesentium quibusdam? Aut, in eum facere corrupti necessitatibus perspiciatis quis?</p>
          </div>
        </div>

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
}

export default AboutThree;
