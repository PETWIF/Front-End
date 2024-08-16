import React, { useRef } from 'react';
import * as S from './AlbumViewer.style';
import { ALBUM_PHOTOS } from '../../dummy/data';

export default function AlbumViewer() {
  const imageRefs = useRef([]);
  
  const scrollToImage = (index) => {
    if (imageRefs.current[index]) {
      imageRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <S.MainContainer>
      <S.Sidebar>
        {ALBUM_PHOTOS.map((photo, index) => (
          <S.Thumbnail
            key={photo.id}
            src={photo.coverImage}
            onClick={() => scrollToImage(index)}
          />
        ))}
      </S.Sidebar>
      <S.ImageContainer>
        {ALBUM_PHOTOS.map((photo, index) => (
          <S.ImageWrapper
            key={photo.id}
            ref={(el) => (imageRefs.current[index] = el)}
          >
            <S.Image src={photo.coverImage} alt={photo.description} />
            <S.DescriptionWrapper>
              <S.Title>{photo.id}</S.Title> {/* id를 표시 */}
              <S.Description>{photo.description}</S.Description>
            </S.DescriptionWrapper>
          </S.ImageWrapper>
        ))}
      </S.ImageContainer>
    </S.MainContainer>
  );
}
