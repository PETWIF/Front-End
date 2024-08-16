import { Link } from 'react-router-dom';

import { Icon } from '../Icon/index.js';

import * as S from './LoginHeader.style.jsx';

export default function LoginHeader() {
  return (
    <S.Header>
      <Link to='/login'>
      <Icon id='logo' width='283.65px' height='39.93px' />
      </Link>
    </S.Header>
  );
}
