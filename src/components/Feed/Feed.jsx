import { getHomeList } from '../../apis/album.js';

import usePagination from '../../hooks/usePagination.jsx';

import FeedItem from './FeedItem';

import { feedData } from '../../dummy/data/comments';

import * as S from './Feed.style';

const Feed = () => {
  const { data, Target, ref } = usePagination({
    queryKey: ['homeList'],
    queryFn: ({ pageParam }) => getHomeList({ page: pageParam }),
  });

  if (!data) {
    return null;
  }

  const homeList =
    data && !data.pages.includes(undefined)
      ? data.pages.flatMap((page) => page.mainpageAlbums)
      : [];

  const rest = homeList.slice(0, -1); // 마지막 요소를 제외한 나머지 배열
  const last = homeList[homeList.length - 1] ?? {};

  return (
    <S.FeedContainer>
      {rest.map((item) => (
        <FeedItem key={item.albumId} data={item} />
      ))}
      {homeList.length > 0 && (
        <FeedItem ref={ref} key={last.albumId} data={last} />
      )}
    </S.FeedContainer>
  );
};

export default Feed;
