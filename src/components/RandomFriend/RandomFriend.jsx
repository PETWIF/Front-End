import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getSuggestedFriendList } from '../../apis/friend.js';

import { Button } from '../Button';
import { Layout } from '../Common';
import { Avatar } from '../Avatar';

import { RANDOM_FRIENDS } from '../../dummy/data';

import * as S from './RandomFriend.style.jsx';

const nickname = '펫위프';

export default function RandomFriend() {
  const { data } = useQuery({
    queryKey: ['suggestedFriendList'],
    queryFn: () => getSuggestedFriendList(),
    staleTime: 1000 * 60 * 5,
  });

  if (!data) return null;

  return (
    <S.RandomFriendLayout>
      <S.Title>{nickname}님을 위한 추천</S.Title>
      <S.FriendList>
        {data.map(({ nickname, profile_url: profileUrl }) => (
          <S.FriendItem key={nickname}>
            <div>
              {/* <Link to={`/album/${nickname}`}> */}
              <Avatar src={profileUrl} size='66px' />
              {/* </Link> */}
              <span>{nickname}</span>
            </div>
            <Button
              onClick={() => console.log(`${nickname} 친구 추가`)}
              width='100px'
              padding='8px'
              borderRadius='5px'
            >
              친구 추가
            </Button>
          </S.FriendItem>
        ))}
      </S.FriendList>
      <Button
        padding='11px'
        buttonStyle='light'
        borderRadius='5px'
        hasBorder
        onClick={() => console.log('더 많은 프로필 보기')}
      >
        더 많은 프로필 보기
      </Button>
    </S.RandomFriendLayout>
  );
}
