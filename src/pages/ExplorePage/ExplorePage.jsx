import React, { useState } from 'react';
import * as S from './ExplorePage.style';
import { ALBUM_LIST } from '../../dummy/data';
import { Icon } from '../../components/Icon';
import { Link } from 'react-router-dom';

export default function ExplorePage() {
  return (
    <S.AlbumContainer>
      {ALBUM_LIST.map((album) => (
        <S.AlbumItem key={album.id}>
          <img src={album.coverImage} alt={album.title} />
          <Link
            key={album.id}
            to={`/album/${album.nickname}/detail/${album.id}`}
          >
            <S.HoverInfo>
              <S.IconBox>
                <Icon id='heart' width='24' />
                <span>{album.like}</span>
              </S.IconBox>
              <S.IconBox>
                <Icon id='comment' width='24' />
                <span>{album.comment}</span>
              </S.IconBox>
            </S.HoverInfo>
          </Link>
        </S.AlbumItem>
      ))}
    </S.AlbumContainer>
  );
}
