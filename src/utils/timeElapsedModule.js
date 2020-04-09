const timeElapsedModule = () => {

  let startedTime = 0;
  let elapsedTime = 0;

  function timeSet() {
    startedTime = Date.now();
  }

  function timeElapsed() {
    return elapsedTime = (Date.now() - startedTime) / 1000;
  }

  // ------------------------------------------------------
  // API
  // ------------------------------------------------------

  return {

    setStartTime: () => {
      timeSet();
    },

    getStartTime: () => {
      return startedTime;
    },

    getSecondsElapsed: () => {
      return timeElapsed();
    },

  }
};

export default timeElapsedModule;
