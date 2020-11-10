function curry (func) {    // func 需要柯里化的函数
    return function curried (...args) { 
      	// func.length 柯里化函数的参数数量
      	// args.length 返回函数的参数数量
        if(args.length >= func.length){ 
            return func.apply(this, args);
        }else{
          	// 返回一个方法，用来接收其他参数
            return function(...args2){
                return curried.apply(this, args.concat(args2));
            }
        }
    }
}
const abc = function (a, b, c) {
    return [a, b, c];
};

const curried = curry(abc);

console.log(curried(1)(2)(3)); // => [1, 2, 3]
console.log(curried(1, 2)(3)); // => [1, 2, 3]
console.log(curried(1, 2, 3)); // => [1, 2, 3]