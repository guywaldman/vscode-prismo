// inspired by https://www.abeautifulsite.net/executing-promises-in-sequence-and-stopping-at-the-first-resolved-promise
export function raceToResolve(promises) {
  return new Promise(function(resolve, reject) {
    // Are there any values to check?
    if (promises.length === 0) {
      // All were rejected
      reject();
    }
    // Try the first value
    promises[0]
      .then(function(val) {
        // Resolved, we're all done
        resolve(val);
      })
      .catch(function() {
        // Rejected, remove the first item from the array and recursively
        // try the next one
        promises.shift();
        raceToResolve(promises)
          .then(resolve)
          .catch(reject);
      });
  });
}
