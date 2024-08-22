import styled from 'styled-components';
import { Layout } from '../Common/';

export const UserInfoLayout = styled(Layout)`
  padding: 30px 20px;
`;

export const UserInfoItem = styled.li`
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
