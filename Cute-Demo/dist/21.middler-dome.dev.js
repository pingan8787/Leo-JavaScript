"use strict";

var c1 = function c1(next) {
  console.log('[c1-1]');
  next();
  console.log('[c1-2]');
};

var c2 = function c2(next) {
  console.log('[c2-1]');
  next();
  console.log('[c2-2]');
};

var runCallbacks = function runCallbacks(cbs) {
  if (Array.isArray(cbs)) {
    var idx = 0;

    var next = function next() {
      var cb = cbs[idx++];
      typeof cb === 'function' && cb.call(cb, next);
    };

    next();
  }
};

runCallbacks([c1, c2]);
/**
 输出结果：
 [c1-1]
 [c1-2]
 [c2-2]
 [c2-1]
 */