import React from 'react';
import universal from 'react-universal-component';

const GraphiQLLoadable = universal(() => import('./GraphiQLExample'))

export default GraphiQLLoadable;
