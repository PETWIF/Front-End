import { Avatar } from '../../../components/Avatar';
import { Button } from '../../../components/Button';

import { RANDOM_FRIENDS } from '../../../dummy/data';

import * as S from './BlockListPage.style.jsx';

export default function BlockListPage() {
  return (
    <S.SettingLayout>
      <S.Content>
        <S.Fieldset>
          <S.Title>계정 공개 범위</S.Title>
          <S.Field>
            <S.Label>공개 여부</S.Label>
            <S.Text>
              사용자가 차단한 계정들의 목록입니다. 차단한 계정의 앨범들이
              사용자에게 보이지 않게 됩니다.
            </S.Text>
            <S.FriendList>
              {RANDOM_FRIENDS.map(({ userId, name, image }) => (
                <S.FriendItem key={userId}>
                  <div>
                    <Avatar src={image} size='66px' />
                    <span>{name}</span>
                  </div>
                  <Button
                    onClick={() => console.log(`${name} 친구 추가`)}
                    width='100px'
                    padding='8px'
                    borderRadius='5px'
                  >
                    차단 해제
                  </Button>
                </S.FriendItem>
              ))}
            </S.FriendList>
          </S.Field>
        </S.Fieldset>
        <Button padding='20px'>저장하기</Button>
      </S.Content>
    </S.SettingLayout>
  );
}
