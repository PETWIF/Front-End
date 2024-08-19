import React, { useState } from 'react';
import Side from '../../components/AlbumMaking/Side';
import MainArea from '../../components/AlbumMaking/MainArea';
import { PageContainer } from './AlbumMakingPage.style';

export default function AlbumMakingPage() {
  const [selectedImages, setSelectedImages] = useState([]);

  return (
    <PageContainer>
      <MainArea
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
      />
      <Side setSelectedImages={setSelectedImages} />
    </PageContainer>
  );
}
