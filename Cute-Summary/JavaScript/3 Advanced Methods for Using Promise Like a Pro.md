Promise is an important way of JS asynchronous programming, and besides the basic Promise, there are several very useful ways to combine multiple Promises:

- [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [Promise.allSettled()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
- [Promise.race()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

These three methods can be used to better control the asynchronous flow and avoid callback hell.

Chris will introduce you to the `Promise.all()`, `Promise.allSettled()` and `Promise.race()` methods.

### Promise.all()

The `Promise.all()` method is used to wrap multiple Promise instances into a new Promise instance, which takes a Promise iterator object as an argument and returns a `Promise` instance. The returned Promise will `resolve` only if all Promises `resolve`, and will reject as soon as any of them `reject`.

```typescript
const p1 = Promise.resolve(1);
const p2 = 2;
const p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});
const p4 = Promise.reject("Error");

Promise.all([p1, p2, p3]).then((values) => {
  console.log("[P1]", values); // [P1] Array [1, 42, "foo"]
});

const p = Promise.all([p1, p2, p4, p3])
  .then((values) => {
    console.log("[P2]", values);
  })
  .catch((err) => console.log("[P2 Error]", err)); // [P2 Error] Error

console.log("[Promise -> p]", p);

setTimeout(() => {
  console.log("The queue is now empty");
  console.log("[setTimeout -> p]", p);
});

// [Promise -> p] Promise { <pending> }
// [P2 Error] Error
// The queue is now empty
// [setTimeout -> p] Promise { undefined }
// [P1] [ 1, 2, 'foo' ]
```

Next look at how to implement a `Promise.all()`:

- The idea:
  By traversing the Promise array, collect the result of each Promise, when the parameter array traversal is completed, return the result through `resolve`, when encountered error, then directly `reject` return the result to complete the state change.

- The result:

```typescript
Promise.all = function (iterators) {
  return new Promise((resolve, reject) => {
    if (!iterators || iterators.length === 0) {
      resolve([]);
    } else {
      let count = 0;
      let result = [];
      for (let i = 0; i < iterators.length; i++) {
        Promise.resolve(iterators[i]).then(
          (data) => {
            result[i] = data;
            if (++count === iterators.length) {
              resolve(result);
            }
          },
          (err) => {
            reject(err);
            return;
          }
        );
      }
    }
  });
};
```

To summarize: `Promise.all()` is great for handling scenarios where you need to **wait for multiple asynchronous operations to all complete before continuing**.

### Promise.allSettled()

`Promise.allSettled()` is similar to ` Promise.all()`, except that it waits until all Promises are `settled` before `resolving` and returns the result of each Promise in an array.

It **gets the result of all asynchronous operations** and will not fail even if there is a partial reject.
The interface for returning values is as follows:

```typescript
interface Result {
  status: "fulfilled" | "rejected"; // The final state of the promise.
  value?: any; // The value of promise resolve exists only if status is "fulfilled".
  reason?: any; // Reason for promise rejected, only if status is "rejected".
}
```

Use it as follows:

```typescript
const p1 = Promise.resolve(1);
const p2 = new Promise((resolve, reject) => setTimeout(reject, 100, "Chris"));

Promise.allSettled([p1, p2]).then((results) => {
  console.log("[results]", results);
  return results.forEach((result) => console.log(result.status));
});

// Expected output:
// [results] [
//     { status: 'fulfilled', value: 1 },
//     { status: 'rejected', reason: 'Chris' }
//   ]
//   fulfilled
//   rejected
```

Next look at how to implement a `Promise.allSettled()`:

- The idea:
  Similar to `Promise.all()`, collect the result of each Promise by traversing the array of Promises, save the result in the array, and return the result via `resolve` when the traversal of the array of parameters is complete.

- The result:

```typescript
Promise.allSettled = function (promises) {
  if (!Array.isArray(promises)) {
    return Promise.reject(new Error("Expected an array"));
  }
  let results = [];
  let completed = 0;
  return new Promise((resolve) => {
    promises.forEach((p) => {
      Promise.resolve(p).then(
        (val) => {
          results.push({ status: "fulfilled", value: val });
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        },
        (err) => {
          results.push({ status: "rejected", reason: err });
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        }
      );
    });
  });
};
```

To summarize: `Promise.allSettled()` solves the problem of **waiting for a set of asynchronous tasks to all complete**, **regardless of success or failure**, by getting the result of each asynchronous task without failing as a whole just because one fails, and is suitable for scenarios where you don't want to fail just because a single Promise fails.

### Promise.race()

`Promise.race()` takes a Promise iterable as an argument, returns a `Promise`, and returns the result when the first promise ends (whether `resolved` or `rejected`).

```typescript
const p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "p1");
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "p2");
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
});
// Output: "p2"
```

In the above code, although there are 2 Promises and `p2` comes later, `Promise.race` ends up returning the result of `p2` because the `p2` timer is shorter and returns the result faster.

Let's see how to implement a `Promise.race()`:

- The idea:
  By adding the same `resolve`/`reject` callback to each Promise, the Promise with the fastest `resolve`/`reject` determines the result.

- The result:

```typescript
Promise.race = function (iterators) {
  return new Promise((resolve, reject) => {
    for (const iter of iterators) {
      Promise.resolve(iter)
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    }
  });
};
```

To summarize: `Promise.race()` solves the problem of **prioritizing the fastest-ending task** after a set of asynchronous tasks completes, enabling requirements such as `timeouts`, **polling**, and so on.

### Summary

All three methods are used to combine multiple `Promise`s into a single `Promise` and return an array of results.

Their differences are as follows:

- `Promise.all()`: **Asynchronous parallel execution**, only complete when all Promise states are `resolved`, as soon as there is a `rejected` state it just `rejects` and ends;
- `Promise.allSettled()`: **Asynchronous full execution**, wait for all Promise states to be `resolved` before completing, and return the result of each Promise, even if there is a `rejected` state;
- `Promise.race()`: **Asynchronous competitive execution**, return the result of the first Promise with status `resolved`, regardless of whether the Promise is `resolve` or `reject`, so you can get the result of the asynchronous operation the fastest.
