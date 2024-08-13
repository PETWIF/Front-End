import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { mockPostSignup } from '../../dummy/data/user.js';

import { Button } from '../../components/Button';

import useLoginModal from '../../hooks/useLoginModal.jsx';

import LoginHeader from '../../components/LoginComponents/LoginHeader';
import TitleContainer from '../../components/LoginComponents/TitleContainer';

import * as S from './SignUpPage.style.jsx';

// 추후 유효성 검사 통과 여부에 따라 글씨 바뀌도록 설정 필요
export default function SignUpPage() {
  const { isOpen, open, close, LoginModal } = useLoginModal();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdRe, setPwdRe] = useState('');

  const [isRightEmail, setIsRightEmail] = useState(false);
  const [isRightPwd, setIsRightPwd] = useState(false);
  const [isRightPwdRe, setIsRightPwdRe] = useState(false);

  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);
  const validatePassword = (value) =>
    value.length >= 4 &&
    value.length <= 12 &&
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_])./.test(value);
  const validatePasswordRe = (value) => value === pwd;

  const [emailError, setEmailError] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [pwdReError, setPwdReError] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case 'e-mail':
        setEmail(value);
        const isValidEmail = validateEmail(value);
        setIsRightEmail(isValidEmail);
        setEmailError(
          isValidEmail ? '올바른 양식입니다!' : '올바른 양식이 아닙니다'
        );
        break;
      case 'pwd':
        setPwd(value);
        setIsRightPwd(validatePassword(value));
        setIsRightPwdRe(validatePasswordRe(pwdRe));
        const isValidPwd = validatePassword(value);
        setIsRightPwd(isValidPwd);
        if (value.length < 4 || value.length > 12) {
          if (value.length < 4) {
            setPwdError('비밀번호를 4자리 이상 입력해 주세요');
            break;
          } else if (value.length > 12) {
            setPwdError('비밀번호는 12자리까지 입력 가능합니다');
            break;
          }
        }
        if (!/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_])/.test(value)) {
          setPwdError(
            '영어, 숫자, 특수문자를 모두 조합해서 비밀번호를 작성해 주세요 '
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
            : '비밀번호가 일치하지 않습니다'
        );
        break;
      default:
        break;
    }
  };

  const navigate = useNavigate();
  const formData = { email: email, password: pwd, passwordCheck: pwdRe };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(isRightEmail && isRightPwd && isRightPwdRe)) return;

    try {
      console.log('Form data submitted:', formData);
      await mockPostSignup(formData);
      navigate('/agree');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <main>
      <LoginHeader />
      <S.Wrapper>
        <S.Container>
          <S.FormWrapper>
            <TitleContainer backIcon='true' titleText='회원 가입' />
            <S.FormContainer onSubmit={handleSubmit}>
              <S.InputWrapper>
                <S.MainBoldText>이름</S.MainBoldText>
                <S.InputStyle
                  type='text'
                  className='name'
                  placeholder='이름을 입력해 주세요'
                />
              </S.InputWrapper>
              <S.InputWrapper>
                <S.MainBoldText>이메일</S.MainBoldText>
                <S.InputContainer>
                  <S.InputStyle
                    id='e-mail'
                    type='text'
                    className='email'
                    placeholder='이메일을 입력해 주세요'
                    onChange={handleInputChange}
                  />
                  <Button width='150px' padding='13.7px' buttonStyle='gray'>
                    인증번호 전송
                  </Button>
                </S.InputContainer>
                {/* css 위치 조정 */}
                <S.WarningText className={isRightEmail ? 'success' : 'error'}>
                  {emailError}
                </S.WarningText>
              </S.InputWrapper>
              <S.InputWrapper>
                <S.MainBoldText>인증번호 입력</S.MainBoldText>
                <S.InputContainer>
                  <S.InputStyle
                    type='text'
                    className='certification'
                    placeholder='인증번호를 입력해 주세요'
                  />
                  <Button width='150px' padding='13.7px' buttonStyle='gray'>
                    인증번호 확인
                  </Button>
                </S.InputContainer>
              </S.InputWrapper>
              <S.InputWrapper>
                <S.MainBoldText>비밀번호</S.MainBoldText>
                <S.InputStyle
                  id='pwd'
                  type='password'
                  className='pwd'
                  placeholder='비밀번호를 입력해 주세요'
                  onChange={handleInputChange}
                />
                <S.WarningText className={isRightPwd ? 'success' : 'error'}>
                  {pwdError}
                </S.WarningText>
              </S.InputWrapper>
              <S.InputWrapper>
                <S.MainBoldText>비밀번호 확인</S.MainBoldText>
                <S.InputStyle
                  id='pwdRe'
                  type='password'
                  className='pwdRe'
                  placeholder='위의 비밀번호를 다시 입력해 주세요'
                  onChange={handleInputChange}
                />
                <S.WarningText className={isRightPwdRe ? 'success' : 'error'}>
                  {pwdReError}
                </S.WarningText>
              </S.InputWrapper>
              <br />
              <Button
                type='submit'
                width='100%'
                padding='15px'
                buttonStyle='gray'
              >
                가입 완료
              </Button>
            </S.FormContainer>
          </S.FormWrapper>
          <Button
            width='537px'
            padding='20px'
            borderRadius='0'
            buttonStyle='light'
            hasBorder='true'
            onClick={open}
          >
            계정이 있으신가요? 로그인
          </Button>
        </S.Container>
      </S.Wrapper>
      {isOpen && <LoginModal type='warning' close={close} />}
    </main>
  );
}
