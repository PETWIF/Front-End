import { Avatar } from '../../../components/Avatar';
import { Button } from '../../../components/Button';
import { Radio, RadioGroup } from '../../../components/Input';
import Search from './Search.jsx';

import { RANDOM_FRIENDS } from '../../../dummy/data';

import * as S from './UpdateBlockListPage.style.jsx';

export default function UpdateBlockListPage() {
  return (
    <S.SettingLayout>
      <S.Content>
        <S.Fieldset>
          <S.Title>업데이트를 보지 않도록 설정한 계정</S.Title>
          <S.Field>
            <S.Text>
              사용자가 차단한 계정들의 목록입니다. 차단한 계정들의 앨범들이
              사용자에게 보이지 않게 됩니다.
            </S.Text>
            <S.SearchBox>
              <Search placeholder='계정을 입력해주세요' />
              <Button width='121px' padding='14px'>
                추가하기
              </Button>
            </S.SearchBox>
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
        <Button padding='20px'>설정하기</Button>
      </S.Content>
    </S.SettingLayout>
  );
}
