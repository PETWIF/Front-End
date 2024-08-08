import React from 'react';
import * as S from './MakingModal.style';

export default function AlbumModal({ close }) {
  return (
    <S.ModalLayout>
      <S.ModalContainer>
        <S.AlbumContainer>
          <S.AlbumHeader>
            <S.B>앨범 표지</S.B>
          </S.AlbumHeader>
          <S.AlbumCover>사아아진</S.AlbumCover>
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
              <S.B>앨범 태그</S.B>
            </label>
            <S.Input type='text' placeholder='태그를 입력해주세요' />
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
            <S.RadioGroup>
              <label>
                <input type='checkbox' name='visibility' value='public' />
                전체 공개
              </label>
              <label>
                <input type='checkbox' name='visibility' value='friends' />
                친구한테만 공개
              </label>
              <label>
                <input type='checkbox' name='visibility' value='private' />
                비공개
              </label>
            </S.RadioGroup>
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
