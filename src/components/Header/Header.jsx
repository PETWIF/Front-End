import { useState, useEffect } from 'react';

import { Flex } from '../Common';
import { Icon } from '../Icon';
import { Avatar } from '../Avatar';
import { Sidebar } from '../Sidebar';

import { Profile as Img } from '../../dummy/images';

import { getMyProfile } from '../../apis/getMyProfile.js'; 

import * as S from './Header.style.jsx';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(Img);

  const getProfilePic = async () => {
    const response = await getMyProfile();
    const { isSuccess, data } = response;

    if (isSuccess) {
      const { profile_url } = data;
      setProfile(profile_url);
    } else {
      console.log("프로필 사진 미설정 상태. 기본 프로필 사진으로 대체됩니다.");
    }
};

useEffect(() => {
  getProfilePic();
});

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
          <S.MenuItem to='/setting'>
            <Icon id='bell' width='24' height='25' />
            <span>알림 설정</span>
          </S.MenuItem>
          <S.MenuItem to='/setting'>
            <Icon id='setting' width='20' height='20' />
            <span>설정</span>
          </S.MenuItem>
          <S.MenuItem to='/user-profile'>
            <Avatar src={profile} size='37px' />
          </S.MenuItem>
        </Flex>
      </S.HeaderContainer>
      <Sidebar isOpen={isOpen} close={() => setIsOpen(false)} />
    </>
  );
}
