import styled from 'styled-components';

export const Select = styled.div`
  width: ${(props) => props.$width ?? 'auto'};
  padding: 16px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border: none;
  border-radius: 10px;
  background: ${(props) => props.theme.color.gray5};
  position: relative;
  cursor: pointer;

  font-weight: 400;
  font-size: 14px;
  color: ${(props) => props.theme.color.gray1};
`;

export const Text = styled.span`
  color: ${(props) => (props.$placeholder ? '#999999' : 'black')};
`;

export const OptionList = styled.ul`
  width: 100%;
  max-height: 170px;
  margin-top: 10px;
  display: ${(props) => (props.$show ? 'block' : 'none')};
  background: ${(props) => props.theme.color.gray5};
  border-radius: 10px;
  position: absolute;
  top: 100%;
  left: 0;
  filter: drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.15));
  overflow-y: auto;
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
