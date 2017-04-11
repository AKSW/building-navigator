const waitsInProgress = [];

export const waitFor = (test, message, done, timeLeft) => {
  timeLeft = timeLeft === undefined ? 100 : timeLeft;
  console.log('waitFor: ', timeLeft);
  waitsInProgress.push(setTimeout(() => {

    if (timeLeft <= 0) {
      console.log('waitFor is failed!');
      fail(message);
      //done();
    } else if (test()) {
      console.log('waitFor is done...');
      //done();
    } else {
      waitFor(test, message, done, timeLeft - 10);
    }
  }, 10));
};

waitFor.clear = () => waitsInProgress.map(clearTimeout); //optionally call this in the beforeEach to ensure rogue tests are not still waiting

//module.exports = waitFor;
//export default waitFor;