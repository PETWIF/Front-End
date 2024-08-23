import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';

import { getAlbumList } from '../../../apis/album.js';

import useAuth from '../../../hooks/useAuth.jsx';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll.jsx';

import { AlbumItem } from '../../AlbumPage';
import { DropDown } from '../../../components/DropDown';
import { Icon } from '../../../components/Icon';
import { Profile } from '../../../components/Profile';
import { RandomFriend } from '../../../components/RandomFriend';
import { Search } from '../../../components/Search';
import { Chatting } from '../../../components/Chatting';

import { SORT_CATEGORIES } from '../../../constants';
import { ALBUM_LIST } from '../../../dummy/data';

import * as S from './AlbumPage.style.jsx';

const myId = 'myUserId1';
const yourId = '댕댕산책가';
const userId = 46;

export default function AlbumPage() {
  const { nickname } = useAuth();
  const params = useParams();
  const currentNickname = decodeURIComponent(params.nickname || nickname);

  const [sort, setSort] = useState();
  const [showChat, setShowChat] = useState(false); // State to toggle between RandomFriend and Chat

  const { data, Target, ref } = useInfiniteScroll({
    queryKey: ['albumList', currentNickname, sort?.value],
    queryFn: ({ pageParam }) =>
      getAlbumList({
        nickname: currentNickname,
        page: pageParam,
        sortBy: sort?.value,
      }),
  });

  const handleToggleChat = () => {
    setShowChat((prev) => !prev);
  };

  const albumList =
    data && !data.pages.includes(undefined)
      ? data.pages.flatMap((page) => page)
      : [];

  return (
    <S.MainLayout>
      <S.MainContainer>
        {nickname !== currentNickname && (
          <S.MenuList>
            <Link to='/album/bookmark'>
              <S.MenuItem>
                <Icon id='bookmark' width='26' height='27' />
                <span>BOOKMARK</span>
              </S.MenuItem>
            </Link>
            <S.MenuItem onClick={handleToggleChat}>
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
          {albumList && (
            <S.AlbumList>
              {albumList.map((album) => (
                <AlbumItem key={album.albumId} album={album} />
              ))}
            </S.AlbumList>
          )}
          <S.AlbumAmount>
            <span>{albumList?.length}</span>
            <span>Albums</span>
          </S.AlbumAmount>
        </S.AlbumBox>
      </S.MainContainer>
      <S.SideContainer>
        <Profile userId={userId} />
        {showChat ? <Chatting userId={yourId} /> : <RandomFriend />}
      </S.SideContainer>
    </S.MainLayout>
  );
}
