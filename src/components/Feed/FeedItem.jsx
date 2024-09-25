import { forwardRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

import useLike from '../../hooks/useLike.jsx';
import CommentSection from './CommentSection';
import { Icon } from '../Icon';
import { postReportComment, postReportAlbum } from '../../apis/report.js';
import useReportModal from '../../hooks/useReportModal.jsx';
import { albumCover, defaultProfile } from '../../dummy/images';
import { authAxios } from '../../axios/index.js';
import * as S from './Feed.style';

const likeUsers = [];

const FeedItem = forwardRef((props, ref) => {
  const { likeAlbum, deleteLikeAlbum } = useLike();
  const { data } = props;
  const {
    albumId,
    comments,
    content,
    coverImageUrl,
    likeCount,
    liked,
    memberId,
    nickName,
    profileImageUrl,
    updatedAT,
  } = data;

  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState(comments);

  const { isOpen, open, close, ReportModal } = useReportModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 댓글 리스트가 변경될 때마다 CommentSection 컴포넌트를 다시 렌더링
  useEffect(() => {
    setCommentList(comments);
  }, [comments]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    console.log('새 댓글:', newComment, albumId);
    console.log(`Sending POST request to: ${import.meta.env.VITE_SERVER_DOMAIN}/albums/${albumId}/comment`);

    if (newComment.trim()) {
      try {
        const formData = new FormData();
        formData.append('content', newComment);

        const response = await authAxios.post(
          `/albums/${albumId}/comment`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          // 사용자 이름 가져오기
          const userResponse = await authAxios.get('/member/me/withAuth');
          const username = userResponse.data.data.name; // 사용자 이름 가져오기

          const newCommentData = {
            createdAt: new Date().toISOString(), // 현재 시간으로 설정
            updatedAt: new Date().toISOString(), // 현재 시간으로 설정
            id: response.data.id,
            content: newComment,
            name: username || '현재 사용자', // 실제 사용자 이름으로 변경
            imageUrl: [], // 필요한 경우 이미지 URL 배열 추가
            childComments: [], // 초기 대댓글 배열
            liked: false, // 초기 좋아요 상태
          };

          // 댓글 리스트에 새 댓글 추가
          setCommentList((prevCommentList) => [...prevCommentList, newCommentData]);
        }
      } catch (error) {
        console.error('댓글 전송 중 오류 발생:', error);
      }
    }
  };

  const handleReportComment = async (commentId) => {
    const response = await postReportComment({ commentId, content });
    const { isSuccess, data } = response;

    if (isSuccess) {
      console.log('댓글 신고 완료:', data);
      open();
    } else {
      console.log('에러 발생');
    }
  };

  const handleReportAlbum = async () => {
    setIsMenuOpen(false);
    const reportReason = '부적절한 게시물';
    const response = await postReportAlbum({ albumId, reportReason });
    const { isSuccess, data } = response;

    if (isSuccess) {
      console.log('앨범 신고 완료:', data);
      open();
    } else {
      console.log('에러 발생');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const formatDate = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko });
  };

  return (
    <>
      <S.FeedItem ref={ref}>
        <S.FeedZone>
          <Link to={`/album/${nickName}`}>
            <S.Header>
              <S.Profile>
                <img
                  src={profileImageUrl ?? defaultProfile}
                  alt={`${nickName} 프로필`}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <S.ProfileName>{nickName}</S.ProfileName>
                  <S.CreatedAt>{formatDate(updatedAT)}</S.CreatedAt>
                </div>
              </S.Profile>
            </S.Header>
          </Link>
          <S.Actions>
            <Link to={`/chatting`}>
              <Icon id='albumdm' width='31' height='32' />
            </Link>
            <Icon
              id={liked ? 'albumheart' : 'heart-line'}
              width='31'
              height='26'
              onClick={() =>
                liked
                  ? deleteLikeAlbum.mutate({ albumId: data.albumId })
                  : likeAlbum.mutate({ albumId: data.albumId })
              }
            />
            <Link to={`/bookmark`}>
              <Icon id='albumbookmark' width='22' height='27' />
            </Link>
            <Icon id='albumhamburger' width='23' height='4' onClick={toggleMenu} />
            {isMenuOpen && (
              <div className='menu'
                style={{
                  position: 'relative',
                  top: '50px',
                  left: '10px',
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  zIndex: 1,
                }}>
                <ul style={{ listStyle: 'none', margin: 0, padding: '8px 0' }}>
                  <li onClick={handleReportAlbum}
                    style={{
                      padding: '8px 16px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      ':hover': { backgroundColor: '#f5f5f5' },
                    }}>
                    신고
                  </li>
                  <li
                    onClick={handleBlockUser}
                    style={{
                      padding: '8px 16px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      ':hover': { backgroundColor: '#f5f5f5' },
                    }}
                  >
                    차단
                  </li>
                </ul>
              </div>
            )}
          </S.Actions>
        </S.FeedZone>

        <S.MainContent>
          <S.Spacer />
          <S.AlbumDetails>
            <S.Likes>
              {likeCount > 0 ? (
                <S.AlbumLikes>
                  <img
                    src={likeUsers[0]?.profileImage ?? defaultProfile}
                    alt='profile'
                    style={{
                      width: '20px',
                      height: '20px',
                      marginRight: '10px',
                      borderRadius: '100%',
                    }}
                  />
                  {likeUsers[0]?.name ?? '알 수 없음'} 님 외 {likeCount - 1}명이
                  좋아요를 눌렀어요
                </S.AlbumLikes>
              ) : (
                `${nickName} 외 ${likeCount - 1}명이 좋아요를 눌렀어요`
              )}
            </S.Likes>
            <S.AlbumComment>{content}</S.AlbumComment>
            <S.CreatedAt>{formatDate(updatedAT)}</S.CreatedAt>
          </S.AlbumDetails>

          <S.StyledHr />

          <S.CommentSectionContainer>
            <S.CommentSection>
              <CommentSection
                key={commentList.length} // 변경된 댓글 리스트 사용
                comments={commentList}
                albumId={albumId} // albumId 추가
                onReport={handleReportComment}
              />
            </S.CommentSection>

            <S.CommentInputContainer>
              <S.PlusButton>
                <Icon id='plusbutton' width='25' height='25' />
              </S.PlusButton>
              <S.UserProfileImage
                src={profileImageUrl ?? defaultProfile}
                alt='현재 로그인된 사용자 프로필'
              />
              <S.CommentInput
                type='text'
                value={newComment}
                onChange={handleCommentChange}
                placeholder='댓글을 입력하세요...'
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) { // Shift + Enter가 아닌 경우
                    e.preventDefault(); // 줄바꿈을 막기 위해
                    handleCommentSubmit(); // 댓글 전송
                  }
                }}
              />
              <S.CommentSendButton onClick={handleCommentSubmit}>
                <Icon id='sendbutton' width='26' height='27' />
              </S.CommentSendButton>
            </S.CommentInputContainer>
          </S.CommentSectionContainer>
        </S.MainContent>
      </S.FeedItem>
      {isOpen && <ReportModal type='warning' close={close} />}
    </>
  );
});

export default FeedItem;
