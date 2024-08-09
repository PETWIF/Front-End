import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { Flex } from '../../components/Common';


// 페이지 전체
export const Wrapper = styled(Flex)` 
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.color.white};
  padding: 100px 150px;
  gap: 150px;
`;

// 가운데 블럭 전체
export const Container = styled(Flex)` 
  width: 537px;
  height: 728px;
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
// SignUpPage에만 스크롤 들어가 있음
export const FormContainer = styled.form` 
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  overflow: auto;

  ::-webkit-scrollbar {
        display: none;
  }

  scrollbar-width: none;
  scrollbar-color: transparent transparent;

  -ms-overflow-style: none; 
`;

// MainBoldText, (MainBoldText,) InputStyle, Button을 묶는 컨테이너
export const InputWrapper = styled.div`
  width: 100%;
  margin: 5px 0 20px 0;
  gap: 0 10px;
  display: flex;
  flex-direction: flex-inline;
  align-items: center;
  justify-content: flex-start;
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
  width: ${(props) => props.$width || '100%'};
  height: ${(props) => props.$height || '56px'};
  margin-top: 5px; 
  padding: 15px;
  border: none;
  border-radius: 10px;
  color: ${(props) => props.theme.color.gray3};
  background: ${(props) => props.theme.color.gray4};
`;

// 구분선 스타일링
export const StyledHr = styled.hr`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.color.gray2};
  border: none;
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
  margin-top: 5px;
  color: #EC221F;
`;

export const SelectStyle = styled.select`
    width: ${props => props.$width || 'auto'};
    margin-top: 5px; 
    padding: 15px;
    border: none;
    border-radius: 10px;
    color: ${(props) => props.theme.color.gray2};
    background: ${(props) => props.theme.color.gray4};
`;