'use strict';

const a = 1;
const b = 2;
console.log(a);
process.env.NODE_ENV = 'dee';
{
    console.log(b);
}
