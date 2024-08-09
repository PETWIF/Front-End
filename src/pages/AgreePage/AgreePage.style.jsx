import styled from 'styled-components';

import { Flex } from '../../components/Common';


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
export const FormContainer = styled.form` 
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

// MainBoldText, (MainBoldText,) InputStyle을 묶는 컨테이너
export const InputContainer = styled.div`
  display: flex;
  width: 100%;  
  gap: 5px;
  margin-top: 7px;
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

// 전체 동의 등을 위한 회색 텍스트
export const GrayText = styled.p`
  font-size: 17px;
  align: center;
  color: ${(props) => props.theme.color.gray1};
`;

export const ExplainContainer = styled.div` 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
`;

// 전체 동의하기
export const AllAgreeContainer = styled.div` 
  height: 40px;
  width: 100%;
  display: flex;
  flex-direcion: flex-inline;
  justify-content: flex-start;
  align-items: center;
`;

export const TermTitleContainer = styled.div`
  width: 100%;
  height: 22px;
  display: flex;
  flex-direcion: flex-inline;
  justify-content: space-between;
  align-items: center;
`;

export const ServiceTermContainer = styled.div`
  width: 100%;
  height: 86px;
  color: ${(props) => props.theme.color.gray2};
  background-color: ${(props) => props.theme.color.gray4};
  border: none;
  overflow: auto;
  border-radius: 10px;
  margin: 10px 0;
  padding: 10px;

  ::-webkit-scrollbar {
        display: none;
  }

  scrollbar-width: none;
  scrollbar-color: transparent transparent;

  -ms-overflow-style: none; 
`;

export const ServiceTermWrapper = styled.div`
  width: 447px;
  height: 115px;
  margin: 30px 0;
`;