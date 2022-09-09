import styled from 'styled-components';

interface InputFieldProps {
  active: boolean;
  margin?:boolean;
  text: string;
  onClick:() => void;
}

const FormButton = ({ onClick, margin, text, active}: InputFieldProps) => {
  return (
    <InputContainer margin={margin}>
      <Button {...(active && {onClick: onClick})} active={active}>
        {text}
      </Button>
    </InputContainer>
  );
}

export default FormButton;

const InputContainer = styled.div<{margin?:boolean}>`
  position: relative;
  display: flex;
  width: 100%;
  ${({ margin }) => margin && `
    margin-bottom: 34px;
  `}
`;

const Button = styled.button<{active: boolean}>`
  width: 100%;
  padding: 12px 8px;
  border: 1px solid #DDD;
  background-color: #EEE;
  color:#CCC;
  ::placeholder{
    font-size: 14px;
    color: #333;
  }
  ${({ active }) => active && `
    background-color: #497952;
    color: white;
    border: 1px solid #1d482a;
  `}
`;
