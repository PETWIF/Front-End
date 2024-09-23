import React, { useState, useRef } from 'react';
import Side from '../../components/AlbumMaking/Side';
import MainArea from '../../components/AlbumMaking/MainArea';
import { PageContainer } from './AlbumMakingPage.style';
import { GlobalStyles } from '../../components/AlbumMaking/MainArea.style';
import { useStore } from '../../store/store';

export default function AlbumMakingPage() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [emoticons, setEmoticons] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [albumImages, setAlbumImages] = useState(null);
  const mainAreaRef = useRef(null);
  const { isCoverEditing } = useStore();

  const handleCaptureComplete = (image) => {
    if (isCoverEditing) {
      setCoverImage(image); // 표지 이미지를 상태에 저장
    } else {
      setAlbumImages(image); // 앨범 이미지를 상태에 저장
    }
  };

  return (
    <>
      <GlobalStyles />
      <PageContainer>
        <MainArea
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          emoticons={emoticons}
          setEmoticons={setEmoticons}
          ref={mainAreaRef}
          onCaptureComplete={handleCaptureComplete}
        />
        <Side
          setSelectedImages={setSelectedImages}
          setEmoticons={setEmoticons}
          mainAreaRef={mainAreaRef}
          coverImage={coverImage}
          albumImages={albumImages}
        />
      </PageContainer>
    </>
  );
}
