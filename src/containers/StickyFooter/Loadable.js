import React from 'react';
import universal from 'react-universal-component';

// import universalImport from 'babel-plugin-universal-import/universalImport.js'
// import path from 'path'
// 
// const StickyFooterLoadable = universal(universalImport({
//   chunkName: () => 'StickyFooter',
//   path: () => path.join(__dirname, './StickyFooter.js'),
//   resolve: () => require.resolveWeak('./StickyFooter.js'),
//   load: () => Promise.all([
//     import( /* webpackChunkName: 'StickyFooter' */ './StickyFooter.js')
//   ]).then(proms => proms[0])
// }))

const StickyFooterLoadable = universal(() => import('./StickyFooter'))

export default StickyFooterLoadable;
