import styled from 'styled-components';
import { ResizableBox } from 'react-resizable';

export const MainContainer = styled.main`
  flex: 1;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #FFF;
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
  background-color: #FFF0D4;
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
  background-color: #FFF;
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
  background-color: #FFF;
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
  height: 50%;
  padding: 0 10px;
  border: 1px solid #191919;
  border-radius: 0 0 5px 5px;
  font-size: 16px;
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