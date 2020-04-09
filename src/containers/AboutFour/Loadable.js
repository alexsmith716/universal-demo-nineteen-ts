import React from 'react';
import universal from 'react-universal-component';

// import universalImport from 'babel-plugin-universal-import/universalImport.js'
// import path from 'path'
// 
// const AboutFourLoadable = universal(universalImport({
//   chunkName: () => 'AboutFour',
//   path: () => path.join(__dirname, './AboutFour.js'),
//   resolve: () => require.resolveWeak('./AboutFour.js'),
//   load: () => Promise.all([
//     import( /* webpackChunkName: 'AboutFour' */ './AboutFour.js')
//   ]).then(proms => proms[0])
// }))

const AboutFourLoadable = universal(() => import('./AboutFour'));

export default AboutFourLoadable;
