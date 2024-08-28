import React from 'react';
import * as S from './MakingModal.style';
import { Radio, RadioGroup } from '../Input';

export default function AlbumModal({ close, albumCover }) {
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
                style={{ width: '100%' }}
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
            <S.Input type='text' placeholder='앨범 제목을 입력해주세요' />
          </div>
          <div>
            <label>
              <S.B>앨범 문구</S.B>
            </label>
            <S.TextArea placeholder='문구를 입력해주세요' />
          </div>
          <div>
            <label>
              <S.B>공개 범위</S.B>
            </label>
            <RadioGroup
              name='open'
              defaultValue='public'
              callback={() => {}}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                padding: '10px 0',
                gap: '20px',
              }}
            >
              <Radio value='public' defaultChecked>
                전체 공개
              </Radio>
              <Radio value='friendpublic'>친구한테만 공개</Radio>
              <Radio value='private'>비공개</Radio>
            </RadioGroup>
          </div>
          <S.ModalFooter>
            <S.CancelButton onClick={close}>취소</S.CancelButton>
            <S.Button onClick={close}>업로드</S.Button>
          </S.ModalFooter>
        </S.Albumcontexts>
      </S.ModalContainer>
    </S.ModalLayout>
  );
}