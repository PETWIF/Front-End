import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { Button } from '../Button';
import { Icon } from '../Icon';

import { SIDE_MENUS } from '../../constants';

import * as S from './Sidebar.style.jsx';

export default function Sidebar({ isOpen, close }) {
  const { pathname } = useLocation();
  const [isLogin, setIsLogin] = useState(false); 
  const navigate = useNavigate();

  const checkLoginStatus = () => {
    setIsLogin(!localStorage.getItem('token'));
  };

  // 사이드바 열릴 때마다 로그인 확인
  useEffect(() => {
    checkLoginStatus(); 

    if (isOpen) {
      document.addEventListener('click', close);
    }

    return () => document.removeEventListener('click', close);
  }, [isOpen, close]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('autoLogin');
    localStorage.removeItem('token');

    setIsLogin(false);
    console.log('로그아웃');
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
    console.log('로그인 페이지로 이동');
  };

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
                handleLogout();
              } else {
                handleLogin(); 
              }
            }}
          >
            {isLogin ? '로그아웃' : '로그인'}
          </Button>
        </S.ButtonWrapper>
      </S.SidebarContainer>
    </S.SidebarWrapper>
  );
}
