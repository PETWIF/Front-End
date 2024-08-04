import { useState } from 'react';

import { Flex } from '../Common';
import { Icon } from '../Icon';
import { Profile } from '../Profile';
import { Sidebar } from '../Sidebar';

import { Profile as Img } from '../../dummy/images';

import * as S from './Header.style.jsx';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <S.HeaderContainer>
        <Icon
          id='hamburger'
          width='44'
          height='34'
          onClick={(event) => {
            event.stopPropagation();
            setIsOpen(true);
          }}
          style={{ cursor: 'pointer' }}
        />
        <Flex $gap='30px'>
          <S.MenuItem>
            <Icon id='bell' width='24' height='25' />
            <span>알림 설정</span>
          </S.MenuItem>
          <S.MenuItem>
            <Icon id='setting' width='20' height='20' />
            <span>사용자 관리</span>
          </S.MenuItem>
          <S.MenuItem>
            <Profile src={Img} size='37px' />
          </S.MenuItem>
        </Flex>
      </S.HeaderContainer>
      <Sidebar isOpen={isOpen} close={() => setIsOpen(false)} />
    </>
  );
}
