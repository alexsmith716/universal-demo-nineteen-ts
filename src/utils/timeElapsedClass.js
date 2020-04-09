class TimeElapsedClass {

  constructor() {}

  set startTime(startTime) {
    this._startTime = startTime;
  }

  get startTime() {
    return this._startTime;
  }

  // -----------------------------

  get secondsElapsed() {
    return (Date.now() - this._startTime) / 1000;
  }

  secondsElapsedX(elapsed) {
    return (elapsed - this._startTime) / 1000;
  }

}

export default new TimeElapsedClass();
