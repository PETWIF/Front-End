import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  max-height: 800px;
`;

export const Sidebar = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
`;

export const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

export const ImageContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto; /* 스크롤은 가능하게 함 */
  max-height: 80vh;
  padding: 20px;
  position: relative;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 엣지 */
  }
  -ms-overflow-style: none; /* IE 및 Edge */
  scrollbar-width: none; /* Firefox */
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

export const DescriptionWrapper = styled.div`
  position: absolute;
  right: 0; /* 이미지를 기준으로 우측 외부에 배치 */
  bottom: 0;
  text-align: left;
  padding: 10px;
  background: none; /* 배경을 제거 */
  color: black;
  transform: translateX(100%); /* 우측 하단으로 이동 */
`;

export const Title = styled.div`
  font-family: Noto Sans KR;
  font-size: 18px;
  font-weight: 500;
  line-height: 26.06px;
  text-align: left;
`;

export const Description = styled.div`
  color: black;
  max-width: 200px;
  text-align: left;
  font-family: Noto Sans KR;
  font-size: 13px;
  font-weight: 500;
  line-height: 18.82px;
`;
