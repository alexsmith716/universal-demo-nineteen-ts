import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';

import RegisterForm from '../../components/RegisterForm/RegisterForm';


class Register extends Component {

  render() {

    const styles = require('./scss/Register.scss');

    return (

      <div className="container">

        <Helmet title="Join Election App" />

        <div className={styles.registerContainer}>

          <div className="d-flex justify-content-center">

            <div className={styles.register}>

              <div className={`mb-3 ${styles.formTitle}`}>
                <p>
                  Join Election App
                </p>
              </div>

              <div className={styles.formContainer}>

                <RegisterForm onSubmit="" />

              </div>

            </div>

          </div>

        </div>

      </div>
    );
  }
}

export default Register;
