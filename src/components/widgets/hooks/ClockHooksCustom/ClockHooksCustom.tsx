import React, { useState } from 'react';

import { useIntervalJS } from '../../../../hooks/useIntervalJS';
import { useTimeElapsedHook } from '../../../../hooks/useTimeElapsedHook';

// making setInterval declarative with react hooks

export const ClockHooksCustom = () => {

  const [countA, setCountA] = useState(33);
  useIntervalJS(() => { setCountA(countA + 1); } , 1000);

  const [countB, setCountB] = useState(127);
  useIntervalJS(() => { setCountB(countB + 1); } , 2000);

  const [clickedCount, setClickedCount] = useState(0);

  const { startTime, setTheStartTime, startTimeElapsed, pauseTimeElapsed } = useTimeElapsedHook(Date.now(), null);

  return (
    <>
      <div>Counter A: {countA}</div>
      <div>-----------------------------------</div>
      <div>-----------------------------------</div>

      <div>Counter B: {countB}</div>
      <div>-----------------------------------</div>
      <div>-----------------------------------</div>

      <div>You clicked me {clickedCount} times</div>
      <div>
        <button onClick={ () => setClickedCount(clickedCount + 1) }>
          Click me
        </button>
      </div>
      <div>-----------------------------------</div>
      <div>-----------------------------------</div>

      <div>Start Time: {startTime}</div>
      <div>
        <button onClick={setTheStartTime}>
          Set Start Time ('Date()' in milliseconds)
        </button>
      </div>
      <div>-----------------------------------</div>
      <div>
        <button onClick={startTimeElapsed}>
          Start Time Elapsed (interval delay 1ms)
        </button>
      </div>
       <div>-----------------------------------</div>
      <div>
        <button onClick={pauseTimeElapsed}>
          Pause Time Elapsed
        </button>
      </div>
    </>
  );
}
