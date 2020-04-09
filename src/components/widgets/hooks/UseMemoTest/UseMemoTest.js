import React, { useMemo } from 'react';

// <UseMemoTest className='hello' letters="hello there" />

export const UseMemoTest = props => {

  const { className, letters } = props;

  const testUseMemo = useMemo(() => {

    // const ltrs = runes(letters);
    const ltrs = [...letters];

    return ltrs.map((ltr, idx) => {
      return (
        <span key={idx} className={`${className}-${idx}`} aria-hidden>
          {ltr}
        </span>
      );
    });
  }, [letters]);

  return (
    <div aria-label={letters} {...props}>
      {testUseMemo}
    </div>
  );
};

export default UseMemoTest;
