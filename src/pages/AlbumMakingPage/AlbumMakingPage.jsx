import React from 'react';
import Side from '../../components/AlbumMaking/Side';
import MainArea from '../../components/AlbumMaking/MainArea';
import { PageContainer } from './AlbumMakingPage.style';

export default function AlbumMakingPage() {
  return (
    <PageContainer>
      <MainArea />
      <Side />
    </PageContainer>
  );
}
