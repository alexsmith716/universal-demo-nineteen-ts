import React from 'react';
import universal from 'react-universal-component';

// import universalImport from 'babel-plugin-universal-import/universalImport.js'
// import path from 'path'
// 
// const LoginLoadable = universal(universalImport({
//   chunkName: () => 'Login',
//   path: () => path.join(__dirname, './Login.js'),
//   resolve: () => require.resolveWeak('./Login.js'),
//   load: () => Promise.all([
//     import( /* webpackChunkName: 'Login' */ './Login.js')
//   ]).then(proms => proms[0])
// }))

const LoginLoadable = universal(() => import('./Login'))

export default LoginLoadable;
