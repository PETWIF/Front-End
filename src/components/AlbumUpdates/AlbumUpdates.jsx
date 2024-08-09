import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './AlbumUpdates.style';
import { ALBUM_UPDATES} from '../../dummy/data/albumupdates'; 

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
