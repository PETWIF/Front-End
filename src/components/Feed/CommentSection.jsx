import React, { useState } from 'react';
import * as S from './CommentSection.style';
import { Icon } from '../Icon';

const CommentSection = ({ comments, onReport }) => {
  const [reply, setReply] = useState({});
  const [newReply, setNewReply] = useState({});
  const [showReplies, setShowReplies] = useState({});

  const handleReplyChange = (commentId, e) => {
    setNewReply({
      ...newReply,
      [commentId]: e.target.value,
    });
  };

  const handleReplySubmit = (commentId) => {
    console.log('새 대댓글:', newReply[commentId]);
    setNewReply({
      ...newReply,
      [commentId]: '',
    });
  };

  const toggleReply = (commentId) => {
    setReply({
      ...reply,
      [commentId]: !reply[commentId],
    });
  };

  const toggleShowReplies = (commentId) => {
    setShowReplies({
      ...showReplies,
      [commentId]: !showReplies[commentId],
    });
  };

  return (
    <S.CommentSection>
      {comments.map((comment) => (
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
              <S.ReplySection>
                <S.ReplyInput
                  type="text"
                  value={newReply[comment.id] || ''}
                  onChange={(e) => handleReplyChange(comment.id, e)}
                  placeholder="대댓글을 입력하세요..."
                />
                <S.ReplyButton onClick={() => handleReplySubmit(comment.id)}>등록</S.ReplyButton>
              </S.ReplySection>
            </>
          )}
        </S.Comment>
      ))}
    </S.CommentSection>
  );
};

export default CommentSection;
