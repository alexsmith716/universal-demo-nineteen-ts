import React, { useState, useEffect } from 'react';

// type named `ClockHooksProps`
// type `ClockHooksProps` specifies the properties the component will take

interface ClockHooksProps {
  TODO_TYPEME: any;
}

// `ClockHooks` is a function that takes a `ClockHooksProps` object, and destructures it

export const ClockHooks = ({ TODO_TYPEME }: ClockHooksProps) => {

  const d = new Date();
  let timerID = TODO_TYPEME;

  // declare new state variables "time, pause"
  // && initialize the "time && pause" state "useState(initialize)"
  // function component has no "this" (can't assign or read "this.state")
  // call the 'useState' hook directly inside component "useState(false)"
  // state variables are preserved by React (normally, variables "disappear" when function exits)
  // React remembers current value between re-renders, and provides the most recent one
  // state is only created the first time a component renders
  // "useState()" returns a pair of values: the 'current state' and a 'function that updates'

  // type inference: initial value of "useState()" will infer the type for the returned pair
  const [time, setTime] = useState(d);
  // const [time, setTime] = useState({d:new Date(), interval: ''});

  const handleButtonClick = () => {
    // todo toggle
    clearInterval(timerID);
  };

  // >>>> componentDidMount and componentDidUpdate <<<<
  useEffect(() => {

    timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // return named function or arrow function from the effect
    // return function cleanup() {
    return () => {
      clearInterval(timerID);
    };
  });

  if (time === d) {
    return 'Loading...';
  } else {

    const t = time.toLocaleTimeString();

    return (
      <>
        <div>{t}</div>
        <div><button onClick={handleButtonClick}>
          Clear Time Interval
        </button></div>
      </>
    );
  }
}
