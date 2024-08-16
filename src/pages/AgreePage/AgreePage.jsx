import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';

import useCheckIcon from '../../hooks/useCheckIcon.jsx';

import LoginHeader from '../../components/LoginComponents/LoginHeader';
import TitleContainer from '../../components/LoginComponents/TitleContainer';

import Service from './Term/Service.jsx';
import Privacy from './Term/Privacy.jsx';

import * as S from './AgreePage.style.jsx';

export default function AgreePage() {
  const { isChecked, checking } = useCheckIcon();

  const [isServiceChecked, setIsServiceChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleAllAgreeClick = () => {
    const newState = !isAllChecked;
    setIsAllChecked(newState);
    setIsServiceChecked(newState);
    setIsPrivacyChecked(newState);
  };

  useEffect(() => {
    if (isServiceChecked && isPrivacyChecked) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [isServiceChecked, isPrivacyChecked]);

  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/setNickname', { state: { email, password } })
  };

  return (
    <main>
      <LoginHeader />
      <S.Wrapper>
        <S.Container>
          <S.FormWrapper>
            <TitleContainer
              to='/signup'
              backIcon='true'
              titleText='이용 약관'
            />
            <S.FormContainer onSubmit={handleSubmit}>
            <S.ExplainContainer>
              <S.MainBoldText>
                서비스 이용을 위해 약관에 동의해 주세요.
              </S.MainBoldText>
              <S.MainNormalText>
                서비스 항목에 동의하지 않으시면 서비스 이용에 제한이 생길 수
                있습니다.
              </S.MainNormalText>
            </S.ExplainContainer>
            <S.AllAgreeContainer onClick={handleAllAgreeClick}>
              <Icon
                id={isAllChecked ? 'checked' : 'unchecked'}
                width='35px'
                height='35px'
                onClick={checking}
              />
              <S.GrayText>전체 동의하기</S.GrayText>
            </S.AllAgreeContainer>
            <S.StyledHr />
              <S.ServiceTermWrapper>
                <S.TermTitleContainer>
                  <S.GrayText>[필수] 서비스 이용 약관</S.GrayText>
                  <input
                    type='checkbox'
                    checked={isServiceChecked}
                    onChange={() => setIsServiceChecked(!isServiceChecked)}
                  />
                </S.TermTitleContainer>
                <S.ServiceTermContainer>
                  <Service />
                </S.ServiceTermContainer>
              </S.ServiceTermWrapper>
              <S.ServiceTermWrapper>
                <S.TermTitleContainer>
                  <S.GrayText>[필수] 개인정보 처리 약관</S.GrayText>
                  <input
                    type='checkbox'
                    checked={isPrivacyChecked}
                    onChange={() => setIsPrivacyChecked(!isPrivacyChecked)}
                  />
                </S.TermTitleContainer>
                <S.ServiceTermContainer>
                  <Privacy />
                </S.ServiceTermContainer>
              </S.ServiceTermWrapper>
              <Button 
              type='submit'
                width='100%' 
                padding='16px' 
                buttonStyle='orange' 
                disabled={!isAllChecked}
                >
                다음으로
              </Button>
              </S.FormContainer>
          </S.FormWrapper>
          <Link to='/login'>
            <Button
              width='450px'
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
