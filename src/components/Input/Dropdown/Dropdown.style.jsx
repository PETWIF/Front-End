import styled from 'styled-components';

export const Select = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: ${(props) => props.theme.color.gray5};
  position: relative;
  cursor: pointer;

  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  color: ${(props) => props.theme.color.gray1};
`;

export const Text = styled.span`
  color: ${(props) => (props.$placeholder ? '#999999' : 'black')};
`;

export const OptionList = styled.ul`
  width: 100%;
  margin-top: 10px;
  display: ${(props) => (props.$show ? 'block' : 'none')};
  background: ${(props) => props.theme.color.gray5};
  border-radius: 10px;
  position: absolute;
  top: 100%;
  left: 0;
`;

export const OptionItem = styled.li`
  margin: 5px;
  padding: 8px 10px;
  border-radius: 10px;

  cursor: pointer;

  &:hover {
    background-color: #e6e6e6;
  }
`;
