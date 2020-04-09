import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
// import { InfoBar } from '../../components';

// import { isLoaded as isInfoLoaded, load as loadInfo } from '../../redux/modules/info';
// import { isLoaded as isInfoAlertLoaded, load as loadInfoAlert } from '../../redux/modules/infoAlert';

// async function preloadData(store, getState) {
//   console.log('>>>>>>>>>>>>>>>> HOME > preloadData <<<<<<<<<<<<<<<<<<<<<<')
//   console.log('>>>>>>>>>>>>>>>> HOME > preloadData > isInfoLoaded?: ', isInfoLoaded(store.getState()))
//   if (!isInfoLoaded(store.getState())) {
//     await store.dispatch(loadInfo()).catch(() => null);
//   }
//   console.log('>>>>>>>>>>>>>>>> HOME > preloadData > isInfoAlertLoaded?: ', isInfoAlertLoaded(store.getState()))
//   if (!isInfoAlertLoaded(store.getState())) {
//     await store.dispatch(loadInfoAlert()).catch(() => null);
//   }
//   //await store.dispatch(loadInfo()).catch(() => null);
//   //await store.dispatch(loadInfoAlert()).catch(() => null);
// }
// 
// export { preloadData };

export class Home extends Component {

  render() {

    const styles = require('./scss/Home.scss');

    return (

      <div>

        <Helmet title="Home" />

        <div className={styles.masthead}>

          <div className="container">

            <h1>App 2020</h1>

            <h2 className="font-tester-font2">The Primary is right around the corner!</h2>

            <div className={styles.blurb}>What are you and others saying?</div>

            <div className={styles.blurbElipsis}>... join the conversation.</div>

            <div>
              <a className="btn btn-primary btn-lg" role="button" href="#">Sign Up Now »</a>
            </div>

          </div>

        </div>

        {/* --------------- InfoBar ---------------- */}

        {/* <InfoBar /> */}

        <div className="container">
          <div className="row mt-4">
            <div className="col-lg-4 mb-4">
              <div className="card h-100">
                <h4 className="card-header">Card Title 1</h4>
                <div className="card-body">
                  <p className="card-text">Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
                </div>
                <div className="card-footer">
                  <a href="#" className="btn btn-primary">View details »</a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-4">
              <div className="card h-100">
                <h4 className="card-header">Card Title 2</h4>
                <div className="card-body">
                  <p className="card-text colorPurpleGlobal">Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
                </div>
                <div className="card-footer">
                  <a href="#" className="btn btn-primary">View details »</a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-4">
              <div className="card h-100">
                <h4 className="card-header">Card Title 3</h4>
                <div className="card-body">
                  <p className="card-text">Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper.Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Quos quisquam, error quod sed cumque, odio distinctio velit nostrum temporibus necessitatibus</p>
                </div>
                <div className="card-footer">
                  <a href="#" className="btn btn-primary">View details »</a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
