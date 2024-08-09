import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';

import useCheckIcon from '../../hooks/useCheckIcon.jsx';

import * as S from './LoginPage.style.jsx';

export default function LoginPage() {
    const { isChecked, checking } = useCheckIcon();

    const handleSubmit = (event) => {
        event.preventDefault(); 
        // 여기에 코드 추가
    };

    return (
        <main>
            <S.Wrapper>
                <S.PETWIFContainer $direction='column'>
                    <Icon id='logo' width='293px' height='58px' /> 
                    <S.MainBoldText>
                        반려동물과의 추억을 사람들과 나눠 보세요
                    </S.MainBoldText>
                    <S.MockUp />
                </S.PETWIFContainer>
                <S.FormWrapper> 
                    <S.FormContainer onSubmit={handleSubmit}>
                        <S.InputContainer>
                            <S.MainBoldText>이메일</S.MainBoldText>
                            <S.InputStyle 
                                type='text'
                                className='email' 
                                placeholder='이메일을 입력해 주세요'
                            />
                        </S.InputContainer>
                        <S.InputContainer>
                            <S.MainBoldText>비밀번호</S.MainBoldText>
                            <S.InputStyle 
                                type='text'
                                className='password' 
                                placeholder='비밀번호를 입력해 주세요'
                            />
                        </S.InputContainer>
                        <S.AutoLoginContainer>
                            <Icon id={isChecked ? 'check' : 'uncheck'} width='35px' height='35px' onClick={checking}/>
                            <span>자동 로그인</span> 
                        </S.AutoLoginContainer>
                        <Button
                            width='370px'
                            padding='18px'
                            buttonStyle='gray'
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                            // 후에 기능 구현할 때, 유효성 검사 통과하면 버튼 오렌지로 바뀌도록 할 것
                        >
                            로그인
                        </Button>
                    </S.FormContainer>

                    <S.UnderlinedText to='/searchPwd'>
                        비밀번호를 잃어버리셨나요?
                    </S.UnderlinedText>
                    <S.StyledHr />
                    <S.MainBoldText>간편 로그인</S.MainBoldText>
                    <S.SocialLoginWrapper>
                        <S.SocialLoginContainer id='kakao' width='62px' height='62px' />
                        <S.SocialLoginContainer id='naver' width='62px' height='62px' />
                        <S.SocialLoginContainer id='apple' width='62px' height='62px' />
                        <S.SocialLoginContainer id='google' width='62px' height='62px' />
                    </S.SocialLoginWrapper>
                    <S.UnderlinedText to='/signup'>
                        아직 회원이 아니시라면?
                    </S.UnderlinedText>
                </S.FormWrapper>
            </S.Wrapper>
        </main>
    );
}
