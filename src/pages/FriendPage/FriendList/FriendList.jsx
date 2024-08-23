import { useQuery } from '@tanstack/react-query';

import { getFriendList } from '../../../apis/friend.js';

import useAuth from '../../../hooks/useAuth.jsx';

import { Avatar } from '../../../components/Avatar';
import { Button } from '../../../components/Button';

import * as S from './FriendList.style.jsx';

export default function FriendList() {
  const { nickname } = useAuth();
  const { data } = useQuery({
    queryKey: ['friendList'],
    queryFn: () => getFriendList(),
    staleTime: 1000 * 60 * 5,
  });

  if (!data) return null;

  const friendList = data.filter(({ status }) => status === 'ACCEPTED');

  return (
    <S.FriendLayout>
      <S.FriendContainer>
        <S.Title>{nickname}님의 친구 목록</S.Title>
        <S.FriendList>
          {friendList.map(({ id, nickname, profile_url: profileUrl }) => (
            <S.FriendItem
              key={id}
              onClick={() => {
                console.log(`${nickname}님 앨범 페이지로 이동!`);
              }}
            >
              <Avatar src={profileUrl} size='66px' />
              <span>{nickname}</span>
              <Button
                onClick={(event) => {
                  event.stopPropagation();
                  console.log(`${nickname} 친구 삭제`);
                }}
                width='100px'
                padding='8px'
                borderRadius='5px'
                buttonStyle='white'
                hasBorder
              >
                친구 삭제
              </Button>
            </S.FriendItem>
          ))}
        </S.FriendList>
      </S.FriendContainer>
    </S.FriendLayout>
  );
}
