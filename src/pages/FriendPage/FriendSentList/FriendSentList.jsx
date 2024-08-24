import { getFriendSentList } from '../../../apis/friend.js';

import useAuth from '../../../hooks/useAuth.jsx';
import useFriend from '../../../hooks/useFriend.jsx';
import usePagination from '../../../hooks/usePagination.jsx';

import { Avatar } from '../../../components/Avatar';
import { Button } from '../../../components/Button';

import * as S from '../Common.Style.jsx';

export default function FriendSentList() {
  const { nickname: myNickname } = useAuth();
  const { cancel } = useFriend();
  const { data, status, fetchNextPage } = usePagination({
    queryKey: ['friendSentList'],
    queryFn: ({ pageParam }) => getFriendSentList({ page: pageParam }),
  });

  if (!data) return null;

  const friendList =
    data && !data.pages.includes(undefined)
      ? data.pages.flatMap((page) => page)
      : [];

  return (
    <S.FriendLayout>
      <S.FriendContainer>
        <S.Title>{myNickname}님이 보낸 친구 요청</S.Title>
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
                  cancel.mutate(nickname);
                }}
                width='100px'
                padding='8px'
                borderRadius='5px'
                buttonStyle='white'
                hasBorder
              >
                요청 취소
              </Button>
            </S.FriendItem>
          ))}
        </S.FriendList>
        {friendList.length === 0 && <S.Text>보낸 친구 요청이 없습니다</S.Text>}
        {friendList.length > 0 && status === 'success' && (
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
      </S.FriendContainer>
    </S.FriendLayout>
  );
}
