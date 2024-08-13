import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { Button } from '../Button';
import { Icon } from '../Icon';

import { SIDE_MENUS } from '../../constants';

import * as S from './Sidebar.style.jsx';

export default function Sidebar({ isOpen, close }) {
  const { pathname } = useLocation();
  const [isLogin, setIsLogin] = useState();
  const navigate = useNavigate();

  // 사이드바 동작 확인을 위한 임시 기능
  const login = () => {
    localStorage.setItem('token', 'abcdefg');
    setIsLogin(true);
    console.log('로그인');
  };
  const logout = () => {
    localStorage.removeItem('token');
    setIsLogin(false);
    console.log('로그아웃');
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', close);
      setIsLogin(localStorage.getItem('token') ? true : false);
    }

    return () => document.removeEventListener('click', close);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <S.SidebarWrapper onClick={(event) => event.stopPropagation()}>
      <S.SidebarContainer $direction='column'>
        <ul>
          {SIDE_MENUS.map(({ id, to, name, icon }) => (
            <Link key={id} to={to}>
              <S.MenuItem $selected={pathname.includes(id)}>
                <Icon id={id} width={icon.width} height={icon.height} />
                <span>{name}</span>
              </S.MenuItem>
            </Link>
          ))}
        </ul>
        <S.ButtonWrapper>
          <Button
            padding='18px'
            borderRadius='5px'
            onClick={() => {
              if (isLogin) {
                logout();
                console.log('로그아웃');
              } else {
                navigate('/login');
                login();
                console.log('로그인');
              }
            }}
          >
            {isLogin ? '로그아웃 ' : '로그인'}
          </Button>
        </S.ButtonWrapper>
      </S.SidebarContainer>
    </S.SidebarWrapper>
  );
}
