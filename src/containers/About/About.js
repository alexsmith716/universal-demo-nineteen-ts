import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';

class About extends Component {

  state = {
    toggleComponentsOurCustomersState: true,
  };

  handleToggleOurCustomersState = () => {
    const { toggleComponentsOurCustomersState } = this.state;
    this.setState({ toggleComponentsOurCustomersState: !toggleComponentsOurCustomersState });
  }

  render() {

    const { toggleComponentsOurCustomersState } = this.state;

    const aboutImageMain = require('../../theme/images/about-750-450.png');
    const aboutImageOurCustomers = require('../../theme/images/about-500-300.png');
    const styles = require('./scss/About.scss');

    return (

      <div className="container">

        <Helmet title="About Us" />

        <h1 className={styles.aboutUniqueColor}>About Election App 2020</h1>

        <div className="row">
          <div className="col-lg-6">
            <img className="img-fluid rounded mb-4" src={aboutImageMain} alt="" />
          </div>
          <div className="col-lg-6">
            <p>
              <i>Election App 2020</i> is meeting place for the 2020 Primary! Cast your vote of opinion and discuss what's going on. Currently, the app is an evolving JS playground.
            </p>
            <p>
              Why? Because I really enjoy the challenge and reward of modern JavaScript development. Instead of creating alot of small projects with a single focus, I just keep building upon this one. I have spent many, many, hours working on this "app" and therefore various aspects of modern JS development. I am no expert on this stuff and am occasionally very humbled by how complex the work is.
            </p>
            <p>
              Initially inspired by Erik Rasmussen's, <a href="https://github.com/erikras" rel="nofollow">@erikras</a> and Kévin Berthommier's, <a href="https://github.com/bertho-zero" rel="nofollow">@bertho-zero</a> <a href="https://github.com/bertho-zero/react-redux-universal-hot-example" rel="nofollow">react-redux-universal-hot-example</a>. I have since directly used a few components and pieces of code from the original ("RouterTrigger.js", "configureStore.js") but have also re-worked and built out a fair amount as well including the app build process, webpack development build and css modules. I'm actually not 100% sure if the different approaches I used in my code are better than the original app's but it helps in better understanding what is going on with node, server/client, universal rendering, sync/async, transpiling, webpack, scss and bascially everything JavaScript.
            </p>
            <p>
              Component "clientMiddleware.js" is interesting because that amazingly simple and effective solution goes back to the genius himself <a href="https://github.com/reduxjs/redux/issues/99#issuecomment-112212639" rel="nofollow">Best async serverside loading technique?</a>
            </p>
            <p>
              Learn more about the app here <a href="#ReadmeModal" data-toggle="modal">README.js</a>
            </p>
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

        <h2 className="color-salmon font-tester-font2">Demo Component State By Toggling Our Customers!</h2>

        <div className="row">
          <div className="col-12 my-4 mb-4">
            <button onClick={this.handleToggleOurCustomersState} className={`btn btn-${toggleComponentsOurCustomersState ? 'success' : 'danger'}`} >{toggleComponentsOurCustomersState ? 'They\'re All Here!' : 'Now they\'re Gone! But just make sure they always keep coming back!'}</button>
          </div>
        </div>

        {toggleComponentsOurCustomersState && (
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
          )}
      </div>
    );
  }
}

export default About;
