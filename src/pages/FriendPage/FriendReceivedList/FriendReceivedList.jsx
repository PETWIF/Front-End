import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import {
  getFriendReceivedList,
  acceptFriend,
  rejectFriend,
} from '../../../apis/friend.js';

import useAuth from '../../../hooks/useAuth.jsx';
import usePagination from '../../../hooks/usePagination.jsx';

import { Avatar } from '../../../components/Avatar';
import { Button } from '../../../components/Button';

import * as S from '../Common.Style.jsx';

export default function FriendReceivedList() {
  const { nickname: myNickname } = useAuth();
  const { data, status, fetchNextPage } = usePagination({
    queryKey: ['friendReceivedList'],
    queryFn: ({ pageParam }) => getFriendReceivedList({ page: pageParam }),
  });

  const queryClient = useQueryClient();
  const accept = useMutation({
    mutationFn: (nickname) => acceptFriend({ nickname }),
    onSuccess: () => {
      queryClient.invalidateQueries(['friendReceivedList']);
      queryClient.invalidateQueries(['friendList']);
    },
  });

  const reject = useMutation({
    mutationFn: (nickname) => rejectFriend({ nickname }),
    onSuccess: () => {
      queryClient.invalidateQueries(['friendReceivedList']);
    },
  });

  if (!data) return null;

  const friendList =
    data && !data.pages.includes(undefined)
      ? data.pages.flatMap((page) => page)
      : [];

  return (
    <S.FriendLayout>
      <S.FriendContainer>
        <S.Title>{myNickname}님이 받은 친구 요청</S.Title>
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
              <S.Buttons>
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    accept.mutate(nickname);
                  }}
                  width='100px'
                  padding='8px'
                  borderRadius='5px'
                  buttonStyle='white'
                  hasBorder
                >
                  수락
                </Button>
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    reject.mutate(nickname);
                  }}
                  width='100px'
                  padding='8px'
                  borderRadius='5px'
                  buttonStyle='white'
                  hasBorder
                >
                  거절
                </Button>
              </S.Buttons>
            </S.FriendItem>
          ))}
        </S.FriendList>
        {friendList.length === 0 && <S.Text>받은 친구 요청이 없습니다</S.Text>}
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
