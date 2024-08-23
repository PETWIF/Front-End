import { Link } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import { getSuggestedFriendList, requestFriend } from '../../apis/friend.js';

import usePagination from '../../hooks/usePagination.jsx';

import { Button } from '../Button';
import { Layout } from '../Common';
import { Avatar } from '../Avatar';

import { RANDOM_FRIENDS } from '../../dummy/data';

import * as S from './RandomFriend.style.jsx';

const nickname = '펫위프';

export default function RandomFriend() {
  const { data, status, fetchNextPage } = usePagination({
    queryKey: ['suggestedFriendList'],
    queryFn: ({ pageParam }) => getSuggestedFriendList({ page: pageParam }),
  });

  const queryClient = useQueryClient();
  const request = useMutation({
    mutationFn: (nickname) => requestFriend({ nickname }),
    onSuccess: () => {
      queryClient.invalidateQueries(['suggestedFriendList']);
      queryClient.invalidateQueries(['friendSentList']);
    },
  });

  if (!data) return null;

  const friendList =
    data && !data.pages.includes(undefined)
      ? data.pages.flatMap((page) => page)
      : [];

  return (
    <S.RandomFriendLayout>
      <S.Title>{nickname}님을 위한 추천</S.Title>
      <S.FriendList>
        {friendList.map(({ nickname, profile_url: profileUrl }) => (
          <S.FriendItem key={nickname}>
            <div>
              <Link to={`/album/${nickname}`}>
                <Avatar src={profileUrl} size='66px' />
              </Link>
              <span>{nickname}</span>
            </div>
            <Button
              onClick={() => request.mutate(nickname)}
              width='100px'
              padding='8px'
              borderRadius='5px'
            >
              친구 추가
            </Button>
          </S.FriendItem>
        ))}
      </S.FriendList>
      {friendList.length === 0 && <S.Text>추천 친구</S.Text>}
      {friendList.length > 0 && status === 'success' && (
        <Button
          onClick={() => fetchNextPage()}
          padding='11px'
          buttonStyle='light'
          borderRadius='5px'
          hasBorder
        >
          더 많은 프로필 보기
        </Button>
      )}
    </S.RandomFriendLayout>
  );
}
