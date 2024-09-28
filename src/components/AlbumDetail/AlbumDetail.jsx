import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CommentSection from './CommentSection';
import { Icon } from '../Icon';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Chatting } from '../Chatting'; // Chatting 컴포넌트를 import
import { authAxios } from '../../axios/index.js';

import * as S from './AlbumDetail.style.jsx';
import { GiConsoleController } from 'react-icons/gi';

const AlbumDetail = ({ album, albumId }) => {
  // yourId를 props로 받아옴
  const {
    profileImage,
    profileName,
    albumImage,
    likeCount,
    createdAt,
    updatedAt,
    comments: initialComments,
    comment,
    content,
    likeUsers = [],
  } = album;
  const [newComment, setNewComment] = useState('');
  const [showChat, setShowChat] = useState(false); // 채팅 상태 관리


  const isValidDate = (date) => {
    return !isNaN(new Date(date).getTime());
  };

  const [comments, setComments] = useState(
    initialComments.map((comment) => ({
      ...comment,
      createdAt: isValidDate(comment.createdAt)
        ? formatDistanceToNow(new Date(comment.createdAt), {
            addSuffix: true,
            locale: ko,
          })
        : 'Invalid date',
      replies: comment.replies
        ? comment.replies.map((reply) => ({
            ...reply,
            createdAt: isValidDate(reply.createdAt)
              ? formatDistanceToNow(new Date(reply.createdAt), {
                  addSuffix: true,
                  locale: ko,
                })
              : 'Invalid date',
          }))
        : [],
    }))
  );

  const [commentList, setCommentList] = useState(comments);

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

  const handleReport = (commentId) => {
    console.log(`댓글 ${commentId}가 신고되었습니다.`);
  };

  const handleReportClick = () => {
    console.log(`${albumId}번 게시글이 신고되었습니다`);
  };

  const formatDate = (date) => {
    return isValidDate(date)
      ? formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko })
      : 'Invalid date';
  };

  const toggleChat = () => {
    setShowChat(true); // 채팅창을 열기
  };

  // 채팅창을 닫는 함수
  const handleCloseChat = () => {
    setShowChat(false); // 채팅창을 닫기 위해 showChat을 false로 설정
  };

  const handleCommentHeart = (commentId) => {
    console.log(`댓글 ${commentId}에 좋아요를 눌렀습니다.`);
  };

  const handleReplyHeart = (replyId, commentId) => {
    console.log(`${commentId}번 댓글의 ${replyId}번 대댓글에 좋아요를 눌렀습니다.`);
  };
  
  return showChat ? ( // showChat이 true일 때 Chatting 컴포넌트를 렌더링
    <Chatting onCloseChat={handleCloseChat}/>
  ) : (
    // showChat이 false일 때 AlbumDetail을 렌더링
    <S.AlbumDetailLayout>
      <S.IconContainer>
        <Link to='/album/bookmark'>
          <Icon id='bookmark' width='26' height='27' />
        </Link>
        <Icon id='message' width='26' height='26' onClick={toggleChat} />{' '}
        {/* 클릭 시 toggleChat 호출 */}
        <Icon
          id='reportbutton'
          width='28'
          height='28'
          onClick={handleReportClick}
        />
      </S.IconContainer>
      <S.Title>앨범 정보</S.Title>
      <S.AlbumComment>{content}</S.AlbumComment>
      <S.CreatedAt>{formatDate(updatedAt)}</S.CreatedAt>
      <S.StyledHr />

      <S.CommentSectionContainer>
        <S.CommentSection>
          <CommentSection
            key={comments.length}
            comments={comments}
            onReport={handleReport}
            onCommentHeart={handleCommentHeart}
            onReplyHeart={handleReplyHeart}
            albumId={albumId} // albumId 추가
          />
        </S.CommentSection>

        <S.CommentInputContainer>
          <S.PlusButton>
            <Icon id='plusbutton' width='25' height='25' />
          </S.PlusButton>
          <S.UserProfileImage
            src={profileImage}
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
    </S.AlbumDetailLayout>
  );
};

export default AlbumDetail;
