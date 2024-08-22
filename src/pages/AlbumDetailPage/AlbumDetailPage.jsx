import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';


import { AlbumInfo } from '../../components/AlbumInfo';
import { AlbumItem } from '../AlbumPage';
import { ALBUM_LIST } from '../../dummy/data';
import { DropDown } from '../../components/DropDown';
import { Icon } from '../../components/Icon';
import { AlbumDetail } from '../../components/AlbumDetail';
import { Chatting } from '../../components/Chatting';
import { SORT_CATEGORIES } from '../../constants';
import { feedData } from '../../dummy/data';
import { Search } from '../../components/Search';
import { AlbumViewer } from '../../components/AlbumViewer';
import { UserInfo } from '../../components/UserInfo';

import * as S from './AlbumDetailPage.style.jsx';


const myId = 'myUserId1';
const yourId = '댕댕산책가';

export default function AlbumDetailPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState();
  const [showChat, setShowChat] = useState(false);
  const params = useParams();
  const userId = params.userId || 'myUserId';

  const { albumId } = useParams();

  console.log(albumId);

  const selectedAlbum = ALBUM_LIST.find((album) => album.id === Number(albumId));

  const handleBackButtonClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleToggleChat = () => {
    setShowChat((prev) => !prev);
  };

  return (
    <S.MainLayout>
      <S.MainContainer>
        <S.BackButton>
          <S.StyledIcon id = 'backbutton' width='43' height='59' onClick={handleBackButtonClick}/>
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
          </S.MenuList>
        )}
        <AlbumViewer/>
      </S.MainContainer>
      <S.SideContainer>
        <UserInfo nickname={yourId}/>
        <AlbumInfo album={selectedAlbum} />
        {showChat ? <Chatting userId={yourId} /> : <AlbumDetail album={feedData[0]} userId={yourId} albumId={albumId}/>}
      </S.SideContainer>
    </S.MainLayout>
  );
}