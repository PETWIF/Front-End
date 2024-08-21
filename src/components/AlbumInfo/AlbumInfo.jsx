import { Avatar } from '../Avatar/index.js';
import { Button } from '../Button/index.js';
import { Icon } from '../Icon/index.js';

import { converDate } from '../../utils/convertDate.js';
import { formatNumber } from '../../utils/formatNumber.js';

import { Profile as Img } from '../../dummy/images/index.js';

import * as S from './AlbumInfo.style.jsx';

const ALBUM_INFO_LABEL = {
  viewCount: '조회수',
  likeCount: '좋아요',
  everyCommentCount: '댓글',
  bookmarkCount: '북마크',
};

export default function AlbumInfo({ data }) {
  const {
    coverImageUrl,
    title,
    updatedAt,
    viewCount,
    likeCount,
    everyCommentCount,
    bookmarkCount,
  } = data;
  const albumInfoValue = Object.entries(ALBUM_INFO_LABEL).map(
    ([key, label]) => ({ label, value: data[key] })
  );

  return (
    <S.ProfileLayout>
      <S.TopContainer>
        <S.Img src={coverImageUrl} alt={title} />
        <S.AlbumDetails>
          <S.AlbumTitle>{title}</S.AlbumTitle>
          <S.AlbumDate>{converDate(updatedAt)}</S.AlbumDate>
        </S.AlbumDetails>
      </S.TopContainer>
      <S.ProfileInfoList>
        {albumInfoValue.map(({ label, value }) => (
          <S.ProfileInfoItem key={label}>
            <span>{formatNumber(value)}</span>
            <span>{label}</span>
          </S.ProfileInfoItem>
        ))}
      </S.ProfileInfoList>
    </S.ProfileLayout>
  );
}
