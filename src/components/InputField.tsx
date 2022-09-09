import React, { useState } from 'react';
import styled from 'styled-components';

type InputType = 'number' | 'letter';

interface InputFieldProps {
  margin?:boolean;
  id: string;
  type: InputType;
  value: string;
  placeholder: string;
  onChange:(value: {[key: string]: string}) => void;
}

const validateInputType = (type: InputType, value: string) => {
  const splitValue = value.split('');
  const lastKey = splitValue[splitValue.length - 1];
  if(type === 'number') return lastKey.match(/[0-9]/);
  if(type === 'letter') return lastKey.match(/[a-z A-Z]/); 
}

const InputField = ({ id, onChange, value, type, placeholder, margin }: InputFieldProps) => {
  const [inputError, setInputError] = useState<string>();
  const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if(value.length > 0 && validateInputType(type, value)) {
      onChange({
        [id]: value
      });
      setInputError('');
    } else if (value.length === 0) {
      onChange({
        [id]: value
      });
    } else {
      setInputError(`Please enter a ${type}`);
    }
  }

  return (
    <InputContainer margin={margin}>
      {inputError && <Error>{inputError}</Error>}
      <Input onChange={onChangeHandler} value={ value } placeholder={ placeholder }/>
    </InputContainer>
  );
}

export default InputField;

const InputContainer = styled.div<{margin?:boolean}>`
  position: relative;
  display: flex;
  width: 100%;
  ${({ margin }) => margin && `
    margin-bottom: 34px;
  `}
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 8px;
  border: 1px solid #DDD;
  ::placeholder{
    font-size: 14px;
    color: #333;
  }
`;

const Error = styled.span`
  position: absolute;
  top: -22px;
`;