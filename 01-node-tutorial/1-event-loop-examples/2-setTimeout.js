// started operating system process
console.log('first')
// set timeout is async, so it offloads it goes to the back of the line only when we are done w/ our sync code then we invoke the async call back function.
setTimeout(() => {
  console.log('second')
}, 0)
console.log('third')
// completed and exited operating system process
