{  
    "env": {  
      "browser": true,  
      "node": true,  
      "commonjs": true  
    },  
    "ecmaFeatures": {  
      // lambda表达式  
      "arrowFunctions": true,  
      // 解构赋值  
      "destructuring": true,  
      // class  
      "classes": true,  
      // http://es6.ruanyifeng.com/#docs/function#函数参数的默认值  
      "defaultParams": true,  
      // 块级作用域，允许使用let const  
      "blockBindings": true,  
      // 允许使用模块，模块内默认严格模式  
      "modules": true,  
      // 允许字面量定义对象时，用表达式做属性名  
      // http://es6.ruanyifeng.com/#docs/object#属性名表达式  
      "objectLiteralComputedProperties": true,  
      // 允许对象字面量方法名简写  
      /*var o = {
          method() {
            return "Hello!";
          }
       };

       等同于

       var o = {
         method: function() {
           return "Hello!";
         }
       };
      */  
      "objectLiteralShorthandMethods": true,  
      /*
        对象字面量属性名简写
        var foo = 'bar';
        var baz = {foo};
        baz // {foo: "bar"}

        // 等同于
        var baz = {foo: foo};
      */  
      "objectLiteralShorthandProperties": true,  
      // http://es6.ruanyifeng.com/#docs/function#rest参数  
      "restParams": true,  
      // http://es6.ruanyifeng.com/#docs/function#扩展运算符  
      "spread": true,  
      // http://es6.ruanyifeng.com/#docs/iterator#for---of循环  
      "forOf": true,  
      // http://es6.ruanyifeng.com/#docs/generator  
      "generators": true,  
      // http://es6.ruanyifeng.com/#docs/string#模板字符串  
      "templateStrings": true,  
      "superInFunctions": true,  
      // http://es6.ruanyifeng.com/#docs/object#对象的扩展运算符  
      "experimentalObjectRestSpread": true  
    },  

    "rules": {  
      // 定义对象的set存取器属性时，强制定义get  
      "accessor-pairs": 2,  
      // 指定数组的元素之间要以空格隔开(,后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格  
      "array-bracket-spacing": [2, "never"],  
      // 在块级作用域外访问块内定义的变量是否报错提示  
      "block-scoped-var": 0,  
      // if while function 后面的{必须与if在同一行，java风格。  
      "brace-style": [2, "1tbs", { "allowSingleLine": true }],  
      // 双峰驼命名格式  
      "camelcase": 2,  
      // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，  
      // always-multiline：多行模式必须带逗号，单行模式不能带逗号  
      "comma-dangle": [2, "never"],  
      // 控制逗号前后的空格  
      "comma-spacing": [2, { "before": false, "after": true }],  
      // 控制逗号在行尾出现还是在行首出现  
      // http://eslint.org/docs/rules/comma-style  
      "comma-style": [2, "last"],  
      // 圈复杂度  
      "complexity": [2,9],  
      // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always  
      "computed-property-spacing": [2,"never"],  
      // 强制方法必须返回值，TypeScript强类型，不配置  
      "consistent-return": 0,  
      // 用于指统一在回调函数中指向this的变量名，箭头函数中的this已经可以指向外层调用者，应该没卵用了  
      // e.g [0,"that"] 指定只能 var that = this. that不能指向其他任何值，this也不能赋值给that以外的其他值  
      "consistent-this": 0,  
      // 强制在子类构造函数中用super()调用父类构造函数，TypeScrip的编译器也会提示  
      "constructor-super": 0,  
      // if else while for do后面的代码块是否需要{ }包围，参数：  
      //    multi  只有块中有多行语句时才需要{ }包围  
      //    multi-line  只有块中有多行语句时才需要{ }包围, 但是块中的执行语句只有一行时，  
      //                   块中的语句只能跟和if语句在同一行。if (foo) foo++; else doSomething();  
      //    multi-or-nest 只有块中有多行语句时才需要{ }包围, 如果块中的执行语句只有一行，执行语句可以零另起一行也可以跟在if语句后面  
      //    [2, "multi", "consistent"] 保持前后语句的{ }一致  
      //    default: [2, "all"] 全都需要{ }包围  
      "curly": [2, "all"],  
      // switch语句强制default分支，也可添加 // no default 注释取消此次警告  
      "default-case": 2,  
      // 强制object.key 中 . 的位置，参数:  
      //      property，'.'号应与属性在同一行  
      //      object, '.' 号应与对象名在同一行  
      "dot-location": [2, "property"],  
      // 强制使用.号取属性  
      //    参数： allowKeywords：true 使用保留字做属性名时，只能使用.方式取属性  
      //                          false 使用保留字做属性名时, 只能使用[]方式取属性 e.g [2, {"allowKeywords": false}]  
      //           allowPattern:  当属性名匹配提供的正则表达式时，允许使用[]方式取值,否则只能用.号取值 e.g [2, {"allowPattern": "^[a-z]+(_[a-z]+)+$"}]  
      "dot-notation": [2, {"allowKeywords": true}],  
      // 文件末尾强制换行  
      "eol-last": 2,  
      // 使用 === 替代 ==  
      "eqeqeq": [2, "allow-null"],  
      // 方法表达式是否需要命名  
      "func-names": 0,  
      // 方法定义风格，参数：  
      //    declaration: 强制使用方法声明的方式，function f(){} e.g [2, "declaration"]  
      //    expression：强制使用方法表达式的方式，var f = function() {}  e.g [2, "expression"]  
      //    allowArrowFunctions: declaration风格中允许箭头函数。 e.g [2, "declaration", { "allowArrowFunctions": true }]  
      "func-style": 0,  
      "generator-star-spacing": [2, { "before": true, "after": true }],  
      "guard-for-in": 0,  
      "handle-callback-err": [2, "^(err|error)$" ],  
      "indent": [2, 2, { "SwitchCase": 1 }],  
      "key-spacing": [2, { "beforeColon": false, "afterColon": true }],  
      "linebreak-style": 0,  
      "lines-around-comment": 0,  
      "max-nested-callbacks": 0,  
      "new-cap": [2, { "newIsCap": true, "capIsNew": false }],  
      "new-parens": 2,  
      "newline-after-var": 0,  
      "no-alert": 0,  
      "no-array-constructor": 2,  
      "no-caller": 2,  
      "no-catch-shadow": 0,  
      "no-cond-assign": 2,  
      "no-console": 0,  
      "no-constant-condition": 0,  
      "no-continue": 0,  
      "no-control-regex": 2,  
      "no-debugger": 2,  
      "no-delete-var": 2,  
      "no-div-regex": 0,  
      "no-dupe-args": 2,  
      "no-dupe-keys": 2,  
      "no-duplicate-case": 2,  
      "no-else-return": 0,  
      "no-empty": 0,  
      "no-empty-character-class": 2,  
      "no-empty-label": 2,  
      "no-eq-null": 0,  
      "no-eval": 2,  
      "no-ex-assign": 2,  
      "no-extend-native": 2,  
      "no-extra-bind": 2,  
      "no-extra-boolean-cast": 2,  
      "no-extra-parens": 0,  
      "no-extra-semi": 0,  
      "no-fallthrough": 2,  
      "no-floating-decimal": 2,  
      "no-func-assign": 2,  
      "no-implied-eval": 2,  
      "no-inline-comments": 0,  
      "no-inner-declarations": [2, "functions"],  
      "no-invalid-regexp": 2,  
      "no-irregular-whitespace": 2,  
      "no-iterator": 2,  
      "no-label-var": 2,  
      "no-labels": 2,  
      "no-lone-blocks": 2,  
      "no-lonely-if": 0,  
      "no-loop-func": 0,  
      "no-mixed-requires": 0,  
      "no-mixed-spaces-and-tabs": 2,  
      "no-multi-spaces": 2,  
      "no-multi-str": 2,  
      "no-multiple-empty-lines": [2, { "max": 1 }],  
      "no-native-reassign": 2,  
      "no-negated-in-lhs": 2,  
      "no-nested-ternary": 0,  
      "no-new": 2,  
      "no-new-func": 0,  
      "no-new-object": 2,  
      "no-new-require": 2,  
      "no-new-wrappers": 2,  
      "no-obj-calls": 2,  
      "no-octal": 2,  
      "no-octal-escape": 2,  
      "no-param-reassign": 0,  
      "no-path-concat": 0,  
      "no-process-env": 0,  
      "no-process-exit": 0,  
      "no-proto": 0,  
      "no-redeclare": 2,  
      "no-regex-spaces": 2,  
      "no-restricted-modules": 0,  
      "no-return-assign": 2,  
      "no-script-url": 0,  
      "no-self-compare": 2,  
      "no-sequences": 2,  
      "no-shadow": 0,  
      "no-shadow-restricted-names": 2,  
      "no-spaced-func": 2,  
      "no-sparse-arrays": 2,  
      "no-sync": 0,  
      "no-ternary": 0,  
      "no-this-before-super": 2,  
      "no-throw-literal": 2,  
      "no-trailing-spaces": 2,  
      "no-undef": 2,  
      "no-undef-init": 2,  
      "no-undefined": 0,  
      "no-underscore-dangle": 0,  
      "no-unexpected-multiline": 2,  
      "no-unneeded-ternary": 2,  
      "no-unreachable": 2,  
      "no-unused-expressions": 0,  
      "no-unused-vars": [2, { "vars": "all", "args": "none" }],  
      "no-use-before-define": 0,  
      "no-var": 0,  
      "no-void": 0,  
      "no-warning-comments": 0,  
      "no-with": 2,  
      "object-curly-spacing": 0,  
      "object-shorthand": 0,  
      "one-var": [2, { "initialized": "never" }],  
      "operator-assignment": 0,  
      "operator-linebreak": [2, "after", { "overrides": { "?": "before", ":": "before" } }],  
      "padded-blocks": 0,  
      "prefer-const": 0,  
      "quote-props": 0,  
      "quotes": [2, "single", "avoid-escape"],  
      "radix": 2,  
      "semi": [2, "never"],  
      "semi-spacing": 0,  
      "sort-vars": 0,  
      "space-after-keywords": [2, "always"],  
      "space-before-blocks": [2, "always"],  
      "space-before-function-paren": [2, "always"],  
      "space-in-parens": [2, "never"],  
      "space-infix-ops": 2,  
      "space-return-throw-case": 2,  
      "space-unary-ops": [2, { "words": true, "nonwords": false }],  
      "spaced-comment": [2, "always", { "markers": ["global", "globals", "eslint", "eslint-disable", "*package", "!"] }],  
      "strict": 0,  
      "use-isnan": 2,  
      "valid-jsdoc": 0,  
      "valid-typeof": 2,  
      "vars-on-top": 0,  
      "wrap-iife": [2, "any"],  
      "wrap-regex": 0,  
      "yoda": [2, "never"]  
    }  
  }