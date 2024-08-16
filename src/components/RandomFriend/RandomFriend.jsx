import { Link } from 'react-router-dom';

import { Button } from '../Button';
import { Layout } from '../Common';
import { Avatar } from '../Avatar';

import { RANDOM_FRIENDS } from '../../dummy/data';

import * as S from './RandomFriend.style.jsx';

const nickname = '펫위프';

export default function RandomFriend() {
  return (
    <S.RandomFriendLayout>
      <S.Title>{nickname}님을 위한 추천</S.Title>
      <S.FriendList>
        {RANDOM_FRIENDS.map(({ userId, name, image }) => (
          <S.FriendItem key={userId}>
            <div>
              <Link to={`/album/${userId}`}>
                <Avatar src={image} size='66px' />
              </Link>
              <span>{name}</span>
            </div>
            <Button
              onClick={() => console.log(`${name} 친구 추가`)}
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
