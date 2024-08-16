import * as S from './TextInput.style.jsx';

export default function TextInput({ type, value, placeholder }) {
  return <S.InputStyle type={type} value={value} placeholder={placeholder} />;
}
