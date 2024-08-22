import React, { useState } from 'react';
import * as S from './CommentSection.style';
import { Icon } from '../Icon';

const CommentSection = ({ comments, onReport }) => {
  const [commentList, setCommentList] = useState(comments);
  const [newReply, setNewReply] = useState({});
  const [showReplies, setShowReplies] = useState({});
  const [showReplyInput, setShowReplyInput] = useState({});

  const handleReplyChange = (commentId, e) => {
    setNewReply({
      ...newReply,
      [commentId]: e.target.value,
    });
  };

  const handleReplySubmit = (commentId) => {
    const replyText = newReply[commentId];

    if (replyText.trim()) {
      const updatedComments = commentList.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: Date.now(),
                author: "현재 사용자", // 실제 사용자 이름으로 변경해야함
                profileImage: "/path/to/profile.jpg", // 실제 사용자 프로필 이미지 경로로 변경해야함
                text: replyText,
                likeCount: 0,
                createdAt: "방금",
              },
            ],
          };
        }
        return comment;
      });

      setCommentList(updatedComments);

      // 대댓글 등록 후 입력창만 닫습니다.
      setShowReplyInput({
        ...showReplyInput,
        [commentId]: false,
      });

      setNewReply({
        ...newReply,
        [commentId]: '',
      });
    }
  };

  const toggleShowReplies = (commentId) => {
    const newShowReplies = !showReplies[commentId];
    setShowReplies((prevShowReplies) => ({
      ...prevShowReplies,
      [commentId]: newShowReplies,
    }));
    
    // 대댓글 목록을 보이게 할 때 대댓글 입력란도 함께 표시
    if (newShowReplies) {
      setShowReplyInput((prevShowReplyInput) => ({
        ...prevShowReplyInput,
        [commentId]: true,
      }));
    } else {
      setShowReplyInput((prevShowReplyInput) => ({
        ...prevShowReplyInput,
        [commentId]: false,
      }));
    }
  };

  return (
    <S.CommentSection>
      {commentList.map((comment) => (
        <S.Comment key={comment.id}>
          <S.CommentHeader>
            <S.CommentAuthor>
              <S.ProfileImage src={comment.profileImage} alt={`${comment.author} 프로필`} />
              {comment.author}
            </S.CommentAuthor>
            <S.ReportButton onClick={() => onReport(comment.id)}>
              신고
            </S.ReportButton>
          </S.CommentHeader>
          <S.CommentText>{comment.text}</S.CommentText>
          <S.CommentActions>
            <Icon id='commentheart' width='14' height='12'></Icon> {comment.likeCount}
            <Icon id='replybutton' width='13' height='12' onClick={() => toggleShowReplies(comment.id)} />
            {comment.replies && comment.replies.length > 0 && (
              <span>{comment.replies.length}</span>
            )}
            <S.CommentCreatedAt>{comment.createdAt}</S.CommentCreatedAt>
          </S.CommentActions>
          {showReplies[comment.id] && (
            <>
              {comment.replies && comment.replies.length > 0 && (
                <S.Replies>
                  {comment.replies.map((reply) => (
                    <S.Reply key={reply.id}>
                      <S.ReplyAuthor>
                        <S.ProfileImage src={reply.profileImage} alt={`${reply.author} 프로필`} />
                        {reply.author}
                      </S.ReplyAuthor>
                      <S.ReplyText>{reply.text}</S.ReplyText>
                      <S.ReplyActions>
                        <Icon id='commentheart' width='14' height='12'></Icon>{reply.likeCount}
                        <S.CommentCreatedAt>{reply.createdAt}</S.CommentCreatedAt>
                      </S.ReplyActions>
                    </S.Reply>
                  ))}
                </S.Replies>
              )}
              {showReplyInput[comment.id] && (
                <S.ReplySection>
                  <S.ReplyInput
                    type="text"
                    value={newReply[comment.id] || ''}
                    onChange={(e) => handleReplyChange(comment.id, e)}
                    placeholder="대댓글을 입력하세요..."
                  />
                  <S.ReplyButton onClick={() => handleReplySubmit(comment.id)}>등록</S.ReplyButton>
                </S.ReplySection>
              )}
            </>
          )}
        </S.Comment>
      ))}
    </S.CommentSection>
  );
};

export default CommentSection;
