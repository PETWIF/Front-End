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

export const Story = styled.div`
  flex: 1;
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.color.white};
  border-radius: 15px;
  padding: 20px;
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
  overflow: auto;
  flex-grow: 1;
  max-height: 1500px;
  -ms-overflow-style: none; /* IE 및 Edge에서 스크롤 바 숨김 */
  scrollbar-width: none; /* Firefox에서 스크롤 바 숨김 */
`;
