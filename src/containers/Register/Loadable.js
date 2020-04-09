import React from 'react';
import universal from 'react-universal-component';

// import universalImport from 'babel-plugin-universal-import/universalImport.js'
// import path from 'path'
// 
// const RegisterLoadable = universal(universalImport({
//   chunkName: () => 'Register',
//   path: () => path.join(__dirname, './Register.js'),
//   resolve: () => require.resolveWeak('./Register.js'),
//   load: () => Promise.all([
//     import( /* webpackChunkName: 'Register' */ './Register.js')
//   ]).then(proms => proms[0])
// }))

const RegisterLoadable = universal(() => import('./Register'))

export default RegisterLoadable;
