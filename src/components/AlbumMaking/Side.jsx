import React, { useState, useRef } from 'react';
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
import Image1 from '/src/assets/icons/image/01.png';
import Image2 from '/src/assets/icons/image/02.png';
import Image3 from '/src/assets/icons/image/03.png';
import Image4 from '/src/assets/icons/image/04.png';
import Image5 from '/src/assets/icons/image/05.png';
import Image6 from '/src/assets/icons/image/06.png';
import Image7 from '/src/assets/icons/image/07.png';
import Image8 from '/src/assets/icons/image/08.png';
import Image9 from '/src/assets/icons/image/09.png';
import Image10 from '/src/assets/icons/image/10.png';
import Image11 from '/src/assets/icons/image/11.png';
import Image12 from '/src/assets/icons/image/12.png';

export default function Side({ setSelectedImages, setEmoticons }) {
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
  const [albumCoverImage, setAlbumCoverImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleCategoryClick = () => {
    fileInputRef.current.click(); // 숨겨진 파일 입력을 클릭
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const imageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages((prevImages) => {
        return [...prevImages, ...imageUrls];
      });
    }
  };

  const handleEmoticonClick = (src) => {
    setEmoticons((prevEmoticons) => [...prevEmoticons, src]);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSaveCover = (dataUrl) => {
    setAlbumCoverImage(dataUrl);
    openModal();
  };

  return (
    <SideContainer>
      <SideSection1>
        <EditSelectContainer>
          <EditTitleContainer>
            <Paragraph2>앨범 편집</Paragraph2>
          </EditTitleContainer>
          <Category onClick={handleCategoryClick}>
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

      {/* 숨겨진 파일 입력 요소 */}
      <input
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept='image/*'
        multiple // 다중 파일 선택 가능
      />

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
                  <Category2
                    $isActive={isMarketSelected}
                    onClick={selectMarket}
                  >
                    <Paragraph>스티커 상점</Paragraph>
                  </Category2>
                </StickerSelectSection>
              </StickerSelectContainer>

              {isMineSelected && (
                <StickerSContainer>
                  <Sticker>
                    <Emoticon onClick={() => handleEmoticonClick(Image1)}>
                      <img
                        src={Image1}
                        alt='My Image'
                        style={{ width: '100%', height: '100%' }}
                      />
                    </Emoticon>
                    <Emoticon onClick={() => handleEmoticonClick(Image4)}>
                      <img
                        src={Image4}
                        alt='My Image'
                        style={{ width: '100%', height: '100%' }}
                      />
                    </Emoticon>
                    <Emoticon onClick={() => handleEmoticonClick(Image6)}>
                      <img
                        src={Image6}
                        alt='My Image'
                        style={{ width: '100%', height: '100%' }}
                      />
                    </Emoticon>
                    <Emoticon onClick={() => handleEmoticonClick(Image7)}>
                      <img
                        src={Image7}
                        alt='My Image'
                        style={{ width: '100%', height: '100%' }}
                      />
                    </Emoticon>
                    <Emoticon onClick={() => handleEmoticonClick(Image11)}>
                      <img
                        src={Image11}
                        alt='My Image'
                        style={{ width: '100%', height: '100%' }}
                      />
                    </Emoticon>
                    <Emoticon onClick={() => handleEmoticonClick(Image12)}>
                      <img
                        src={Image12}
                        alt='My Image'
                        style={{ width: '100%', height: '100%' }}
                      />
                    </Emoticon>
                  </Sticker>
                </StickerSContainer>
              )}

              {isMarketSelected && (
                <StickerSContainer>
                  <Sticker>
                    <Emoticon>
                      <img
                        src={Image2}
                        alt='My Image'
                        style={{ width: '100%', height: '100%' }}
                      />
                    </Emoticon>
                    <Emoticon>
                      <img
                        src={Image3}
                        alt='My Image'
                        style={{ width: '100%', height: '100%' }}
                      />
                    </Emoticon>
                    <Emoticon>
                      <img
                        src={Image5}
                        alt='My Image'
                        style={{ width: '100%', height: '100%' }}
                      />
                    </Emoticon>
                    <Emoticon>
                      <img
                        src={Image8}
                        alt='My Image'
                        style={{ width: '100%', height: '100%' }}
                      />
                    </Emoticon>
                    <Emoticon>
                      <img
                        src={Image9}
                        alt='My Image'
                        style={{ width: '100%', height: '100%' }}
                      />
                    </Emoticon>
                    <Emoticon>
                      <img
                        src={Image10}
                        alt='My Image'
                        style={{ width: '100%', height: '100%' }}
                      />
                    </Emoticon>
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
            <Button1
              onClick={() => {
                handleSaveCover();
              }}
            >
              업로드
            </Button1>
            <ButtonBack onClick={stopCoverEditing}>뒤로 가기</ButtonBack>
            {isModalOpen && (
              <MakingModal close={closeModal} albumCover={albumCoverImage} />
            )}
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