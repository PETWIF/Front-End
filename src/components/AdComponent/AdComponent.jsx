import React from 'react';
import * as S from './AdComponent.style.jsx';

const AdComponent = ({ adImage, adText }) => {
  return (
    <S.AdLayout>
      <S.AdImagePlaceholder>
        <S.AdImage src={adImage} alt="광고 이미지" />
      </S.AdImagePlaceholder>
      <S.AdText>{adText}</S.AdText>
    </S.AdLayout>
  );
};

export default AdComponent;
