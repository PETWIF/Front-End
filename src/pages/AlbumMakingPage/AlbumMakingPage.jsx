import React, { useState } from 'react';
import Side from '../../components/AlbumMaking/Side';
import MainArea from '../../components/AlbumMaking/MainArea';
import { PageContainer } from './AlbumMakingPage.style';

export default function AlbumMakingPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <PageContainer>
      <MainArea selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
      <Side setSelectedImage={setSelectedImage}/>
    </PageContainer>
  );
}
