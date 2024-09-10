import { viewBlockList, unblock } from '../../../apis/block.js';

import { useAuth }from '../../../hooks/useAuth.jsx';
import usePagination from '../../../hooks/usePagination.jsx';

import { Avatar } from '../../../components/Avatar';
import { Button } from '../../../components/Button';

import * as S from './BlockListPage.style.jsx';

export default function BlockListPage() {

  const { nickname: myNickname } = useAuth();
  const { data, status, fetchNextPage } = usePagination({
    queryKey: ['blockList'],
    queryFn: ({ pageParam }) => viewBlockList({ page: pageParam }),
  });

  if (!data) return null;

  const blockList =
    data && !data.pages.includes(undefined)
      ? data.pages.flatMap((page) => page)
      : [];

  return (
    <S.SettingLayout>
      <S.Content>
        <S.Fieldset>
          <S.Title>{myNickname} 님의 차단 계정 목록</S.Title>
          <S.Field>
            <S.Label>공개 여부</S.Label>
            <S.Text>
              사용자가 차단한 계정들의 목록입니다. 차단한 계정의 앨범들이
              사용자에게 보이지 않게 됩니다.
            </S.Text>
            <S.FriendList>
          {blockList.map(({ id, nickname, profile_url: profileUrl }) => (
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
                  unblock({nickname});
                }}
                width='100px'
                padding='8px'
                borderRadius='5px'
                buttonStyle='white'
                hasBorder
              >
                차단 해제
              </Button>
            </S.FriendItem>
          ))}
        </S.FriendList>
        {blockList.length === 0 && <h1>차단한 계정이 없습니다</h1>}
        {blockList.length > 0 && status === 'success' && (
          <Button
            onClick={() => {
              fetchNextPage();
            }}
            padding='10px'
            borderRadius='5px'
            buttonStyle='light'
            hasBorder
          >
            더보기
          </Button>
        )}
          </S.Field>
        </S.Fieldset>
        <Button padding='20px'>저장하기</Button>
      </S.Content>
    </S.SettingLayout>
  );
}