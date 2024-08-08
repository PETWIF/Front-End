import styled from 'styled-components';

export const ModalLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: #fff;
  width: 60%;
  height: 70%;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  justify-content: center;
`;

export const AlbumContainer = styled.div`
  width: 35%;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const AlbumHeader = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
`;

export const AlbumCover = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
  background: #e0e0e0;
`;

export const Albumcontexts = styled.div`
  width: 65%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
`;

export const RadioGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px 0;
  gap: 20px;

  label {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

export const ModalFooter = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const Button = styled.button`
  width: 20%;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #f87f28;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #ffba76;
  }
`;

export const CancelButton = styled(Button)`
  background-color: #e0e0e0;

  &:hover {
    background-color: #c0c0c0;
  }
`;

export const B = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
