import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';

import { Footer } from '../../components';
import { InfoBar } from '../../components';
import { ReadmeModal } from '../../components';
import { FontsModal } from '../../components';

// import UseMemoTest from '../../components/widgets/hooks/UseMemoTest/UseMemoTest';

import config from '../../../config/config';

// memoizing selectors
// https://github.com/reduxjs/reselect

const App = (props) => {

  console.log('>>>>>>>>>>>>>>>>>>>>>>>> App > props: ', props);

  const online = useSelector(state => state.online);
  const userAgent = useSelector(state => state.device.userAgent);
  const isBot = useSelector(state => state.device.isBot);

  console.log('>>>>>>>>>>>>>>>>>>>>>>>> App > online    ????: ', online);
  console.log('>>>>>>>>>>>>>>>>>>>>>>>> App > userAgent ????: ', userAgent);
  console.log('>>>>>>>>>>>>>>>>>>>>>>>> App > isBot     ????: ', isBot);

  const styles = require('./styles/App.scss');
  const stylesCSS = require('./css/AppCss1.css');

  return (

    <HelmetProvider>

      <div className={`bg-danger ${styles.app}`}>

        <Helmet {...config.app.head} />

        {/* ------------- Bootstrap Navbar ------------- */}

        {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"> */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

          <div className="container">

            <Link to='/' className="navbar-brand js-scroll-trigger">Election App</Link>

            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarResponsive">

              <ul className="navbar-nav mr-auto">

                <li className="nav-item">
                  <a className="nav-link" data-toggle="modal" href="#ReadmeModal">README.js</a>
                </li>

                <li className="nav-item">
                  <Link to='/login' className="nav-link js-scroll-trigger">
                    <span className={`fas fa-fw fa-sign-in-alt ${styles.sharedVarColorRutgersScarletXX}`}></span>Login</Link>
                </li>

                <li className="nav-item">
                  <Link to='/register' className="nav-link js-scroll-trigger">Register</Link>
                </li>

                <li className="nav-item">
                  <a className="nav-link font-old-english" data-toggle="modal" data-target=".fontsModal" href="#">Fonts</a>
                </li>

                <li className="nav-item">
                  <a className="nav-link font-norwester" href="#">
                    <span className={`fas fa-fw fa-headphones ${styles.colorGoldLocal}`}></span><span className={styles.testColorFont}>Headphones!</span></a>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="dropdown02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Interesting Links</a>
                  <div className="dropdown-menu" aria-labelledby="dropdown02">
                    <Link to='/about' className="dropdown-item js-scroll-trigger">About</Link>
                    <Link to='/aboutone' className="dropdown-item js-scroll-trigger">About One</Link>
                    <Link to='/abouttwo' className="dropdown-item js-scroll-trigger">About Two</Link>
                    <Link to='/aboutthree' className="dropdown-item js-scroll-trigger">About Three</Link>
                    <Link to='/aboutfour' className="dropdown-item js-scroll-trigger">About Four</Link>
                    <Link to='/stickyfooter' className="dropdown-item js-scroll-trigger">StickyFooter</Link>
                    <Link to='/grapiqlexample' className="dropdown-item js-scroll-trigger">GraphiQL Example</Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* ------------- Main Content ------------- */}

        <div className="bg-warning">
          {renderRoutes(props.route.routes)}
        </div>

        {/* --------------- UseMemoTest ---------------- */}

        {/* <UseMemoTest className='hello' letters="hello there" /> */}

        {/* ------------- Device State ----------- */}

        <div className="d-flex justify-content-center">
          <div className="bg-color-ivory text-center m-2">
            <div className="color-olive font-opensans-bold-webfont">{`'online' store state is ${online} !`}</div>
            <div className="color-crimson font-philosopher-bold-webfont">{`device 'userAgent' store state is ${userAgent} !`}</div>
            <div className="color-orangered font-norwester">{`device 'bot' store state is ${isBot} !`}</div>
            <div className={stylesCSS.colorGreenyellowCssLocal}>stylesCSS.colorGreenyellowCssLocal</div>
          </div>
        </div>

        {/* --------------- InfoBar ---------------- */}

        <InfoBar />

        {/* --------------- Footer ----------------- */}

        <Footer 
          footer={styles.footer} 
          flexContainer={styles.flexContainer} 
          colorGoldLocal={styles.colorGoldLocal}
          complexProp={
            {
              "categories": [{
                "size": "large",
                "color": "brown",
              }]
            }
          }
        />

        {/* --------------- Modals ----------------- */}

        <ReadmeModal />

        <FontsModal 
          styles={ styles }
        />

      </div>
    </HelmetProvider>
  );
}

export default App;
