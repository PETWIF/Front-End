import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Avatar } from '../../components/Avatar';

import { Profile as Img } from '../../dummy/images';

import LoginHeader from '../../components/LoginComponents/LoginHeader';
import TitleContainer from '../../components/LoginComponents/TitleContainer';

import * as S from './RegisteredPage.style.jsx';

export default function RegisteredPage() {
  const [redirectToHome, setRedirectToHome] = useState(false); // 상태 추가
  const location = useLocation();
  const navigate = useNavigate();

  const { nickname } = location.state;

  useEffect(() => {
    if (redirectToHome) {
      navigate('/home'); // 상태가 변경되면 홈으로 이동
    }
  }, [redirectToHome, navigate]); // redirectToHome 상태가 변경될 때마다 실행

  const handleButtonClick = () => {
    setRedirectToHome(true); // 버튼 클릭 시 상태 변경
  };

  return (
    <main>
      <LoginHeader />
      <S.Wrapper>
        <S.Container>
          <S.FormWrapper>
            <TitleContainer titleText='회원가입 완료' />
            <Avatar src={Img} size='212px' />
            <S.MainBoldText>{nickname} 님</S.MainBoldText>
            <S.StyledHr />
            <S.Welcome>
              <S.MainNormalText>
                새로운 회원이 되신 것을 환영해요!
                </S.MainNormalText>
              <S.MainNormalText>
                펫위프와 함께 추억을 저장하러 가 볼까요?
              </S.MainNormalText>
              <br />
            </S.Welcome>
            <Button width='100%' padding='16px' buttonStyle='orange' onClick={handleButtonClick}>
              홈으로 가기
            </Button>
          </S.FormWrapper>
        </S.Container>
      </S.Wrapper>
    </main>
  );
}
