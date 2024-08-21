import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AlbumItem } from '../../AlbumPage';
import { DropDown } from '../../../components/DropDown';
import { Icon } from '../../../components/Icon';
import { Profile } from '../../../components/Profile';
import { RandomFriend } from '../../../components/RandomFriend';
import { Search } from '../../../components/Search';

import { SORT_CATEGORIES } from '../../../constants';
import { ALBUM_LIST } from '../../../dummy/data';

import { getAblumList } from '../../../apis/album.js';

import * as S from './AlbumPage.style.jsx';

const myId = 'myUserId1';
const userId = 46;

export default function AlbumPage() {
  const params = useParams();
  const [sort, setSort] = useState();
  const [keyword, setKeyword] = useState('');
  const { data } = useQuery({
    queryKey: ['albumList', userId, sort?.value],
    queryFn: () => getAblumList({ userId, sortBy: sort?.value }),
    staleTime: 1000 * 60 * 5,
  });
  // const userId = params.userId || 'myUserId';

  console.log(data);

  return (
    <S.MainLayout>
      <S.MainContainer>
        <Search
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        {myId !== userId && (
          <S.MenuList>
            <Link to='/album/bookmark'>
              <S.MenuItem>
                <Icon id='bookmark' width='26' height='27' />
                <span>BOOKMARK</span>
              </S.MenuItem>
            </Link>
            <S.MenuItem>
              <Icon id='message' width='26' height='26' />
              <span>MESSAGE</span>
            </S.MenuItem>
          </S.MenuList>
        )}
        <S.AlbumBox>
          <S.DropDownBox>
            <DropDown
              options={SORT_CATEGORIES}
              placeholder='나열 순서'
              value={sort}
              setFn={setSort}
            />
          </S.DropDownBox>
          {data && (
            <S.AlbumList>
              {data.map((album) => (
                <AlbumItem key={album.albumId} album={album} />
              ))}
            </S.AlbumList>
          )}
          <S.AlbumAmount>
            <span>{data?.length}</span>
            <span>Albums</span>
          </S.AlbumAmount>
        </S.AlbumBox>
      </S.MainContainer>
      <S.SideContainer>
        <Profile userId={userId} />
        <RandomFriend />
      </S.SideContainer>
    </S.MainLayout>
  );
}
