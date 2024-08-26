import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import { getAlbumDetail, deleteAlbum } from '../../apis/album.js';

import { useAuth }from '../../hooks/useAuth.jsx';

import { AlbumDetail } from '../../components/AlbumDetail';
import { AlbumInfo } from '../../components/AlbumInfo';
import { AlbumItem } from '../AlbumPage';
import { AlbumViewer } from '../../components/AlbumViewer';
import { Chatting } from '../../components/Chatting';
import { DropDown } from '../../components/DropDown';
import { Icon } from '../../components/Icon';
import { Search } from '../../components/Search';
import { UserInfo } from '../../components/UserInfo';

import { SORT_CATEGORIES } from '../../constants';
import { ALBUM_LIST, feedData } from '../../dummy/data';

import * as S from './AlbumDetailPage.style.jsx';

export default function AlbumDetailPage() {
  const { userId } = useAuth();
  const { userId: currentUserId, albumId } = useParams();

  const { data } = useQuery({
    queryKey: ['albumDetail', albumId],
    queryFn: () => getAlbumDetail({ albumId }),
    staleTime: 1000 * 60 * 5,
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteA = useMutation({
    mutationFn: () => deleteAlbum({ albumId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['albumDetail', albumId]);
      navigate(-1);
    },
  });

  const [keyword, setKeyword] = useState('');
  const [showChat, setShowChat] = useState(false);

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
            <button onClick={() => deleteA.mutate()}>삭제</button>
          </S.ActoinButtons>
        </S.BackButton>
        {userId !== Number(currentUserId) && (
          <S.MenuList>
            <Search
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <Link to={`/album/bookmark/${userId}`}>
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
        <AlbumViewer albumImages={data.albumImages} content={data.content} />
      </S.MainContainer>
      <S.SideContainer>
        {userId !== Number(currentUserId) && <UserInfo />}
        <AlbumInfo data={data} />
        {showChat ? (
          <Chatting />
        ) : (
          <AlbumDetail album={feedData[0]} albumId={albumId} />
        )}
      </S.SideContainer>
    </S.MainLayout>
  );
}
