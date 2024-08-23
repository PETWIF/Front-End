import { AdComponent } from '../../components/AdComponent';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { RandomFriend } from '../../components/RandomFriend';

import { RANDOM_FRIENDS } from '../../dummy/data';
import AdImg from '../../dummy/images/cat1.png';

import * as S from './FriendPage.style.jsx';

const nickname = '댕댕산책가';

export default function FriendPage() {
  return (
    <S.FriendLayout>
      <S.FriendContainer>
        <S.Title>{nickname}님의 친구 목록</S.Title>
        <S.FriendList>
          {RANDOM_FRIENDS.map(({ userId, name, image }) => (
            <S.FriendItem
              key={userId}
              onClick={() => {
                console.log('aa');
              }}
            >
              <Avatar src={image} size='66px' />
              <span>{name}</span>
              <Button
                onClick={(event) => {
                  event.stopPropagation();
                  console.log(`${name} 친구 삭제`);
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
      <S.RightSide>
        <RandomFriend />
        <AdComponent adImage={AdImg} adText='광고 컴포넌트입니다' />
      </S.RightSide>
    </S.FriendLayout>
  );
}
