import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router';
import { hot } from 'react-hot-loader/root';

@withRouter

class RouterTrigger extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    triggerProp: PropTypes.func
  };

  static defaultProps = {
    triggerProp: () => {}
  };

  state = {
    needTrigger: false,
    location: null,
    previousLocation: null
  };

  // return an object to update the state, or null to update nothing
  static getDerivedStateFromProps(props, state) {
    const { location } = state;
    const {location: { pathname, search }} = props;

    const navigated = !location || `${pathname}${search}` !== `${location.pathname}${location.search}`;

    // console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > navigated: ', navigated);
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > location: ', location);
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > state.location: ', state.location);
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > `${pathname}${search}`: ', `${pathname}${search}`);
    if (location !== null) {
      //console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > `${location.pathname}${location.search}`: ', `${location.pathname}${location.search}`);
    }

    const v = location || props.location;

    // console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > props.location: ', props.location);
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > previousLocation: ', v);

    if (navigated) {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > navigated TRUE: ', navigated);
      return {
        needTrigger: true,
        location: props.location,
        previousLocation: location || props.location
      };
    } else {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > navigated FALSE: ', navigated);
    }
    return null;
  }

  // ==================================================================

  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > componentDidMount()');
    this.mounted = true;
    this.triggerSafeSetState();
  }
  componentDidUpdate() {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > componentDidUpdate()');
    this.triggerSafeSetState();
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  // STATE HAS CHANGED!
  // let React know if a component's output is not affected by the current change in state or props
  // The default behavior is to re-render on every state change
  // invoked before rendering when new props or state are being received
  // not called for the initial render
  // Defaults to true
  shouldComponentUpdate(nextProps, nextState) {
    const { previousLocation } = this.state;
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > shouldComponentUpdate() > nextState.previousLocation: ', nextState.previousLocation);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > shouldComponentUpdate() > previousLocation: ', previousLocation);
    const pl = nextState.previousLocation !== previousLocation;
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > shouldComponentUpdate() > ???????????: ', pl);
    // this a performance update, 'RouterTrigger' MAIN state is router LOCATION
    // do not re-render if router LOCATION has not changed (state HAS changed, but choose NOT to re-render)
    // prevent 'componentDidUpdate()' when routes match
    return nextState.previousLocation !== previousLocation;
  }

  // 'setState()' does not always immediately update the component. 
  // It may batch or defer the update until later
  // This makes reading 'this.state' right after calling 'setState()' a potential pitfall
  // Instead, use 'componentDidUpdate' or a 'setState' callback ('setState(updater, callback)'), 
  //   either of which are guaranteed to fire after the update has been applied
  // let React know if a component’s output is not affected by the current change in state or props
  safeSetState(nextState, callback) {
    if (this.mounted) {
      // console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > safeSetState() > nextState: ', nextState);
      this.setState(nextState, callback);
    }
  }

  triggerSafeSetState = () => {
    const { triggerProp, location } = this.props;
    const { needTrigger } = this.state;

    if (needTrigger) {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > triggerSafeSetState > needTrigger: ', needTrigger);

      this.safeSetState({ needTrigger: false }, () => {
        triggerProp(location.pathname)
          .catch(err => console.log('Failure in RouterTrigger:', err))
          .then(() => {
            // clear previousLocation so the next screen renders (but not before 'shouldComponentUpdate()' evaluates)
            // console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > useEffect() > triggerProp > THEN() > previousLocation: ', this.state.previousLocation);
            this.safeSetState({ previousLocation: null });
          });
      });
    }
    // ============================================================================
  };

  render() {
    const { children, location } = this.props;
    const { previousLocation } = this.state;

    //console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > render() > location: ', location);
    //console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > render() > previousLocation: ', previousLocation);

    // use a controlled <Route> to trick all descendants into
    // rendering the old location
    return <Route location={previousLocation || location} render={() => children} />;
  }
}

export default hot(RouterTrigger);
