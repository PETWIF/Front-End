import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import { getAlbumDetail, deleteAlbum } from '../../apis/album.js';

import { useAuth } from '../../hooks/useAuth.jsx';

import { AlbumDetail } from '../../components/AlbumDetail';
import { AlbumInfo } from '../../components/AlbumInfo';
import { AlbumViewer } from '../../components/AlbumViewer';
import { Chatting } from '../../components/Chatting';
import { Icon } from '../../components/Icon';
import { Search } from '../../components/Search';
import { UserInfo } from '../../components/UserInfo';

import * as S from './AlbumDetailPage.style.jsx';

export default function AlbumDetailPage() {
  const { nickname } = useAuth();
  const { nickname: currentNickname, albumId } = useParams();

  // 앨범 데이터 가져오기
  const { data } = useQuery({
    queryKey: ['albumDetail', albumId],
    queryFn: () => getAlbumDetail({ albumId }),
    staleTime: 1000 * 60 * 5,
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 앨범 삭제 핸들러
  const deleteA = useMutation({
    mutationFn: () => deleteAlbum({ albumId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['albumDetail', albumId]);
      navigate(-1);
    },
  });

  const [keyword, setKeyword] = useState('');
  const [showChat, setShowChat] = useState(false);

  // 데이터가 없을 때
  if (!data) {
    return null;
  }

  // 채팅창 토글
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
            <button onClick={() => navigate(`/album/edit/${albumId}`)}>
              수정
            </button>
            <button onClick={() => deleteA.mutate()}>삭제</button>
          </S.ActoinButtons>
        </S.BackButton>
        {nickname !== currentNickname && (
          <S.MenuList>
            <Search
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <Link to={`/album/bookmark/${nickname}`}>
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
        {/* 앨범 이미지 및 콘텐츠 */}
        <AlbumViewer
          albumImages={data.albumImages || []} // albumImages가 null일 경우 빈 배열을 사용
          content={data.content}
        />
      </S.MainContainer>
      <S.SideContainer>
        {nickname !== currentNickname && <UserInfo />}
        {/* 앨범 정보 표시 */}
        <AlbumInfo data={data} />
        {showChat ? (
          <Chatting nickname={currentNickname} onCloseChat={handleToggleChat}/>
        ) : (
          <AlbumDetail album={data} albumId={albumId} />
        )}
      </S.SideContainer>
    </S.MainLayout>
  );
}
