"use strict";

var name = 'pingan8787';
var age = 18;

var featureFlags = function featureFlags() {
  console.warn(name);
  __DEV__ && console.log(name);
};

featureFlags();