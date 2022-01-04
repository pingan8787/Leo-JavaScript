const { register } = require('esbuild-register/dist/node')
// interface RegisterOptions extends TransformOptions {
//     extensions?: EXTENSIONS[]
//     /**
//      * Auto-ignore node_modules. Independent of any matcher.
//      * @default true
//      */
//     hookIgnoreNodeModules?: boolean
//     /**
//      * A matcher function, will be called with path to a file. Should return truthy if the file should be hooked, falsy otherwise.
//      */
//     hookMatcher?(fileName: string): boolean
//   }
const { unregister } = register({
    extensions: ['.leo']
})

// Unregister the require hook if you don't need it anymore
// unregister()