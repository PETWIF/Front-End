import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getAlbumList } from '../../../apis/album.js';
import { checkBlock } from '../../../apis/block.js';

import { useAuth } from '../../../hooks/useAuth.jsx';
import useModal from '../../../hooks/useModal.jsx';
import usePagination from '../../../hooks/usePagination.jsx';
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

export default function AlbumPage() {
  const { nickname } = useAuth();
  const navigate = useNavigate();
  const { isOpen, open, close, Modal } = useModal();

  const params = useParams();
  const currentNickname = decodeURIComponent(params.nickname || nickname);

  const [sort, setSort] = useState();
  const [showChat, setShowChat] = useState(false); // State to toggle between RandomFriend and Chat

  const { data, ref } = usePagination({
    queryKey: ['albumList', currentNickname, sort?.value ?? 'LATEST'],
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

  const handleCheckBlock = async () => {
    const response = await checkBlock({ nickname: currentNickname });
    const { block } = response;

    if (block) {
      console.log(`이 사용자를 차단했으므로 페이지를 볼 수 없습니다:`, data);
      open();
    } else {
      console.log(response);
      console.log('차단하지 않은 사용자입니다. 앨범 페이지를 로드합니다.');
    }
  };

  const albumList =
    data && !data.pages.includes(undefined)
      ? data.pages.flatMap((page) => page)
      : [];

  const rest = albumList.slice(0, -1); // 마지막 요소를 제외한 나머지 배열
  const last = albumList[albumList.length - 1] ?? {};

  useEffect(() => {
    if (currentNickname) {
      handleCheckBlock();
    }
  }, [currentNickname]);

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
              {rest.map((album) => (
                <AlbumItem key={album.albumId} album={album} />
              ))}
              {albumList.length > 0 && (
                <AlbumItem ref={ref} key={last.albumId} album={last} />
              )}
            </S.AlbumList>
          )}
          <S.AlbumAmount>
            <span>{albumList?.length}</span>
            <span>Albums</span>
          </S.AlbumAmount>
        </S.AlbumBox>
      </S.MainContainer>
      <S.SideContainer>
        <Profile />
        {showChat ? <Chatting /> : <RandomFriend />}
      </S.SideContainer>
      {isOpen && <Modal text='내가 차단한 사용자의 앨범 페이지입니다! 버튼을 누르면 홈으로 돌아갑니다.' close={() => {close(); navigate('/home');}} />}
    </S.MainLayout>
  );
}
