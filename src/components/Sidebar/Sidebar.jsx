import { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { Button } from '../Button';
import { Icon } from '../Icon';

import { SIDE_MENUS } from '../../constants';

import * as S from './Sidebar.style.jsx';

import { useAuth } from '../../hooks/useAuth';

export default function Sidebar({ isOpen, close }) {
  const { pathname } = useLocation();
  const { isLogin, handleLogout } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {

    if (isOpen) {
      document.addEventListener('click', close);
    }

    return () => document.removeEventListener('click', close);
  }, [isOpen, close]);

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
              navigate('/login');
              handleLogout();
            }}
          >
            {isLogin ? '로그아웃' : '로그인'}
          </Button>
        </S.ButtonWrapper>
      </S.SidebarContainer>
    </S.SidebarWrapper>
  );
}