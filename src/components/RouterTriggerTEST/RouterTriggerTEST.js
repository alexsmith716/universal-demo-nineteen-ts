import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Route, useLocation } from 'react-router';
import { hot } from 'react-hot-loader/root';

const RouterTriggerTEST = (props) => {
	const { triggerProp } = props;
	const { children } = props;
	const location = useLocation();
	const [needTrigger, setNeedTrigger] = useState(false);
	// const [prevLocationState, setPreviousLocationState] = useState(props.location);
	const [locationState, setLocationState] = useState(null);
	const [prevLocationState, setPreviousLocationState] = useState(null);
	// const {location: { pathname, search }} = props;

	const navigated = !locationState || `${location.pathname}${location.search}` !== `${locationState.pathname}${locationState.search}`;

	if (navigated) {
		console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST 1111 > getDerivedStateFromProps() > navigated TRUE: ', navigated);
		setLocationState(location);
		setPreviousLocationState(locationState || location);
		// initiate an effect on 'needTrigger'
		setNeedTrigger(true);
	}

	useEffect(
		() => {
			// componentDidMount
			console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST 2222 > useEffect() > (componentDidMount) > navigated: ', navigated);
			console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST 3333 > useEffect() > (componentDidUpdate) > needTrigger ???: ', needTrigger);
			// componentDidUpdate
			if (needTrigger) {
				setNeedTrigger(false);
			}
			// componentDidUpdate
			if (!needTrigger) {
				triggerProp(location.pathname)
					.catch(err => console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST 4444 > useEffect() > (componentDidUpdate) > triggerProp > ERROR:', err))
					.then(() => {
						console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST 5555 > useEffect() > (componentDidUpdate) > triggerProp > SUCCESS');
						// clear previousLocation so the next screen renders
						setPreviousLocationState(null);
					});
			}
			// componentWillUnmount
			return () => {
				// some effects might require cleanup
				console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST 6666 > useEffect() > (componentWillUnmount) > cleanup phase');
			};
		},
		[needTrigger, location.pathname, navigated, triggerProp] // only re-run the effect if an array item changes
	);
	// ================================================================================
	return <Route location={prevLocationState || location} render={() => children} />;
}

export default hot(RouterTriggerTEST);
