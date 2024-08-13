import { Link } from 'react-router-dom';

import { Button } from '../../components/Button';

import LoginHeader from '../../components/LoginComponents/LoginHeader';
import TitleContainer from '../../components/LoginComponents/TitleContainer';

import * as S from './AddInfoPage.style.jsx';

// 추후 유효성 검사 통과 여부에 따라 글씨 바뀌도록 설정 필요
export default function AddInfoPage() {
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
              to='setNickname'
              backIcon='true'
              titleText='추가 정보 입력'
            />
            <S.FormContainer onSubmit={handleSubmit}>
              <S.MainBoldText>회원 정보</S.MainBoldText>
              <S.StyledHr />
              {/* css, radio 체크 */}
              <S.MainBoldText>성별</S.MainBoldText>
              <S.InputWrapper>
                <S.InputStyle
                  $width='20px'
                  type='radio'
                  name='gender'
                  value='male'
                />
                <S.MainNormalText>남성</S.MainNormalText>
                <S.InputStyle
                  $width='20px'
                  type='radio'
                  name='gender'
                  value='female'
                />
                <S.MainNormalText>여성</S.MainNormalText>
              </S.InputWrapper>
              <S.MainBoldText>생년월일</S.MainBoldText>
              <S.InputWrapper>
                <S.InputStyle
                  $width='92px'
                  type='text'
                  className='year'
                  placeholder='연도'
                />
                <S.InputStyle
                  $width='92px'
                  type='text'
                  className='month'
                  placeholder='월'
                />
                <S.InputStyle
                  $width='92px'
                  type='text'
                  className='day'
                  placeholder='일'
                />
              </S.InputWrapper>
              <S.MainBoldText>전화번호</S.MainBoldText>
              <S.InputWrapper>
                <S.SelectStyle $width='92px' className='mobile'>
                  <option value=''>통신사 선택</option>
                  <option value='skt'>SKT</option>
                  <option value='kt'>KT</option>
                  <option value='lg-uplus'>LG U+</option>
                  <option value='skt-lite'>SKT 알뜰폰</option>
                  <option value='kt-lite'>KT 알뜰폰</option>
                  <option value='lg-uplus-lite'>LG U+ 알뜰폰</option>
                </S.SelectStyle>
                <S.InputStyle
                  type='text'
                  className='phone'
                  placeholder='전화번호를 입력해 주세요'
                />
              </S.InputWrapper>
              <S.MainBoldText>거주지</S.MainBoldText>
              <S.InputWrapper>
                <S.InputStyle
                  $width='316px'
                  type='text'
                  className='address'
                  placeholder='거주지를 입력해 주세요'
                />
                <Button width='119px' padding='14px' buttonStyle='orange'>
                  주소 검색
                </Button>
              </S.InputWrapper>
              <br />
              <S.MainBoldText>반려동물 정보</S.MainBoldText>
              <S.StyledHr />
              <S.InputWrapper>
                <S.InputContainer>
                  <S.MainBoldText>이름</S.MainBoldText>
                  <S.InputStyle
                    $width='263px'
                    type='text'
                    className='pet-name'
                    placeholder='반려동물의 이름을 입력해 주세요'
                  />
                </S.InputContainer>
              </S.InputWrapper>
              <S.MainBoldText>성별</S.MainBoldText>
              <S.InputWrapper>
                <S.InputStyle
                  $width='20px'
                  type='radio'
                  name='pet-gender'
                  value='pet-male'
                />
                <S.MainNormalText>수컷</S.MainNormalText>
                <S.InputStyle
                  $width='20px'
                  type='radio'
                  name='pet-gender'
                  value='pet-female'
                />
                <S.MainNormalText>암컷</S.MainNormalText>
              </S.InputWrapper>
              <S.InputWrapper>
                <S.InputContainer>
                  <S.MainBoldText>나이</S.MainBoldText>
                  <S.InputStyle
                    $width='263px'
                    type='text'
                    className='pet-age'
                    placeholder='반려동물의 나이를 입력해 주세요'
                  />
                </S.InputContainer>
              </S.InputWrapper>
              <Link to='/registered'>
                <Button width='100%' padding='15px' buttonStyle='gray'>
                  입력 완료
                </Button>
              </Link>
            </S.FormContainer>
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
