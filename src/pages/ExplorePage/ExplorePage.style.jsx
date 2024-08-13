import styled from 'styled-components';

export const AlbumContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* 그리드 항목의 최소 크기를 설정하고, 화면 크기에 맞게 자동으로 채우도록 설정 */
  gap: 16px; /* 앨범 사이의 간격을 설정 */
  padding: 20px;
`;

export const AlbumItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  width: 100%;
  padding-top: 75%; /* 4:3 비율을 유지하도록 설정 */

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지 비율을 유지하면서 영역을 채우도록 설정 */
    transition: transform 0.3s ease;
    border-radius: 10px;
  }

  &:hover img {
    transform: scale(1.05); /* 호버 시 살짝 확대 */
  }

  &:hover div {
    opacity: 1;
  }
`;

export const HoverInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4); /* 반투명한 검은 배경 */
  border-radius: 10px;

  span {
    display: flex;
    align-items: center;
    margin: 0 8px;
  }

  span:first-child {
    margin-left: 0;
  }

  span img {
    width: 24px;
    height: 24px;
    margin-right: 6px;
  }
`;

export const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & > span {
    font-weight: 500;
    font-size: 16px;
    line-height: 29px;
    color: ${(props) => props.theme.color.white};
  }
`;
