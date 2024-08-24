import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { DropDown } from '../../components/DropDown';
import { Icon } from '../../components/Icon';
import { Search } from '../../components/Search';

import { SORT_CATEGORIES } from '../../constants';
import { ALBUM_LIST } from '../../dummy/data';

import * as S from './BookmarkPage.style';

export default function BookmarkPage() {
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState();

  // keyword를 사용하여 ALBUM_LIST를 필터링
  const filteredAlbums = ALBUM_LIST.filter(album =>
    album.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <S.PageContainer>
      <S.TopContainer>
        <Search
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <DropDown
          options={SORT_CATEGORIES}
          placeholder='나열 순서'
          value={sort}
          setFn={setSort}
        />
      </S.TopContainer>
      <S.AlbumContainer>
        {filteredAlbums.map((album) => (
          <S.AlbumItem key={album.id}>
            <img src={album.coverImage} alt={album.title} />
            <Link key={album.id} to={`/album/detail/${album.id}`}>
              <S.HoverInfo>
                <S.IconBox>
                  <Icon id='heart' width='24' />
                  <span>{album.like}</span>
                </S.IconBox>
                <S.IconBox>
                  <Icon id='comment' width='24' />
                  <span>{album.comment}</span>
                </S.IconBox>
              </S.HoverInfo>
            </Link>
          </S.AlbumItem>
        ))}
      </S.AlbumContainer>
    </S.PageContainer>
  );
}
