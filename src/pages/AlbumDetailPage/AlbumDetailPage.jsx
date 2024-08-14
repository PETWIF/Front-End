import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AlbumInfo } from '../../components/AlbumInfo';
import { AlbumItem } from '../AlbumPage';
import { ALBUM_LIST } from '../../dummy/data';
import { DropDown } from '../../components/DropDown';
import { Icon } from '../../components/Icon';
import { RandomFriend } from '../../components/RandomFriend';
import { SORT_CATEGORIES } from '../../constants';
import * as S from './AlbumDetailPage.style.jsx';


const myId = 'myUserId1';

export default function AlbumDetailPage() {
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState();
  const params = useParams();
  const userId = params.userId || 'myUserId';

  const { albumId } = useParams();

  console.log(albumId);

  const selectedAlbum = ALBUM_LIST.find((album) => album.id === Number(albumId));

  return (
    <S.MainLayout>
      <S.MainContainer>
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
          {ALBUM_LIST && (
            <S.AlbumList>
              {ALBUM_LIST.map((album) => (
                <AlbumItem key={album.id} album={album} />
              ))}
            </S.AlbumList>
          )}
          <S.AlbumAmount>
            <span>{ALBUM_LIST.length}</span>
            <span>Albums</span>
          </S.AlbumAmount>
        </S.AlbumBox>
      </S.MainContainer>
      <S.SideContainer>
        <AlbumInfo album={selectedAlbum} />
        <RandomFriend />
      </S.SideContainer>
    </S.MainLayout>
  );
}


