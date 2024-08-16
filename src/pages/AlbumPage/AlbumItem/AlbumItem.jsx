import { Link } from 'react-router-dom';

import { AlbumButton } from '../index.js';
import { Icon } from '../../../components/Icon';

import * as S from './AlbumItem.style.jsx';

export default function AlbumItem({ album }) {
  const { coverImage, title, like, comment, bookmark } = album;

  return (
    <S.AlbumItem>
      <S.Img src={coverImage} alt={title} />
      <S.AlbumHover>
        <S.IconContainer>
          <S.IconBox>
            <Icon id='heart' width='24' />
            <span>{like}</span>
          </S.IconBox>
          <S.IconBox>
            <Icon id='comment' width='24' />
            <span>{comment}</span>
          </S.IconBox>
          <S.IconBox>
            <Icon id='bookmark-fill' width='24' />
            <span>{bookmark}</span>
          </S.IconBox>
        </S.IconContainer>
        <S.ButtonContainer>
          <Link key={album.id} to={`/album/detail/${album.id}`}>
            <AlbumButton>내 앨범 구경하기</AlbumButton>
          </Link>
          <AlbumButton onClick={() => console.log('앨범 수정하기')}>
            앨범 수정하기
          </AlbumButton>
        </S.ButtonContainer>
      </S.AlbumHover>
    </S.AlbumItem>
  );
}
