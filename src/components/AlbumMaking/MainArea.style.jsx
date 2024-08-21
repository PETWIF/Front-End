import styled from 'styled-components';
import { ResizableBox } from 'react-resizable';
import { createGlobalStyle } from 'styled-components';

export const MainContainer = styled.main`
  flex: 1;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 10px;
`;

export const Paragraph1 = styled.p`
  color: '#000';
  font-weight: bold;
  font-size: 28px;
`;

export const Paragraph2 = styled.p`
  color: '#000';
  font-weight: bold;
  font-size: 16px;
`;

export const Button = styled.button`
  width: 30%;
  height: 10%;
  padding: 10px;
  border: 1px solid #f87f28;
  border-radius: 10px;
  color: '#f87f28';
  font-size: 20px;
  cursor: pointer;
  background-color: #fff0d4;
  &:hover {
    background-color: #ffdcb6;
  }
`;

export const MainTitleContainer = styled.div`
  width: 100%;
  height: 20%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-itmes: center;
  border-radius: 10px;
  background-color: #fff;
`;

export const MainContnetContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  gap: 10%;
  background-color: #fff;
  overflow-y: auto;
  position: relative;
`;

export const ToolbarContainer = styled.div`
  width: 100%;
  height: 50%;
  padding: 10px;
  display: flex;
  align-items: center;
  background-color: #191919;
  border-radius: 5px 5px 0 0;
`;

export const ToolbarItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 100%;
  padding: 15px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 3px;
  border-right: 2px solid #363636;
  background-color: ${({ $active }) => ($active ? '#555' : 'transparent')};

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: #444;
  }

  &:active {
    background-color: #555;
  }

  &:nth-child(4) {
    border-right: none;
  }
  &:nth-child(5) {
    border-right: none;
  }
  &:nth-child(7) {
    border-right: none;
  }
  &:nth-child(8) {
    border-right: none;
  }
`;

export const InputField = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  border: 1px solid #191919;
  border-radius: 0 0 0 5px;
  font-size: 20px;
`;

export const StyledSelect = styled.select`
  cursor: pointer;
  background-color: #191919;
  color: #fff;
  font-size: 16px;
  border: none;
`;

export const StyledOption = styled.option`
  background-color: #333;
  color: #fff;
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
`;

export const ResizableBoxContainer = styled(ResizableBox)`
  position: absolute;
  padding: 10px;
  border: ${({ selected }) => (selected ? '2px solid grey' : 'none')};

  .react-resizable-handle {
    display: ${({ selected }) => (selected ? 'block' : 'none')};
    background-color: transparent;
  }

  .react-resizable-handle-n {
    cursor: n-resize;
  }

  .react-resizable-handle-s {
    cursor: s-resize;
  }

  .react-resizable-handle-e {
    cursor: e-resize;
  }

  .react-resizable-handle-w {
    cursor: w-resize;
  }

  .react-resizable-handle-ne {
    cursor: ne-resize;
  }

  .react-resizable-handle-nw {
    cursor: nw-resize;
  }

  .react-resizable-handle-se {
    cursor: se-resize;
  }

  .react-resizable-handle-sw {
    cursor: sw-resize;
  }
`;

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'MyCustomFont1';
    src: url('src/components/AlbumMaking/font/CK_tc04170000414.ttf') format('truetype');
  }
  
  @font-face {
    font-family: 'MyCustomFont2';
    src: url('src/components/AlbumMaking/font/CK_tc04170000069.ttf') format('truetype');
  }

  @font-face {
    font-family: 'MyCustomFont3';
    src: url('src/components/AlbumMaking/font/CK_tc04170000070.ttf') format('truetype');
  }
  
  @font-face {
    font-family: 'MyCustomFont4';
    src: url('src/components/AlbumMaking/font/CK_tc04170000180.ttf') format('truetype');
  }
  
  @font-face {
    font-family: 'MyCustomFont5';
    src: url('src/components/AlbumMaking/font/CK_tc04170000267.ttf') format('truetype');
  }

  @font-face {
    font-family: 'MyCustomFont6';
    src: url('src/components/AlbumMaking/font/CK_tc04170000269.ttf') format('truetype');
  }

  @font-face {
    font-family: 'MyCustomFont7';
    src: url('src/components/AlbumMaking/font/CK_tc04170000271.ttf') format('truetype');
  }
  
  @font-face {
    font-family: 'MyCustomFont8';
    src: url('src/components/AlbumMaking/font/CK_tc04170000272.ttf') format('truetype');
  }

  @font-face {
    font-family: 'MyCustomFont10';
    src: url('src/components/AlbumMaking/font/CK_tc04170000279.ttf') format('truetype');
  }
  
  @font-face {
    font-family: 'MyCustomFont11';
    src: url('src/components/AlbumMaking/font/CK_tc04170000281.ttf') format('truetype');
  }

  @font-face {
    font-family: 'MyCustomFont12';
    src: url('src/components/AlbumMaking/font/CK_tc04170000282.ttf') format('truetype');
  }

  @font-face {
    font-family: 'MyCustomFont13';
    src: url('src/components/AlbumMaking/font/CK_tc04170000283.ttf') format('truetype');
  }
  
  @font-face {
    font-family: 'MyCustomFont14';
    src: url('src/components/AlbumMaking/font/CK_tc04170000286.ttf') format('truetype');
  }

  @font-face {
    font-family: 'MyCustomFont15';
    src: url('src/components/AlbumMaking/font/CK_tc04170000288.ttf') format('truetype');
  }
`;
