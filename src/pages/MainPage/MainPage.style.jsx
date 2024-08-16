import styled from 'styled-components';
export const MainContainer = styled.div`
  padding: 0 30px;
  display: flex;
  gap: 30px;
`;
export const WhiteBox = styled.div`
  flex: 1;
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
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 30px;
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