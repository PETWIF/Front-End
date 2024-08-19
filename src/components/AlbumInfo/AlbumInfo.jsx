import { Avatar } from '../Avatar/index.js';
import { Button } from '../Button/index.js';
import { Icon } from '../Icon/index.js';
import { Profile as Img } from '../../dummy/images/index.js';

import * as S from './AlbumInfo.style.jsx';

const nickname = '펫위프';

const PROFILE_INFO_LIST = [
  { label: '조회수', value: 1450 },
  { label: '좋아요', value: 103 },
  { label: '댓글', value: 23 },
  { label: '북마크', value: 23 },
];

function formatNumber(value) {
  if (value >= 10000) {
    return (value / 10000).toFixed(1) + '만';
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + '천';
  }
  return value.toString();
}

export default function AlbumInfo({ album }) {
  const { coverImage, title, date, like, comment, bookmark } = album;

  // 날짜 형식 변환
  const formattedDate = new Date(date);
  const displayDate = `${formattedDate.getFullYear()}. ${(formattedDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}. ${formattedDate.getDate().toString().padStart(2, '0')}`;

  return (
    <S.ProfileLayout>
      <S.TopContainer>
        <S.Img src={coverImage} alt={title} />
        <S.AlbumDetails>
          <S.AlbumTitle>{title}</S.AlbumTitle>
          <S.AlbumDate>{displayDate}</S.AlbumDate>
        </S.AlbumDetails>
      </S.TopContainer>
      <S.ProfileInfoList>
        {PROFILE_INFO_LIST.map(({ label, value }) => (
          <S.ProfileInfoItem key={label}>
            <span>{formatNumber(value)}</span>
            <span>{label}</span>
          </S.ProfileInfoItem>
        ))}
      </S.ProfileInfoList>
    </S.ProfileLayout>
  );
}