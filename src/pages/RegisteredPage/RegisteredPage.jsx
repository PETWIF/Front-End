import { Link } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { Profile } from '../../components/Profile';

import { Profile as Img } from '../../dummy/images';

import LoginHeader from '../../components/LoginComponents/LoginHeader';
import TitleContainer from '../../components/LoginComponents/TitleContainer';

import * as S from './RegisteredPage.style.jsx';

const nickname = '펫위프';

export default function RegisteredPage() {
  return (
    <main>
      <LoginHeader />
      <S.Wrapper>
        <S.Container>
          <S.FormWrapper>
            <TitleContainer titleText='회원가입 완료' />
            <Profile src={Img} size='212px' />
            <S.MainBoldText>{nickname} 님</S.MainBoldText>
            <S.StyledHr />
            <S.MainBoldText>새로운 회원이 되신 것을 환영해요!</S.MainBoldText>
            <S.MainBoldText>
              펫위프와 함께 추억을 저장하러 가 볼까요?
            </S.MainBoldText>
            <Link to={'/home'}>
              <Button width='447px' padding='16px' buttonStyle='orange'>
                홈으로 가기
              </Button>
            </Link>
          </S.FormWrapper>
        </S.Container>
      </S.Wrapper>
    </main>
  );
}
