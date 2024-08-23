import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { parse } from 'date-fns';

import { patchAddUserInfo, postAddPetInfo } from '../../apis/addInfo.js';

import { Button } from '../../components/Button';

import LoginHeader from '../../components/LoginComponents/LoginHeader';
import TitleContainer from '../../components/LoginComponents/TitleContainer';

import * as S from './AddInfoPage.style.jsx';

// 추후 유효성 검사 통과 여부에 따라 글씨 바뀌도록 설정 필요
export default function AddInfoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { nickname } = location.state || {};

  const [gender, setGender] = useState('');
  const [year, setYear] = useState(''); 
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [telecom, setTelecom] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [petName, setPetName] = useState('');
  const [petGender, setPetGender] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petKind, setPetKind] = useState('');

  const birthDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  //parse(`${year}-${month}-${day}`, 'yyyy-MM-dd', new Date());
  // `${year}-${month}-${day}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await patchAddUserInfo({ gender, birthDate, telecom, phone, address });
    const { isSuccess, data } = response;
      const petResponse = await postAddPetInfo({ petName, petGender, petAge, petKind });

    try {
      // const { isPetSuccess } = petResponse;
      console.log('정보 입력 성공');
      navigate('/registered', { state: { nickname } });
    } catch (error) {
      console.error('정보 입력 중 에러 발생:', error);
    }
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
            <S.FormContainer onSubmit={(e) => handleSubmit(e)}>
              <S.MainBoldText>회원 정보</S.MainBoldText>
              <S.StyledHr />
              <S.MainBoldText>성별</S.MainBoldText>
              <S.InputWrapper>
                <S.InputStyle
                  $width='20px'
                  type='radio'
                  name='gender'
                  value='MALE'
                  onChange={(e) => setGender(e.target.value)}
                />
                <S.MainNormalText>남성</S.MainNormalText>
                <S.InputStyle
                  $width='20px'
                  type='radio'
                  name='gender'
                  value='FEMALE'
                  onChange={(e) => setGender(e.target.value)}
                />
                <S.MainNormalText>여성</S.MainNormalText>
              </S.InputWrapper>
              <S.MainBoldText>생년월일</S.MainBoldText>
              <S.InputWrapper>
                <S.InputStyle
                  $width='92px'
                  type='text'
                  className='year'
                  placeholder='연도(YYYY)'
                  onChange={(e) => setYear(e.target.value)}
                />
                <S.InputStyle
                  $width='92px'
                  type='text'
                  className='month'
                  placeholder='월(MM)'
                  onChange={(e) => setMonth(e.target.value)}
                />
                <S.InputStyle
                  $width='92px'
                  type='text'
                  className='day'
                  placeholder='일(DD)'
                  onChange={(e) => setDay(e.target.value)}
                />
              </S.InputWrapper>
              <S.MainBoldText>전화번호</S.MainBoldText>
              <S.InputWrapper>
                <S.SelectStyle 
                  $width='92px' 
                  className='telecom'
                  onChange={(e) => setTelecom(e.target.value)}
                  >
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
                  onChange={(e) => setPhone(e.target.value)}
                />
              </S.InputWrapper>
              <S.MainBoldText>거주지</S.MainBoldText>
              <S.InputWrapper>
                <S.InputStyle
                  $width='316px'
                  type='text'
                  className='address'
                  placeholder='거주지를 입력해 주세요 (예: 서울시 용산구)'
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Button width='119px' fontSize='14px' padding='14px' buttonStyle='light'>
                  주소 입력
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
                    onChange={(e) => setPetName(e.target.value)}
                  />
                </S.InputContainer>
              </S.InputWrapper>
              <S.MainBoldText>성별</S.MainBoldText>
              <S.InputWrapper>
                <S.InputStyle
                  $width='20px'
                  type='radio'
                  name='pet-gender'
                  value='MALE'
                  onChange={(e) => setPetGender(e.target.value)}
                />
                <S.MainNormalText>수컷</S.MainNormalText>
                <S.InputStyle
                  $width='20px'
                  type='radio'
                  name='pet-gender'
                  value='FEMALE'
                  onChange={(e) => setPetGender(e.target.value)}
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
                    onChange={(e) => setPetAge(e.target.value)}
                  />
                </S.InputContainer>
              </S.InputWrapper>
              <S.InputWrapper>
                <S.InputContainer>
                  <S.MainBoldText>종류</S.MainBoldText>
                  <S.InputStyle
                    $width='263px'
                    type='text'
                    className='pet-kind'
                    placeholder='반려동물의 종류를 입력해 주세요'
                    onChange={(e) => setPetKind(e.target.value)}
                  />
                </S.InputContainer>
              </S.InputWrapper>
                <Button type='submit' width='100%' padding='15px' buttonStyle='orange'>
                  입력 완료
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
