import { Button } from '../../components/Button';

import useLoginModal from '../../hooks/useLoginModal.jsx';

import LoginHeader from '../../components/LoginComponents/LoginHeader';
import TitleContainer from '../../components/LoginComponents/TitleContainer';

import * as S from './PwdChangePage.style.jsx';


export default function PwdChangePage() {
    const { isOpen, open, close, LoginModal } = useLoginModal();

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
                    <TitleContainer
                        titleText='비밀번호 변경하기'
                    />
                    <S.FormContainer onSubmit={handleSubmit}>
                        <S.InputWrapper>
                        <S.InputContainer>
                            <S.MainBoldText>비밀번호</S.MainBoldText>
                            <S.InputStyle 
                                type='text'
                                className='pwd' 
                                placeholder='비밀번호를 입력해 주세요'/>
                            {/* 텍스트 바뀌도록 할 것 */}
                            <S.WarningText>* 비밀번호는 몇 자 이상으로 만들어야 해요.</S.WarningText>
                        </S.InputContainer>
                        </S.InputWrapper>
                    <S.InputWrapper>
                        <S.InputContainer>
                            <S.MainBoldText>비밀번호 확인</S.MainBoldText>
                            <S.InputStyle 
                                type='text'
                                className='pwd-re' 
                                placeholder='위의 비밀번호를 다시 입력해 주세요'/>
                            <S.WarningText>* 입력한 비밀번호가 잘못되었어요.</S.WarningText>
                        </S.InputContainer>
                    </S.InputWrapper>
                    <Button
                        width='447px'
                        padding='15px'
                        buttonStyle='gray'
                        onClick={open}>
                        비밀번호 변경하기
                    </Button>
                    </S.FormContainer>
                    <S.StyledHr />
                    <S.UnderlinedText to='/signup'>새 계정 만들기</S.UnderlinedText>
                    </S.FormWrapper>
                </S.Container>     
            </S.Wrapper>          
            {isOpen && <LoginModal 
                type='backToLogin'
                close={close} 
            />}         
        </main>
    );
}