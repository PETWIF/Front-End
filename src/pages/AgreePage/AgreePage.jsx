import { Link } from 'react-router-dom';

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
                    to='/signup'
                    backIcon='true'
                    titleText='이용 약관'
                    />
                    <S.ExplainContainer>
                        <S.MainBoldText>서비스 이용을 위해 약관에 동의해 주세요.</S.MainBoldText>
                        <S.MainNormalText>서비스 항목에 동의하지 않으시면 서비스 이용에 제한이 생길 수 있습니다.</S.MainNormalText>
                    </S.ExplainContainer>
                    <S.FormContainer onSubmit={handleSubmit}>
                        <S.AllAgreeContainer>
                            <Icon id={isChecked ? 'check' : 'uncheck'} width='35px' height='35px' onClick={checking}/>
                            <S.GrayText>전체 동의하기</S.GrayText>
                        </S.AllAgreeContainer>
                        <S.StyledHr />
                        <S.ServiceTermWrapper>
                            <S.TermTitleContainer>
                                <S.GrayText>[필수] 서비스 이용 약관</S.GrayText>
                                <input type='checkbox' />
                            </S.TermTitleContainer>
                            <S.ServiceTermContainer>
                                <Service />
                            </S.ServiceTermContainer>
                        </S.ServiceTermWrapper>
                        <S.ServiceTermWrapper>
                            <S.TermTitleContainer>
                                {/* span 컬러 바꾸기 -> props로 받아 올 수 없나? */}
                                <S.GrayText>[필수] 개인정보 처리 약관</S.GrayText>
                                <input type='checkbox' />
                            </S.TermTitleContainer>
                            <S.ServiceTermContainer>
                                <Privacy />
                            </S.ServiceTermContainer>
                        </S.ServiceTermWrapper>
                    </S.FormContainer>
                    <Link to='/setNickname'>
                    <Button
                        width='446px'
                        padding='16px'
                        buttonStyle='gray'>
                        다음으로
                    </Button>
                    </Link>
                </S.FormWrapper>
                    <Link to='/login'>
                        <Button
                            width='537px'
                            padding='20px'
                            borderRadius='0'
                            buttonStyle='light'
                            hasBorder='true'>
                            계정이 있으신가요? 로그인
                        </Button>
                    </Link>
                </S.Container>
            </S.Wrapper>         
        </main>
    );
}