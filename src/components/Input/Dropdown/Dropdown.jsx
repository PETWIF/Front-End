import { useState } from 'react';

import { Icon } from '../../Icon';

import * as S from './Dropdown.style.jsx';

export default function DropDown({ width, options, placeholder, callback }) {
  const [value, setValue] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const update = (event) => {
    event.stopPropagation();
    setValue(JSON.parse(event.target.dataset.value));
    callback(JSON.parse(event.target.dataset.value));
    setIsOpen(false);
  };

  return (
    <S.Select $width={width} onClick={() => setIsOpen((prev) => !prev)}>
      <S.Text $placeholder={!value}>{value?.name ?? placeholder}</S.Text>
      <Icon id={isOpen ? 'arrow-up' : 'arrow-down'} width='13' height='8' />
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
  );
}
