import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getFriendStatus } from '../../apis/friend.js';

import { useAuth }from '../../hooks/useAuth.jsx';
import useFriend from '../../hooks/useFriend.jsx';

import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Profile as Img } from '../../dummy/images';

import { getMyProfile } from '../../apis/getMyProfile.js'; 

import * as S from './Profile.style.jsx';

const PROFILE_INFO_LIST = [
  { label: '친구', value: 20 },
  { label: '앨범', value: 20 },
  { label: '좋아요', value: 103 },
  { label: '북마크', value: 23 },
];

export default function Profile() {
  const { nickname } = useAuth();
  const [profile, setProfile] = useState(Img);
  const { request, cancel, remove } = useFriend();

  const params = useParams();
  const currentNickname = decodeURIComponent(params.nickname || nickname);

  const { data, status } = useQuery({
    queryKey: [],
    queryFn: () => getFriendStatus({ nickname: currentNickname }),
    staleTime: 1000 * 60 * 5,
    enabled: nickname !== currentNickname,
  });

  if (nickname !== currentNickname && status !== 'success') {
    return null;
  }

  const getProfilePic = async () => {
    const response = await getMyProfile();
    const { isSuccess, data } = response;

    console.log(response);

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
    <S.ProfileLayout>
      <S.TopContainer>
        <div>
          <Avatar src={profile} size='66px' />
          <S.NicknameContianer>
            <span>{currentNickname}</span>
            <Icon id='check' width='20' height='20' />
          </S.NicknameContianer>
        </div>
        {nickname === currentNickname && (
          <Button
            buttonStyle='gray'
            padding='8px'
            borderRadius='5px'
            onClick={() => console.log('프로필 편집')}
          >
            프로필 편집
          </Button>
        )}
        {nickname !== currentNickname && [null, 'CANCELLED'].includes(data) && (
          <Button
            padding='8px'
            borderRadius='5px'
            onClick={() => request.mutate(currentNickname)}
          >
            친구 요청
          </Button>
        )}
        {nickname !== currentNickname && data === 'PENDING' && (
          <Button
            buttonStyle='white'
            hasBorder
            padding='8px'
            borderRadius='5px'
            onClick={() => cancel.mutate(currentNickname)}
          >
            요청 취소
          </Button>
        )}
        {nickname !== currentNickname && data === 'ACCEPTED' && (
          <Button
            buttonStyle='light'
            hasBorder
            padding='8px'
            borderRadius='5px'
            onClick={() => remove.mutate(currentNickname)}
          >
            친구 삭제
          </Button>
        )}
      </S.TopContainer>
      <S.Description>짧은 소개글을 쓸 수 있는 자리입니다.</S.Description>
      <S.ProfileInfoList>
        {PROFILE_INFO_LIST.map(({ label, value }) => (
          <S.ProfileInfoItem key={label}>
            <span>{value}</span>
            <span>{label}</span>
          </S.ProfileInfoItem>
        ))}
      </S.ProfileInfoList>
    </S.ProfileLayout>
  );
}
