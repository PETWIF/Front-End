import { Link } from 'react-router-dom';

import { Icon } from '../Icon/index.js';

import { useAuth } from '../../hooks/useAuth';

import * as S from './LoginHeader.style.jsx';

export default function LoginHeader() {
  const { isLogin } = useAuth();

  return (
    <S.Header>
      <Link to={ isLogin ? '/home' : '/login' }>
      <Icon id='logo' width='283.65px' height='39.93px' />
      </Link>
    </S.Header>
  );
}
