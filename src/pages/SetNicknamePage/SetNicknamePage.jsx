import { Link } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Avatar } from '../../components/Avatar';

import { Profile as Img } from '../../dummy/images';

import LoginHeader from '../../components/LoginComponents/LoginHeader';
import TitleContainer from '../../components/LoginComponents/TitleContainer';

import * as S from './SetNicknamePage.style.jsx';

export default function SetNicknamePage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기에 코드 추가
  };

  return (
    <main>
      <LoginHeader />
      <S.Wrapper>
        <S.Container>
          <S.FormWrapper>
            <TitleContainer to='/agree' backIcon='true' titleText='프로필' />
            <Avatar src={Img} size='212px' />
            <S.FormContainer onSubmit={handleSubmit}>
              <S.MainBoldText>닉네임</S.MainBoldText>
              <S.MainNormalText>
                닉네임은 영어, 숫자, 특수문자로 이루어진 0자로 만들 수 있어요
              </S.MainNormalText>
              <S.InputStyle placeholder='닉네임을 입력해 주세요(특수문자는 _만 가능)' />
            </S.FormContainer>
            <S.InputContainer>
              <br />
              <S.MainBoldText>추가 정보 입력</S.MainBoldText>
              <S.StyledHr />
            </S.InputContainer>
            <Link to={'/addInfo'}>
              <Button width='446px' padding='16px' buttonStyle='orange'>
                지금 입력
              </Button>
            </Link>
            <Link to={'/home'}>
              <Button width='446px' padding='16px' buttonStyle='gray'>
                나중에 하기
              </Button>
            </Link>
          </S.FormWrapper>
          <Link to='/login'>
            <Button
              width='537px'
              padding='20px'
              borderRadius='0'
              buttonStyle='light'
              hasBorder='true'
            >
              계정이 있으신가요? 로그인
            </Button>
          </Link>
        </S.Container>
      </S.Wrapper>
    </main>
  );
}
