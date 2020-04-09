import timeElapsedModule from './timeElapsedModule';

const timeElapsedModule1 = timeElapsedModule();

timeElapsedModule1.setStartTime();

function startResolvedPromise(delay) {
  return new Promise(resolve => {
    setTimeout(() => resolve( timeElapsedModule1.getSecondsElapsed() ), delay);
  });
}

const promiseArrayTasks = [];
promiseArrayTasks.push(startResolvedPromise(1000));
promiseArrayTasks.push(startResolvedPromise(3000));

const promiseAllTasks = Promise.all(promiseArrayTasks);

promiseAllTasks
  .then(r => {
    console.log('####### promiseGenerator() > .then > 1 resolvedSeconds: ', r[0], ' SecondsElapsed: ', timeElapsedModule1.getSecondsElapsed());
    console.log('####### promiseGenerator() > .then > 3 resolvedSeconds: ', r[1], ' SecondsElapsed: ', timeElapsedModule1.getSecondsElapsed());
  })
  .catch(function(err) { console.log('####### promiseGenerator() > promiseAllTasks > .catch: ', err) });

// -----------------------------------------------

// -----------------------------------------------

function interruptingTask1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('####### promiseGenerator() > interruptingTask1() > Promise resolved');
      resolve(interruptingTask2());
    }, 1000);
  });
}

function interruptingTask2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('####### promiseGenerator() > interruptingTask2() > Promise resolved');
      resolve(interruptingTask3());
    }, 1000);
  });
}

function interruptingTask3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('####### promiseGenerator() > interruptingTask3() > Promise resolved');
      resolve('Finally Resolved startingTask() !!');
    }, 1000);
  });
}

// export default function* promiseGenerator() {
//   let num = 0;
// 
//   yield* [1, 2, 3];
// 
//   while (true) {
//     const r = yield ++num;
//     console.log(r);
//   }
// }

// { "value": 1, "done": false }


function startingTask() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('####### promiseGenerator() > startingTask() > Promise resolved');
      resolve(interruptingTask1());
    }, 1000);
  });
}

// Generators are async functions that can be paused and started while keeping context
// A function is a generator if it contains one or more 'yield' expressions and 
//  if it uses the 'function*'               syntax
//  if it uses the 'async *someFunction()'  syntax
export function* promiseGenerator() {
  // function is paused by executing a 'yield' keyword
  // function 'startingTask' is momentarily 'paused/setTimeout()' by the 3 above 'interruptingTasks'
  const result = yield startingTask();
  console.log('####### promiseGenerator() > yield startingTask() > result: ', result);
}
