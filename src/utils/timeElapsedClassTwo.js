const data = new WeakMap();

const timeElapsedClass = class {

  constructor() {
    data.set(this, {
      startTime: 0
    });
  }

  setStartTime() {
    data.get(this).startTime = Date.now();
  }

  getStartTime() {
    return data.get(this).startTime;
  }

  getSecondsElapsed() {
    return (Date.now() - data.get(this).startTime) / 1000;
  }
}

export default timeElapsedClass;
