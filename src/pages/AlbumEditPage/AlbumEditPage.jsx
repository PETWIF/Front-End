import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getAlbumDetail } from '../../apis/album.js';

import { AlbumInfo } from '../../components/AlbumInfo';
import { AlbumViewer } from '../../components/AlbumViewer';
import { Edit } from '../../components/Edit';
import { UserInfo } from '../../components/UserInfo';

import * as S from './AlbumEditPage.style.jsx';

export default function AlbumEditPage() {
  const { albumId } = useParams();
  const { data } = useQuery({
    queryKey: ['albumDetail', albumId],
    queryFn: () => getAlbumDetail({ albumId }),
    staleTime: 1000 * 60 * 5,
  });

  if (!data) {
    return null;
  }

  return (
    <S.EditLayout>
      <S.EditContainer>
        <AlbumViewer albumImages={data.albumImages} content={data.content} />
      </S.EditContainer>
      <S.SideContainer>
        <Edit album={data} />
      </S.SideContainer>
    </S.EditLayout>
  );
}
