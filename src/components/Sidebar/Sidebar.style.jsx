import styled from 'styled-components';

import { Flex } from '../Common';

export const SidebarWrapper = styled.aside`
  width: 333px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background: ${(props) => props.theme.color.gray5};
  filter: drop-shadow(3px 3px 9px rgba(0, 0, 0, 0.1));
`;

export const SidebarContainer = styled(Flex)`
  height: 100%;

  & > ul {
    width: 100%;
  }
`;

export const MenuItem = styled.li`
  height: 67px;
  padding: 8px;
  margin: 15px 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
  background: ${(props) =>
    props.$selected ? 'rgba(216, 214, 213, 0.5)' : 'transparent'};
  box-sizing: border-box;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;

  &:hover {
    background: rgba(216, 214, 213, 0.5);
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  padding: 20px;
`;
