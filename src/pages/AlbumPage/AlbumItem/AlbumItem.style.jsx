import styled from 'styled-components';

import { AlbumButton } from '../index.js';

export const AlbumHover = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
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

export const ButtonContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const AlbumItem = styled.li`
  flex-shrink: 0;
  width: 232px;
  height: 300px;
  position: relative;

  &:hover ${AlbumHover} {
    display: flex;
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
