import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getAlbumDetail } from '../../apis/album.js';

import { AlbumDetail } from '../../components/AlbumDetail';
import { AlbumInfo } from '../../components/AlbumInfo';
import { AlbumItem } from '../AlbumPage';
import { AlbumViewer } from '../../components/AlbumViewer';
import { DropDown } from '../../components/DropDown';
import { Icon } from '../../components/Icon';
import { Search } from '../../components/Search';
import { UserInfo } from '../../components/UserInfo';

import { SORT_CATEGORIES } from '../../constants';
import { ALBUM_LIST, feedData } from '../../dummy/data';

import * as S from './AlbumDetailPage.style.jsx';
import useAuth from '../../hooks/useAuth.jsx';

export default function AlbumDetailPage() {
  const { userId } = useAuth();
  const { userId: currentUserId, albumId } = useParams();
  const { data } = useQuery({
    queryKey: ['albumDetail', albumId],
    queryFn: () => getAlbumDetail({ albumId }),
  });

  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState();
  const navigate = useNavigate();

  if (!data) {
    return null;
  }

  return (
    <S.MainLayout>
      <S.MainContainer>
        <S.BackButton>
          <S.StyledIcon
            id='backbutton'
            width='43'
            height='59'
            onClick={() => navigate(-1)}
          />
        </S.BackButton>
        <S.MenuList>
          <Search
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
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
        <AlbumViewer albumImages={data.albumImages} content={data.content} />
      </S.MainContainer>
      <S.SideContainer>
        {userId !== Number(currentUserId) && <UserInfo />}
        <AlbumInfo data={data} />
        <AlbumDetail album={feedData[0]} />
      </S.SideContainer>
    </S.MainLayout>
  );
}
