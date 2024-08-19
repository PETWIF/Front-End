import React, { useState } from 'react';

import * as S from './RadioGroup.style.jsx';

export default function RadioGroup({ name, defaultValue, callback, children, style }) {
  const [value, setValue] = useState(defaultValue);
  const handleRadio = (event) => {
    setValue(event.target.value);
    callback(event.target.value);
  };

  return (
    <S.RadioGroupLayout onChange={handleRadio} style={style}>
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
