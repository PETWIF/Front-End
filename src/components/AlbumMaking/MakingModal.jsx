import React, { useState } from 'react';
import * as S from './MakingModal.style';
import { Radio, RadioGroup } from '../Input';
import { createAlbum } from '../../apis/album';
import { useNavigate } from 'react-router-dom';

export default function AlbumModal({ close, albumCover, albumImages }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [scope, setScope] = useState('MY');
  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleScopeChange = (value) => setScope(value);

  const handleUpload = async () => {
    try {
      const coverImage = await fetch(albumCover)
        .then((res) => res.blob())
        .then(
          (blob) => new File([blob], 'coverImage.png', { type: 'image/png' })
        );

      const albumImage = await fetch(albumImages)
        .then((res) => res.blob())
        .then(
          (blob) => new File([blob], 'albumImages.png', { type: 'image/png' })
        );

      await createAlbum({
        title,
        content,
        scope,
        coverImage,
        albumImage,
      });

      alert('앨범이 성공적으로 업로드되었습니다.');
      navigate('/home');
    } catch (error) {
      console.error('업로드 중 오류가 발생했습니다.', error);
      alert('업로드에 실패했습니다.');
    }
  };

  return (
    <S.ModalLayout>
      <S.ModalContainer>
        <S.AlbumContainer>
          <S.AlbumHeader>
            <S.B>앨범 표지</S.B>
          </S.AlbumHeader>
          <S.AlbumCover>
            {albumCover ? (
              <img
                src={albumCover}
                alt='Album Cover'
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              '이미지 없음'
            )}
          </S.AlbumCover>
        </S.AlbumContainer>
        <S.Albumcontexts>
          <div>
            <label>
              <S.B>앨범 제목</S.B>
            </label>
            <S.Input
              type='text'
              placeholder='앨범 제목을 입력해주세요'
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <label>
              <S.B>앨범 문구</S.B>
            </label>
            <S.TextArea
              placeholder='문구를 입력해주세요'
              value={content}
              onChange={handleContentChange}
            />
          </div>
          <div>
            <label>
              <S.B>공개 범위</S.B>
            </label>
            <RadioGroup
              name='open'
              defaultValue={scope}
              callback={handleScopeChange}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                padding: '10px 0',
                gap: '20px',
              }}
            >
              <Radio value='ALL'>전체 공개</Radio>
              <Radio value='FRIEND'>친구한테만 공개</Radio>
              <Radio value='MY'>비공개</Radio>
            </RadioGroup>
          </div>
          <S.ModalFooter>
            <S.CancelButton onClick={close}>취소</S.CancelButton>
            <S.Button onClick={handleUpload}>업로드</S.Button>
          </S.ModalFooter>
        </S.Albumcontexts>
      </S.ModalContainer>
    </S.ModalLayout>
  );
}
