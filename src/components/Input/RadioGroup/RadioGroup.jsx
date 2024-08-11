import React, { useState } from 'react';

import * as S from './RadioGroup.style.jsx';

export default function RadioGroup({ name, callback, children }) {
  const [value, setValue] = useState();
  const handleRadio = (event) => {
    setValue(event.target.value);
    callback(event.target.value);
  };

  return (
    <S.RadioGroupLayout onChange={handleRadio}>
      {children.map((child, index) =>
        React.cloneElement(child, {
          key: index,
          name,
          currentValue: value,
          callback: setValue,
        })
      )}
    </S.RadioGroupLayout>
  );
}
