import React, { useState } from 'react';
import Side from '../../components/AlbumMaking/Side';
import MainArea from '../../components/AlbumMaking/MainArea';
import { PageContainer } from './AlbumMakingPage.style';

export default function AlbumMakingPage() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [emoticons, setEmoticons] = useState([]);

  return (
    <PageContainer>
      <MainArea
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        emoticons={emoticons}
        setEmoticons={setEmoticons}
      />
      <Side setSelectedImages={setSelectedImages} setEmoticons={setEmoticons} />
    </PageContainer>
  );
}
