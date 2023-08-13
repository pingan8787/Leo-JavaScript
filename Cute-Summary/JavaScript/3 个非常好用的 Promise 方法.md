Promise 是 JS 异步编程的重要方式，除了基础的 Promise，还有几个组合多个 Promise 非常有用的方法：

- `Promise.all()`
- `Promise.allSettled()`
- `Promise.race()`

这三个方法可以用来更好地控制异步流程，避免回调地狱。
接下来 Chris 和大家介绍一下 `Promise.all()`、`Promise.allSettled()` 和 `Promise.race()` 方法。

### Promise.all()

`Promise.all()` 方法用于将多个 Promise 实例包装成一个新的 Promise 实例，它接收一个 Promise 迭代器对象作为参数，返回一个 `Promise`实例。只有当所有 Promise 都 `resolve` 时，返回的 Promise 才会`resolve`，一旦有任一 Promise `reject`，则直接 reject。

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

// Promise.all 的异步性
console.log("[Promise -> p]", p);

// 使用 setTimeout，我们可以在队列为空后执行代码
setTimeout(() => {
  console.log("队列现在为空");
  console.log("[setTimeout -> p]", p);
});

// 按顺序输出:
// [Promise -> p] Promise { <pending> }
// [P2 Error] Error
// 队列现在为空
// [setTimeout -> p] Promise { undefined }
// [P1] [ 1, 2, 'foo' ]
```

接下来看下如何实现一个 `Promise.all()`：

- 实现思路：通过遍历 Promise 数组，收集每个 Promise 的结果，当参数的数组遍历完成后通过 `resolve`返回结果，当遇到报错，则直接 `reject`返回结果完成状态变更。
- 实现结果：

```typescript
/*
	实现思路：// 通过遍历Promise数组,收集每个Promise的结果后resolve，
	
*/
Promise.all = function (iterators) {
  return new Promise((resolve, reject) => {
    if (!iterators || iterators.length === 0) {
      resolve([]);
    } else {
      let count = 0; // 计数器，用于判断所有任务是否执行完成
      let result = []; // 结果数组
      for (let i = 0; i < iterators.length; i++) {
        // 考虑到iterators[i]可能是普通对象，则统一包装为Promise对象
        Promise.resolve(iterators[i]).then(
          (data) => {
            result[i] = data; // 按顺序保存对应的结果
            // 当所有任务都执行完成后，再统一返回结果
            if (++count === iterators.length) {
              resolve(result);
            }
          },
          (err) => {
            reject(err); // 任何一个Promise对象执行失败，则调用reject()方法
            return;
          }
        );
      }
    }
  });
};
```

总结：`Promise.all()` 非常适合处理需要**等待多个异步操作全部完成才能继续**的场景。

### Promise.allSettled()

`[Promise.allSettled()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)` 与 `Promise.all()` 类似，区别在于它会等到所有的 Promise 都 `settled` 后才 `resolve`，并将每个 Promise 的结果放入数组返回。
它可以**获得所有的异步操作结果**，即使有部分 reject 也不会失败。
返回值的接口如下：

```typescript
interface Result {
  status: "fulfilled" | "rejected"; //表示 promise 的最终状态。
  value?: any; // promise resolve 的值，仅当 status 为 "fulfilled"，才存在。
  reason?: any; // promise rejected 的原因，仅当 status 为 "rejected"
}
```

使用方式如下：

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

接下来看下如何实现一个 `Promise.allSettled()`：

- 实现思路：与 `Promise.all()`类似，通过遍历 Promise 数组，收集每个 Promise 的结果保存在数组中，当参数的数组遍历完成后通过 `resolve`返回结果。
- 实现结果：

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

总结：`Promise.allSettled()` 解决了**等待一组异步任务全部完成**，**不管成功或失败**的问题，获取每个异步任务的结果，而不会因为一个失败就整体失败，适合不想因为单个 Promise 失败而失败的场景。。

### Promise.race()

[Promise.race()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) 接收一个 Promise 可迭代对象作为参数，返回一个 `Promise`，当第一个 promise 结束时（无论 `resolved` 还是 `rejected`）返回，其中 `race`单词为**“竞争”**的意思，竞争第一个结束时返回结果。

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
// 输出结果："p2"
```

上面代码中，虽然有 2 个 Promise，并且 `p2` 在后面，但是因为 `p2` 定时器时间更短，更快返回结果，所以最终 `Promise.race` 返回的是 `p2` 的结果。

接下来看下如何实现一个 `Promise.race()`：

- 实现思路：通过给每个 Promise 添加相同的 `resolve`/`reject` 回调，由最快 `resolve`/`reject` 的 Promise 决定结果。
- 实现结果：

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

总结：`Promise.race()`解决了**在一组异步任务完成后优先处理最快结束的任务**的问题，可以实现 `timeouts`、**轮询**等需求。

### 总结

这三个方法都用于将多个 `Promise` 组合成一个 `Promise`，返回结果都是一个数组。
总结它们的区别：

- `Promise.all()`：**异步并行执行**，只有所有 Promise 状态都为 `resolved` 才完成，只要有一个 `rejected` 状态就直接 `reject`并结束；
- `Promise.allSettled()`：**异步全部执行**，等待所有 Promise 状态都为 `resolved` 才完成，返回每个 Promise 的结果，即使有出现 `rejected` 状态；
- `Promise.race()`：**异步竞争执行**，返回第一个状态为 `resolved` 的 Promise 的结果，不管该 Promise 是 `resolve` 还是 `reject`，可以最快获得异步操作的结果。
