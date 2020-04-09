import React from 'react';
import universal from 'react-universal-component';

// import universalImport from 'babel-plugin-universal-import/universalImport.js'
// import path from 'path'
// 
// const AboutLoadable = universal(universalImport({
//   chunkName: () => 'About',
//   path: () => path.join(__dirname, './About.js'),
//   resolve: () => require.resolveWeak('./About.js'),
//   load: () => Promise.all([
//     import( /* webpackChunkName: 'About' */ './About.js')
//   ]).then(proms => proms[0])
// }))

// import path from 'path';
// const AboutLoadable = universal(() => import(/* webpackChunkName: 'about' */ './About'), {
//   path: path.resolve(__dirname, './About'),
//   resolve: () => require.resolveWeak('./About'),
//   chunkName: 'about',
//   minDelay: 500
// })
// export default AboutLoadable;

const AboutLoadable = universal(() => import('./About'));

export default AboutLoadable;

// -----------------------------------

// https://github.com/faceyspacey/babel-plugin-universal-import
// https://github.com/faceyspacey/react-universal-component#api-and-options >>>>> "asyncComponent"

// asyncComponent:
// 
//     * props => import(`./${props.page}`)
//     * import('./Foo') // doesn't need to be wrapped in a function when using the babel plugin!
//     * (props, cb) => require.ensure([], require => cb(null, require('./Foo')))
// 
// The first argument can be a function that returns a 
//     * promise, 
//     * a promise itself, 
//     * or a function that takes a node-style callback.
//
// The most powerful and popular is a function that takes props as an argument.

// -----------------------------------

// import(): >>> function(string path):Promise
//   Dynamically load modules. 
//   Calls to import() are treated as split points, 
//     meaning the requested module and its children are split out into a separate chunk.
// -----------------------------------
// adding comments to the import
// webpackChunkName: A name for the new chunk. Will cause separate chunk to be named [my-chunk-name].js instead of [id].js
// https://webpack.js.org/api/module-methods/#magic-comments
// https://webpack.js.org/guides/code-splitting/#dynamic-imports

// https://webpack.js.org/api/module-methods/#requireresolveweak

// Similar to require.resolve, but this won't pull the module into the bundle. 
// It's what is considered a "weak" dependency.

// 'require.resolveWeak' is the foundation of universal rendering (SSR + Code Splitting), 
// as used in packages such as 'react-universal-component'. 
// It allows code to render synchronously on both the server and initial page-loads on the client. 
// It requires that chunks are manually served or somehow available. 
// It's able to require modules without indicating they should be bundled into a chunk. 
// It's used in conjunction with import() which takes over when user navigation triggers additional imports.
