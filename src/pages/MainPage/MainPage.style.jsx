// MainPage.style.jsx
import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const WhiteBox = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.color.white};
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 100%;
  box-sizing: border-box;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 25%;
  max-width: 500px;
  margin-left: 20px;
`;

export const AlbumUpdatesFeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  flex-grow: 1;
`;
