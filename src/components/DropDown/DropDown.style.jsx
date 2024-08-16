import styled from 'styled-components';

export const DropdownContianer = styled.div`
  width: 120px;
`;

export const Select = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 10px;
  border: 1px solid ${(props) => props.theme.color.gray2};
  outline: none;
  border-radius: 5px;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15));
  cursor: pointer;

  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  letter-spacing: -0.005em;
  color: ${(props) => props.theme.color.gray1};
`;

export const OptionList = styled.ul`
  width: 100%;
  margin-top: 10px;
  display: ${(props) => (props.$show ? 'block' : 'none')};
  background-color: ${(props) => props.theme.color.white};
  border-radius: 5px;
  position: absolute;
  top: 100%;
  left: 0;
  filter: drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.15));

  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  letter-spacing: -0.005em;
`;

export const OptionItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid ${(props) => props.theme.color.gray3};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.gray5};
  }

  &:first-child {
    border-radius: 5px 5px 0 0;
  }

  &:last-child {
    border: none;
    border-radius: 0 0 5px 5px;
  }
`;
