import React, { useState, useRef } from 'react';
import Side from '../../components/AlbumMaking/Side';
import MainArea from '../../components/AlbumMaking/MainArea';
import { PageContainer } from './AlbumMakingPage.style';
import { GlobalStyles } from '../../components/AlbumMaking/MainArea.style';

export default function AlbumMakingPage() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [emoticons, setEmoticons] = useState([]);
  const [capturedImage, setCapturedImage] = useState(null);
  const mainAreaRef = useRef(null);

  const handleCaptureComplete = (image) => {
    setCapturedImage(image); // 캡처된 이미지를 상태에 저장
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
          capturedImage={capturedImage}
        />
      </PageContainer>
    </>
  );
}
