import React, { useState } from 'react';
import { useStore } from '../../store/store';
import {
  SideContainer,
  Category,
  Paragraph,
  Paragraph2,
  Category2,
  Sticker,
  Button1,
  Button2,
  EditSelectContainer,
  ButtonBack,
  StickerContainer,
  StickerTitleContainer,
  CloseButton,
  Emoticon,
  StickerSelectContainer,
  StickerSContainer,
  StickerSelectSection,
  EditTitleContainer,
  SideSection1,
  SideSection2,
  SideSection3,
} from './Side.style';
import { Icon } from '../Icon';
import MakingModal from './MakingModal';

export default function Side() {
  const {
    isStickerSelected,
    isMineSelected,
    isMarketSelected,
    selectSticker,
    selectMine,
    selectMarket,
    isCoverEditing,
    startCoverEditing,
    stopCoverEditing,
    isTextEditing,
    toggleTextEditing,
  } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <SideContainer>
      <SideSection1>
        <EditSelectContainer>
          <EditTitleContainer>
            <Paragraph2>앨범 편집</Paragraph2>
          </EditTitleContainer>
          <Category>
            <Icon id='editPic' width='42' height='42'></Icon>
            <Paragraph>사진 추가</Paragraph>
          </Category>
          <Category $isActive={isTextEditing} onClick={toggleTextEditing}>
            <Icon id='editText' width='42' height='42'></Icon>
            <Paragraph>텍스트 편집</Paragraph>
          </Category>
          <Category $isActive={isStickerSelected} onClick={selectSticker}>
            <Icon id='editSticker' width='42' height='42'></Icon>
            <Paragraph>스티커 꾸미기</Paragraph>
          </Category>
          <Category>
            <Icon id='tamplate' width='42' height='42'></Icon>
            <Paragraph>앨범 템플릿</Paragraph>
          </Category>
        </EditSelectContainer>
      </SideSection1>

      {isStickerSelected && (
        <>
          <SideSection2>
            <StickerContainer>
              <StickerTitleContainer>
                <Paragraph2>스티커</Paragraph2>
                <CloseButton onClick={() => selectSticker(false)}>
                  &times;
                </CloseButton>
              </StickerTitleContainer>
              <StickerSelectContainer>
                <StickerSelectSection>
                  <Category2 $isActive={isMineSelected} onClick={selectMine}>
                    <Paragraph>내 스티커</Paragraph>
                  </Category2>
                  <Category2 $isActive={isMarketSelected} onClick={selectMarket}>
                    <Paragraph>스티커 상점</Paragraph>
                  </Category2>
                </StickerSelectSection>
              </StickerSelectContainer>

              {isMineSelected && (
                <StickerSContainer>
                  <Sticker>
                    <Emoticon></Emoticon>
                    <Emoticon></Emoticon>
                    <Emoticon></Emoticon>
                    <Emoticon></Emoticon>
                    <Emoticon></Emoticon>
                    <Emoticon></Emoticon>
                    <Emoticon></Emoticon>
                    <Emoticon></Emoticon>
                    <Emoticon></Emoticon>
                  </Sticker>
                </StickerSContainer>
              )}

              {isMarketSelected && (
                <StickerSContainer>
                  <Sticker>
                    <Emoticon></Emoticon>
                    <Emoticon></Emoticon>
                    <Emoticon></Emoticon>
                    <Emoticon></Emoticon>
                    <Emoticon></Emoticon>
                    <Emoticon></Emoticon>
                  </Sticker>
                </StickerSContainer>
              )}
            </StickerContainer>
          </SideSection2>
        </>
      )}

      {isCoverEditing ? (
        <>
          <SideSection3>
            <Button1 onClick={openModal}>업로드</Button1>
            <ButtonBack onClick={stopCoverEditing}>뒤로 가기</ButtonBack>
            {isModalOpen && <MakingModal close={closeModal} />}
          </SideSection3>
        </>
      ) : (
        <>
          <SideSection3>
            <Button1 onClick={startCoverEditing}>표지 만들고 업로드</Button1>
            <Button2>초안으로 저장</Button2>
          </SideSection3>
        </>
      )}
    </SideContainer>
  );
}
