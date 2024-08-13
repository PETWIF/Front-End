import { useState } from 'react';
import { Icon } from '../../Icon/index.js';

import * as S from './Checkbox.style.jsx';

export default function Checkbox({ children, callback }) {
  const [checked, setChecked] = useState(false);
  const handleCheck = (event) => {
    setChecked(event.target.checked);
    callback(event.target.checked);
  };

  return (
    <S.CheckBoxLayout>
      <Icon
        id={checked ? 'check-circle' : 'uncheck-circle'}
        width='18'
        height='18'
      />
      <S.Input type='checkbox' value={checked} onChange={handleCheck} />
      {children}
    </S.CheckBoxLayout>
  );
}
