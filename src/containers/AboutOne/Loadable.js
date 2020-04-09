import React from 'react';
import universal from 'react-universal-component';

// import universalImport from 'babel-plugin-universal-import/universalImport.js'
// import path from 'path'
// 
// const AboutOneLoadable = universal(universalImport({
//   chunkName: () => 'AboutOne',
//   path: () => path.join(__dirname, './AboutOne.js'),
//   resolve: () => require.resolveWeak('./AboutOne.js'),
//   load: () => Promise.all([
//     import( /* webpackChunkName: 'AboutOne' */ './AboutOne.js')
//   ]).then(proms => proms[0])
// }))

const AboutOneLoadable = universal(() => import('./AboutOne'))

export default AboutOneLoadable;
