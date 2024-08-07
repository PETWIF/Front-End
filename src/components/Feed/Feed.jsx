import React from 'react';
import FeedItem from './FeedItem';
import * as S from './Feed.style';

const feedData = [
    {
      id: 1,
      profileImage: '/path/to/profile1.jpg',
      profileName: '고영희러버',
      albumImage: '/path/to/album1.jpg',
      likeCount: 198,
      commentCount: 5,
      createdAt: '2024-08-01T12:00:00Z',
      comment: '내 고양이 ‘고영희’과의 첫 추억이 담긴 앨범. 아기 때부터의 모습들까지 담아두니까 감회가 새롭다. 지금은 너무나도 커버렸지만, 아직도 아기때의 모습이 선명하다. 앞으로의 추억도 펫위프에 담아볼 예정이다.',
      comments: [
        {
          id: 1,
          profileImage: '/path/to/profile2.jpg',
          author: '강아지러버',
          text: '사진 잘 보고 갑니다. 귀여워요!',
          likeCount: 19,
          createdAt: '2024-08-06T13:00:00Z',
        },
        {
          id: 2,
          profileImage: '/path/to/profile3.jpg',
          author: '고양이러버',
          text: '고양이가 귀여워요!',
          likeCount: 9,
          createdAt: '2024-08-07T14:00:00Z',
        },
      ],
      likeUsers: [
        {
          id: 1,
          name: '강아지러버',
          profileImage: '/path/to/profile2.jpg'
        },
        {
          id: 2,
          name: '고양이러버',
          profileImage: '/path/to/profile3.jpg'
        },
      ],
    },
  ];
  
  

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
