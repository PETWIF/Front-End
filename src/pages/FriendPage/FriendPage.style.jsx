import styled from 'styled-components';

import { Layout } from '../../components/Common';

export const FriendLayout = styled.main`
  padding: 0 30px;
  display: flex;
  gap: 30px;
`;

export const FriendContainer = styled(Layout)`
  flex: 1;
  padding: 33px 33px 16px 33px;
  overflow: hidden;
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 24px;
`;

export const FriendList = styled.ul`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  justify-content: space-between;
  row-gap: 30px;
`;

export const FriendItem = styled.li`
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  color: ${(props) => props.theme.color.black};
  border: 1px solid #e0e0e0;
  cursor: pointer;
`;

export const RightSide = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
