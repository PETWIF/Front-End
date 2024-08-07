import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { Flex } from '../../components/Common';


export const Header = styled(Flex)` 
  height: 95px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.color.white};
  border: 1px solid  ${(props) => props.theme.color.gray3};
`;

// 페이지 전체 
export const Wrapper = styled(Flex)` 
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.color.white};
  padding: 100px;
`;

// 가운데 블럭 전체
export const Container = styled(Flex)` 
  width: 537px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.color.white};
`;

// 하단의 로그인 버튼을 제외한 폼 부분
export const FormWrapper = styled(Flex)` 
  width: 100%;
  height: 100%;
  gap: 20px;
  background-color: #fff;
  border: 1px solid #B4B4B4;
  padding: 37.5px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
`;

// 정보 입력이 필요한 실질 폼 부분
export const FormContainer = styled.form` 
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

// MainBoldText, (MainBoldText,) InputStyle, Button을 묶는 컨테이너
export const InputWrapper = styled.div`
  width: 100%;
  margin: 5px 0 20px 0;
  gap: 0 10px;
  display: flex;
  flex-direction: flex-inline;
  align-items: flex-end;
  justify-content: space-evenly;
`;

// MainBoldText, (MainBoldText,) InputStyle을 묶는 컨테이너
export const InputContainer = styled.div`
  display: flex;
  width: 100%;  
  gap: 5px;
  justify-content: flex-start;
  flex-direction: column;
`;

// input
export const InputStyle = styled.input`
  width: 100%;
  height: 56px;
  margin-top: 5px; 
  padding: 15px;
  border: none;
  border-radius: 10px;
  color: ${(props) => props.theme.color.gray3};
  background: ${(props) => props.theme.color.gray4};
`;

// back 아이콘과 TitleText, Spacer를 묶는 컨테이너
export const TitleContainer = styled.div` 
  width: 100%;
  gap: 0 120px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

// 구분선 스타일링
export const StyledHr = styled.hr`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.color.gray2};
  border: none;
`;

// TitleContainer 정렬을 위한 스페이서
export const Spacer = styled.div`
  width: 35px;
  height: 35px;
  flex: 0 0 auto;
`;

// 상단의 제목 텍스트
export const TitleText = styled.span`
  font-weight: 600;
  font-size: 25px;
  align: center;
`;

// input label과 같이 올라가는 두꺼운 텍스트
export const MainBoldText = styled.p`
  font-weight: 600;
  font-size: 17px;
  align: center;
`;

// MainBoldText 아래의 작은 텍스트
export const MainNormalText = styled.p`
  font-size: 15px;
  align: center;
  color: ${(props) => props.theme.color.gray2};
`;

// 링크, 누르면 넘어가는 밑줄 친 텍스트
export const UnderlinedText = styled(Link)`
  font-size: 15px;
  font-weight: 500;
  text-decoration-line: underline;
  color: ${(props) => props.theme.color.gray2};
`;

// 경고 문구 -> 유효성 검사로 그린, 레드 바뀌게 할 것
export const WarningText = styled.span`
  font-weight: 400;
  margin: 5px 0;
  color: #EC221F;
`;


