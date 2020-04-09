import React from 'react';

const BoilingVerdict = props => {

  const { celsius } = props;
  const v = <div className="text-center"><h6>{`Will the water boil? ${celsius >= 100 ? 'Yes!' : 'No'}`}</h6></div>;

  return v;
}

export default BoilingVerdict;
