const addHook = require('pirates').addHook;
// Or if you use ES modules
// import { addHook } from 'pirates';

function matcher(filename) {
  // Here, you can inspect the filename to determine if it should be hooked or
  // not. Just return a truthy/falsey. Files in node_modules are automatically ignored,
  // unless otherwise specified in options (see below).

  // TODO: Implement your logic here
  return true;
}

const revert = addHook(
  (code, filename) => code.replace('@@name', 'leo'),
  { exts: ['.js'], matcher }
);

// And later, if you want to un-hook require, you can just do:
// revert();