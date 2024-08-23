import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getAlbumDetail } from '../../apis/album.js';

import useAuth from '../../hooks/useAuth.jsx';

import { AlbumDetail } from '../../components/AlbumDetail';
import { AlbumInfo } from '../../components/AlbumInfo';
import { AlbumItem } from '../AlbumPage';
import { AlbumViewer } from '../../components/AlbumViewer';
import { DropDown } from '../../components/DropDown';
import { Icon } from '../../components/Icon';
import { AlbumDetail } from '../../components/AlbumDetail';
import { Chatting } from '../../components/Chatting';
import { SORT_CATEGORIES } from '../../constants';
import { feedData } from '../../dummy/data';
import { Search } from '../../components/Search';
import { UserInfo } from '../../components/UserInfo';

import { SORT_CATEGORIES } from '../../constants';
import { ALBUM_LIST, feedData } from '../../dummy/data';

const myId = 'myUserId1';
const yourId = '댕댕산책가';
import * as S from './AlbumDetailPage.style.jsx';

export default function AlbumDetailPage() {
  const { userId } = useAuth();
  const { userId: currentUserId, albumId } = useParams();
  const { data } = useQuery({
    queryKey: ['albumDetail', albumId],
    queryFn: () => getAlbumDetail({ albumId }),
  });

  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState();
  const [showChat, setShowChat] = useState(false);
  const params = useParams();
  const userId = params.userId || 'myUserId';

  const navigate = useNavigate();

  if (!data) {
    return null;
  }

  const handleToggleChat = () => {
    setShowChat((prev) => !prev);
  };

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
          <S.ActoinButtons>
            <button>수정</button>
            <button>삭제</button>
          </S.ActoinButtons>
        </S.BackButton>
        {myId !== userId && (
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
            <S.MenuItem onClick={handleToggleChat}>
              <Icon id='message' width='26' height='26' />
              <span>MESSAGE</span>
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
        {userId !== Number(currentUserId) && <UserInfo nickname={yourId} />}
        <AlbumInfo data={data} />
        {showChat ? <Chatting userId={yourId} /> : <AlbumDetail album={feedData[0]} userId={yourId} albumId={albumId}/>}
      </S.SideContainer>
    </S.MainLayout>
  );
}
