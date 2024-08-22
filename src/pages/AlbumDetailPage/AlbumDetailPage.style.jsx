import styled from 'styled-components';

import { Layout } from '../../components/Common';
import { Icon } from '../../components/Icon';

export const MainLayout = styled.div`
  padding: 0 30px;
  display: flex;
  gap: 30px;
`;

export const MainContainer = styled(Layout)`
  flex: 1;
  padding: 33px 0 16px 33px;
  overflow: hidden;
`;

export const MenuList = styled.div`
  margin: 20px 0 50px 15px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const BackButton = styled.div`
  padding: 0 33px 20px 0;
  display: flex;
  justify-content: space-between;
`;

export const ActoinButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  & > button {
    padding: 6px 16px;
    border-radius: 5px;
    border: 1px solid #f87f28;
    background-color: transparent;
    color: #f87f28;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #f87f28;
      color: white;
    }
  }
`;

export const StyledIcon = styled(Icon)`
  cursor: pointer;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;

  & > span {
    font-weight: 500;
    font-size: 20px;
    line-height: 29px;
  }
`;

export const AlbumBox = styled.div`
  margin-top: 120px;
`;

export const DropDownBox = styled.div`
  margin: 9px 7px;
`;

export const AlbumList = styled.ul`
  display: flex;
  gap: 6px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export const AlbumAmount = styled.div`
  padding-right: 33px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > span:first-child {
    font-family: 'Petit Formal Script';

    font-weight: 400;
    font-size: 108px;
    line-height: 135px;
  }

  & > span:last-child {
    font-family: 'Petrona';

    font-weight: 400;
    font-size: 65px;
    line-height: 73px;
  }
`;

export const SideContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
