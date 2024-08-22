import { useState, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { patchChangePw } from '../../apis/changePw.js';

import { debounce } from 'lodash';

import { Button } from '../../components/Button';

import useLoginModal from '../../hooks/useLoginModal.jsx';

import LoginHeader from '../../components/LoginComponents/LoginHeader';
import TitleContainer from '../../components/LoginComponents/TitleContainer';

import * as S from './PwdChangePage.style.jsx';

export default function PwdChangePage() {
  const { isOpen, open, close, LoginModal } = useLoginModal();

  const [pwd, setPwd] = useState('');
  const [pwdRe, setPwdRe] = useState('');

  const [isRightPwd, setIsRightPwd] = useState(false);
  const [isRightPwdRe, setIsRightPwdRe] = useState(false);

  const location = useLocation();
  const { email } = location.state;

  const validatePassword = (value) =>
    value.length >= 12 &&
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_])./.test(value);
  const validatePasswordRe = (value) => value === pwd;

  const [pwdError, setPwdError] = useState('');
  const [pwdReError, setPwdReError] = useState('');

  const debouncedValidatePassword = useCallback(
    debounce((value) => {
      const isValid = validatePassword(value);
      setIsRightPwd(isValid);
      setPwdError(isValid ? '올바른 양식입니다!' : '영어, 숫자, 특수문자를 모두 조합해서 12자 이상의 비밀번호를 작성해 주세요');
    }, 200),
    [validatePassword]
  );

  const debouncedValidatePasswordRe = useCallback(
    debounce((value) => {
      const isValid = validatePasswordRe(value);
      setIsRightPwdRe(isValid);
      setPwdReError(isValid ? '비밀번호가 일치합니다!' : '비밀번호가 일치하지 않습니다');
    }, 200),
    [validatePasswordRe]
  );

  const handleInputChange = useCallback(
    (e) => {
      const { id, value } = e.target;

      switch (id) {
        case 'pwd':
          setPwd(value);
          debouncedValidatePassword(value);
          break;
        case 'pwdRe':
          setPwdRe(value);
          debouncedValidatePasswordRe(value);
          break;
        default:
          break;
      }
    },
    [
      debouncedValidatePassword,
      debouncedValidatePasswordRe,
    ]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(isRightPwd && isRightPwdRe)) return;

    try {
      const response = await patchChangePw({ email, pwd, pwdRe });
      const { isSuccess } = response;

      if (isSuccess) {
        console.log('비밀번호 변경 성공:', response);
      } else {
        setIsRightPwdRe(false); 
        setPwdReError('비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
      setIsRightPwdRe(false); 
    }
  };


  return (
    <main>
      <LoginHeader />
      <S.Wrapper>
        <S.Container>
          <S.FormWrapper>
          <TitleContainer titleText='비밀번호 변경하기' />
            <S.FormContainer onSubmit={handleSubmit}>
              <S.InputWrapper>
              <S.MainBoldText>비밀번호</S.MainBoldText>
                <S.InputContainer>
                  <S.InputStyle
                    id='pwd'
                    type='password'
                    className='pwd'
                    placeholder='비밀번호를 입력해 주세요'
                    onChange={handleInputChange}
                  />
                </S.InputContainer>
                <S.WarningText className={isRightPwd ? 'success' : 'error'}>
                    {pwdError}
                  </S.WarningText>
              </S.InputWrapper>
              <S.InputWrapper>
              <S.MainBoldText>비밀번호 확인</S.MainBoldText>
                <S.InputContainer>
                  <S.InputStyle
                    id='pwdRe'
                    type='password'
                    className='pwdRe'
                    placeholder='위의 비밀번호를 다시 입력해 주세요'
                    onChange={handleInputChange}
                  />
                </S.InputContainer>
                <S.WarningText className={isRightPwdRe ? 'success' : 'error'}>
                    {pwdReError}
                  </S.WarningText>
              </S.InputWrapper>
              <Button
                width='100%'
                padding='15px'
                buttonStyle='orange'
                onClick={open}
                disabled={!(isRightPwd && isRightPwdRe)}
              >
                비밀번호 변경하기
              </Button>
            <S.StyledHr />
            <S.UnderlinedText to='/signup'>새 계정 만들기</S.UnderlinedText>
            </S.FormContainer>
          </S.FormWrapper>
        </S.Container>
      </S.Wrapper>
      {isOpen && <LoginModal type='backToLogin' close={close} />}
    </main>
  );
}
