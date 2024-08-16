import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Avatar } from '../../components/Avatar';

import { Profile as Img } from '../../dummy/images';

import LoginHeader from '../../components/LoginComponents/LoginHeader';
import TitleContainer from '../../components/LoginComponents/TitleContainer';

import * as S from './RegisteredPage.style.jsx';

const nickname = '펫위프';

export default function RegisteredPage() {

  const navigate = useNavigate();

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
            <S.MainBoldText>새로운 회원이 되신 것을 환영해요!</S.MainBoldText>
            <S.MainBoldText>
              펫위프와 함께 추억을 저장하러 가 볼까요?
            </S.MainBoldText>
            <br />
            </S.Welcome>
              <Button width='100%' padding='16px' buttonStyle='orange' onClick={navigate('/home')}>
                홈으로 가기
              </Button>
          </S.FormWrapper>
        </S.Container>
      </S.Wrapper>
    </main>
  );
}
