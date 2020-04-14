import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';

import GraphiQLExample from '../../components/GraphiQLExample';

class StickyFooter extends Component {

  render() {

    const styles = require('./scss/StickyFooter.scss');

    return (

      <div className="container">

        <Helmet title="Sticky Footer" />

        <h1 className={styles.uniqueColor}>Sticky Footer Test!</h1>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, consequuntur, modi mollitia corporis ipsa voluptate corrupti eum ratione ex ea praesentium quibusdam? Aut, in eum facere corrupti necessitatibus perspiciatis quis?</p>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <GraphiQLExample />

        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

      </div>
    );
  }
}

export default StickyFooter;
