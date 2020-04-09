import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Loading extends Component {

  static propTypes = {
    text: PropTypes.string,
  };

  static defaultProps = {
    text: 'Loading'
  };

  componentDidMount() {
    //
  }

  componentWillUnmount() {
    //
  }

  render() {

    const { text } = this.props;
    const styles = require('./scss/Loading.scss');

    return (

      <div className="alert alert-warning text-center mb-0" role="alert">{ text }<span className={styles.one}>.</span><span className={styles.two}>.</span><span className={styles.three}>.</span></div>

    );
  }
}

export default Loading;
