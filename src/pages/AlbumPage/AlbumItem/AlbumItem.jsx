import { forwardRef } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useAuth }from '../../../hooks/useAuth.jsx';

import { AlbumButton } from '../index.js';
import { Icon } from '../../../components/Icon';

import * as S from './AlbumItem.style.jsx';

const AlbumItem = forwardRef((props, ref) => {
  const { album } = props;
  const { userId } = useAuth();
  const params = useParams();
  const currentUserId = Number(params?.userId) || userId;
  const { albumId, coverImageUrl, likeCount, commentCount, bookmarkCount } =
    album;

  return (
    <S.AlbumItem ref={ref}>
      <S.Img src={coverImageUrl} alt={albumId} />
      <S.AlbumHover>
        <S.IconContainer>
          <S.IconBox>
            <Icon id='heart' width='24' />
            <span>{likeCount}</span>
          </S.IconBox>
          <S.IconBox>
            <Icon id='comment' width='24' />
            <span>{commentCount}</span>
          </S.IconBox>
          <S.IconBox>
            <Icon id='bookmark-fill' width='24' />
            <span>{bookmarkCount}</span>
          </S.IconBox>
        </S.IconContainer>
        <S.ButtonContainer>
          <Link to={`/album/${currentUserId}/detail/${albumId}`}>
            <AlbumButton>앨범 구경하기</AlbumButton>
          </Link>
          <Link to={`/album/edit/${albumId}`}>
            <AlbumButton>앨범 수정하기</AlbumButton>
          </Link>
        </S.ButtonContainer>
      </S.AlbumHover>
    </S.AlbumItem>
  );
});

export default AlbumItem;
