"use strict";

var a = 1;
var b = 2;
console.log(a);
process.env.NODE_ENV = 'dee';

if (process.env.NODE_ENV !== 'dev') {
  console.log(b);
}