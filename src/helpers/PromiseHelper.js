/**
 *  wrap your promise in order to make it cancelable
 *  https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
 *
 *  usage:
 *
 *   const cancelablePromise = makeCancelable(
 *     new Promise(r => component.setState({...}}))
 *   );
 *   cancelablePromise
 *     .promise
 *     .then(() => console.log('resolved'))
 *     .catch((reason) => console.log('isCanceled', reason.isCanceled));
 *
 *   cancelablePromise.cancel();
 *
 */
const makeCancelable = (promise) => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(val =>
      (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)));
    promise.catch(error =>
      (hasCanceled_ ? reject({ isCanceled: true }) : reject(error)));
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

export default makeCancelable;
