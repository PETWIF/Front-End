import styled from 'styled-components';

export const SideContainer = styled.div`
  width: 30%;
  max-height: 100vh;
  background-color: #f3f4f6;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

export const EditSelectContainer = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
`;

export const SelectTitleContainer = styled.div`
  width: 100%;
  height: 20%;
  background: #fff8ec;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  border-radius: 10px 10px 0 0;
`;

export const Category = styled.div`
  width: 50%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isActive ? '#e0e0e0' : '#fff')};
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f0f0f0;
  }

  &:nth-child(2) {
    border-bottom: 1px solid #cbcbcb;
    border-right: 1px solid #cbcbcb;
  }

  &:nth-child(3) {
    border-bottom: 1px solid #cbcbcb;
    border-left: 1px solid #cbcbcb;
  }

  &:nth-child(4) {
    border-top: 1px solid #cbcbcb;
    border-right: 1px solid #cbcbcb;
    border-radius: 0px 0px 0px 10px;
  }

  &:nth-child(5) {
    border-top: 1px solid #cbcbcb;
    border-left: 1px solid #cbcbcb;
    border-radius: 0px 0px 10px 0px;
  }
`;

export const SelectContainer2 = styled.div`
  width: 90%;
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 5px;
  background: #f3f4f6;
`;

export const Category2 = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isActive ? '#fff' : '#F3F4F6')};
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f0f0f0;
  }
  &:active {
    background-color: #e0e0e0;
  }
`;

export const Sticker = styled.div`
  width: 90%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  gap: 10px;
  margin-bottom: 10px;
  flex-shrink: 0;
`;

export const StickerContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  gap: 10%;
  margin-bottom: 20px;
  flex-shrink: 0;
  overflow-y: auto;
`;

export const StickerTitleContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 10px 10px 0 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const Button1 = styled.button`
  width: 100%;
  height: 10%;
  padding: 10px;
  border-radius: 10px;
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? '#FFBA76' : '#F87F28')};
  &:hover {
    background-color: #ffba76;
  }
`;

export const Button2 = styled.button`
  width: 100%;
  height: 10%;
  padding: 10px;
  border-radius: 10px;
  color: #f87f28;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  margin-top: 3%;
  background-color: ${(props) => (props.isActive ? '#FFDCB6' : '#FFF0D4')};
  &:hover {
    background-color: #ffdcb6;
  }
`;

export const ButtonBack = styled.button`
  width: 100%;
  height: 10%;
  padding: 10px;
  border-radius: 10px;
  color: #f87f28;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  margin-top: 3%;
  background-color: ${(props) => (props.isActive ? '#FFDCB6' : '#FFF0D4')};
  &:hover {
    background-color: #ffdcb6;
  }
`;

export const Paragraph = styled.p`
  font-weight: bold;
  font-size: 14px;
`;

export const Paragraph2 = styled.p`
  font-weight: bold;
  font-size: 20px;
`;

export const Emoticon = styled.div`
  flex-basis: calc(33.33% - 10px);
  height: 90px;
  background: #f3f4f6;
  border-radius: 10px;
`;
