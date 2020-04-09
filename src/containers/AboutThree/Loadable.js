import React from 'react';
import universal from 'react-universal-component';

// import universalImport from 'babel-plugin-universal-import/universalImport.js'
// import path from 'path'
// 
// const AboutThreeLoadable//  = universal(universalImport({
//   chunkName: () => 'AboutThree',
//   path: () => path.join(__dirname, './AboutThree.js'),
//   resolve: () => require.resolveWeak('./AboutThree.js'),
//   load: () => Promise.all([
//     import( /* webpackChunkName: 'AboutThree' */ './AboutThree.js')
//   ]).then(proms => proms[0])
// }))

const AboutThreeLoadable = universal(() => import('./AboutThree'))

export default AboutThreeLoadable;
