import { useState } from 'react';

import { Icon } from '../../Icon';

import * as S from './Radio.style.jsx';

export default function Radio({ name, value, currentValue, children }) {
  return (
    <S.RadioLayout>
      <Icon
        id={currentValue === value ? 'check-circle' : 'uncheck-circle'}
        width='18'
        height='18'
      />
      <S.RadioStyle type='radio' name={name} value={value} />
      <S.Label>{children}</S.Label>
      {/* <span>{children}</span> */}
    </S.RadioLayout>
  );
}
