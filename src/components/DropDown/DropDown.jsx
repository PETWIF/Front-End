import { useState } from 'react';

import { Icon } from '../Icon/index.js';

import * as S from './DropDown.style.jsx';

export default function DropDown({ options, placeholder, value, setFn }) {
  const [isOpen, setIsOpen] = useState(false);
  const update = (event) => {
    event.stopPropagation();
    setFn(JSON.parse(event.target.dataset.value));
    setIsOpen(false);
  };

  return (
    <S.DropdownContianer>
      <S.Select onClick={() => setIsOpen((prev) => !prev)}>
        {value?.name ?? placeholder}
        <Icon id='arrow-up' width='13' height='8' />
        <S.OptionList $show={isOpen}>
          {options.map((option) => (
            <S.OptionItem
              key={option.value}
              data-value={JSON.stringify(option)}
              onClick={update}
            >
              {option?.name}
            </S.OptionItem>
          ))}
        </S.OptionList>
      </S.Select>
    </S.DropdownContianer>
  );
}
