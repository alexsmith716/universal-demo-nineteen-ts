import React from 'react';
import universal from 'react-universal-component';

// import universalImport from 'babel-plugin-universal-import/universalImport.js'
// import path from 'path'
// 
// const AboutTwoLoadable = universal(universalImport({
//   chunkName: () => 'AboutTwo',
//   path: () => path.join(__dirname, './AboutTwo.js'),
//   resolve: () => require.resolveWeak('./AboutTwo.js'),
//   load: () => Promise.all([
//     import( /* webpackChunkName: 'AboutTwo' */ './AboutTwo.js')
//   ]).then(proms => proms[0])
// }))

const AboutTwoLoadable = universal(() => import('./AboutTwo'))

export default AboutTwoLoadable;
