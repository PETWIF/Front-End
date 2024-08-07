import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './AlbumUpdates.style';

const ALBUM_UPDATES = [
  // 더미 데이터
  { userId: 1, userName: 'pet_01', profileImage: '/path/to/image1.jpg' },
  { userId: 2, userName: 'pet_02', profileImage: '/path/to/image2.jpg' },
  { userId: 3, userName: 'pet_03', profileImage: '/path/to/image1.jpg' },
  { userId: 4, userName: 'pet_04', profileImage: '/path/to/image2.jpg' },
  { userId: 5, userName: 'pet_05', profileImage: '/path/to/image1.jpg' },
  { userId: 6, userName: 'pet_06', profileImage: '/path/to/image2.jpg' },
];

const AlbumUpdates = () => {
  return (
    <S.AlbumUpdatesContainer>
      {ALBUM_UPDATES.map(({ userId, userName, profileImage }) => (
        <S.AlbumUpdateItem key={userId}>
          <Link to={`/album/${userId}`}>
            <S.ProfileImage src={profileImage} alt={userName} />
          </Link>
          <S.UserName>{userName}</S.UserName>
        </S.AlbumUpdateItem>
      ))}
    </S.AlbumUpdatesContainer>
  );
};

export default AlbumUpdates;
