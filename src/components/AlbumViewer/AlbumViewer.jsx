import { useRef } from 'react';
import * as S from './AlbumViewer.style';
import { ALBUM_PHOTOS } from '../../dummy/data';

export default function AlbumViewer({ albumImages, content }) {
  const imageRefs = useRef([]);

  const scrollToImage = (index) => {
    if (imageRefs.current[index]) {
      imageRefs.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <S.MainContainer>
      <S.Sidebar>
        {albumImages.map((url, index) => (
          <S.Thumbnail
            key={url}
            src={url}
            onClick={() => scrollToImage(index)}
          />
        ))}
      </S.Sidebar>
      <S.ImageContainer>
        {albumImages.map((url, index) => (
          <S.ImageWrapper
            key={url}
            ref={(el) => (imageRefs.current[index] = el)}
          >
            <S.Image src={url} alt={url} />
            <S.DescriptionWrapper>
              <S.Title>{content}</S.Title> {/* id를 표시 */}
              <S.Description>{content}</S.Description>
            </S.DescriptionWrapper>
          </S.ImageWrapper>
        ))}
      </S.ImageContainer>
    </S.MainContainer>
  );
}
