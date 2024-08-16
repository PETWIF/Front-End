import { Icon } from '../../../components/Icon';

import * as S from './Search.style.jsx';

export default function Search({ value, placeholder, onChange }) {
  return (
    <S.SearchBox>
      <Icon id='search2' width='26' height='27' />
      <S.SearchInput
        type='search'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </S.SearchBox>
  );
}
