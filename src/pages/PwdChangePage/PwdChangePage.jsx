import { useState } from 'react';

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

  const validatePassword = (value) =>
    value.length >= 4 &&
    value.length <= 12 &&
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_])./.test(value);
  const validatePasswordRe = (value) => value === pwd;

  const [pwdError, setPwdError] = useState('');
  const [pwdReError, setPwdReError] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case 'pwd':
        setPwd(value);
        setIsRightPwd(validatePassword(value));
        setIsRightPwdRe(validatePasswordRe(pwdRe));
        const isValidPwd = validatePassword(value);
        setIsRightPwd(isValidPwd);
        if (value.length < 4 || value.length > 12) {
          if (value.length < 4) {
            setPwdError('* 비밀번호를 4자리 이상 입력해 주세요');
            break;
          } else if (value.length > 12) {
            setPwdError('* 비밀번호는 12자리까지 입력 가능합니다');
            break;
          }
        }
        if (!/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_])/.test(value)) {
          setPwdError(
            '* 영어, 숫자, 특수문자를 모두 조합해서 비밀번호를 작성해 주세요 '
          );
          break;
        } else setPwdError('올바른 양식입니다!');
        break;
      case 'pwdRe':
        setPwdRe(value);
        const isValidPwdRe = validatePasswordRe(value);
        setIsRightPwdRe(isValidPwdRe);
        setPwdReError(
          isValidPwdRe
            ? '비밀번호가 일치합니다!'
            : '* 입력한 비밀번호가 잘못되었어요.'
        );
        break;
      default:
        break;
    }
  };

  // const formData = { password: pwd, passwordCheck: pwdRe };

  const handleSubmit = (e) => {
    e.preventDefault();
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
                  {/* 텍스트 바뀌도록 할 것 */}
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
                buttonStyle='gray'
                onClick={open}
              >
                비밀번호 변경하기
              </Button>
            </S.FormContainer>
            <S.StyledHr />
            <S.UnderlinedText to='/signup'>새 계정 만들기</S.UnderlinedText>
          </S.FormWrapper>
        </S.Container>
      </S.Wrapper>
      {isOpen && <LoginModal type='backToLogin' close={close} />}
    </main>
  );
}
