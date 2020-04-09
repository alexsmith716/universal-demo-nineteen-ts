import React, { Component } from 'react';

class Clock extends Component {

  constructor(props) {
    super(props);

    this.state = {
      time: new Date(),
    };
  }

  componentDidMount() {
    // register function to be invoked repeatedly after elapse of 1 sec
    this.timerID = setInterval( () => this.callbackFunction(), 1000 );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  callbackFunction = () => this.setState({ time: new Date(), });

  render() {

    const t = this.state.time.toLocaleTimeString();

    return (
      <>
        {t}
      </>
    );
  }
}

export default Clock;
