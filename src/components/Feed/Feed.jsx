import React from 'react';
import FeedItem from './FeedItem';
import * as S from './Feed.style';
import { feedData } from '../../dummy/data/comments'; 

const Feed = () => {
  return (
    <S.FeedContainer>
      {feedData.map((item) => (
        <FeedItem key={item.id} data={item} />
      ))}
    </S.FeedContainer>
  );
};

export default Feed;
