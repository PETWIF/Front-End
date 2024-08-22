import styled from 'styled-components';
import { Layout } from '../Common/';

export const RandomFriendLayout = styled(Layout)`
  padding: 30px 20px;
  width: 100%;
`;

export const Title = styled.h2`
  margin-bottom: 21px;
  font-weight: 500;
  font-size: 23px;
  line-height: 33px;
  color: ${(props) => props.theme.color.black};
`;

export const FriendList = styled.ul`
  margin-bottom: 23px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FriendItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  color: ${(props) => props.theme.color.black};

  & > div {
    display: flex;
    align-items: center;
    gap: 13px;
  }
`;
