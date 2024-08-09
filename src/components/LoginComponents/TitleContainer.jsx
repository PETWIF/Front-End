import { Link } from 'react-router-dom';

import { Icon } from '../Icon';

import * as S from './TitleContainer.style.jsx';

export default function TitleContainer({ 
  to,
  backIcon,
  modal,
  titleText,
}) {
  return (
    <S.TitleContainer
      // 디자인 팀에 물어보고, $to 추가해서 링크 바꿔야 하면 바꿀 것
      $backIcon={backIcon} // true일 경우 뒤로 가기 아이콘이 존재
      $modal={modal} // true일 경우 모달을 사용
      $titleText={titleText} // 제목 텍스트
    >
      {backIcon ? (
        <Link to={to || '/login'}>
          <Icon id='back' width='35px' height='35px' />
        </Link>
      ) : ""}
      <S.TitleText>{titleText}</S.TitleText> 
      {backIcon ? <S.Spacer /> : ""}
    </S.TitleContainer>
  );
}
