import { Icon } from '../../components/Icon';

import * as S from './Search.style.jsx';

export default function Search({ value, onChange }) {
  return (
    <S.SearchBox>
      <Icon id='search' width='26' height='27' />
      <S.SearchInput
        type='search'
        placeholder='SEARCH'
        value={value}
        onChange={onChange}
      />
    </S.SearchBox>
  );
}
