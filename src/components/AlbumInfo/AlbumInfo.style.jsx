import styled from 'styled-components';
import { Layout } from '../Common';

export const ProfileLayout = styled(Layout)`
  padding: 0;  /* 전체 레이아웃 패딩을 제거 */
`;

export const TopContainer = styled.div`
  display: flex;
  background-color: #FFF8EC;
  padding: 0 16px 0 0;
  border-radius: 15px 15px 0 0; /* 상단 모서리를 layout과 동일하게 둥근 정도로 */
`;

export const AlbumDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 16px;
`;

export const AlbumTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
`;

export const AlbumDate = styled.span`
  font-size: 16px;
`;

export const NicknameContianer = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;

  & > span {
    font-weight: 500;
    font-size: 20px;
    line-height: 29px;
  }
`;

export const Description = styled.p`
  margin: 16px 0;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
`;

export const ProfileInfoList = styled.ul`
  display: flex;
  justify-content: space-around;
  padding: 16px; /* 정보 리스트의 패딩을 추가하여 여백 조정 */
`;

export const ProfileInfoItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > span {
    font-weight: 500;
    font-size: 25px;
    line-height: 36px;
  }

  & > span:last-child {
    font-size: 16px;
    line-height: 23px;
  }
`;

export const Img = styled.img`
  width: 100px; /* 이미지 크기 조정 */
  height: 100px; /* 이미지 크기 조정 */
  object-fit: cover;
  margin-right: 16px; /* 이미지와 텍스트 사이 간격 설정 */
  border-radius: 15px 0 0 0; /* 상단 모서리를 layout과 동일하게 둥근 정도로 */
`;