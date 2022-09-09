import { useRef, useState } from 'react';
import styled from 'styled-components';
import DropDownMenu from './DropDownMenu';

interface DropDownListProps {
  margin?:boolean;
  defaultValue: string;
  id: string;
  value: string;
  list: string[];
  onClick:(value: {[key: string]: string}) => void;
}

const DropDownList = ({ id, list, value, defaultValue, margin, onClick }: DropDownListProps) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const onClickHandler = (target: Element) => {
    if(ref.current !== target) {
      const selectedItem = list.find((item) => item === target.textContent);
      if(selectedItem) {
        onClick({
          [id]: selectedItem
        });
      }
      onToggle();
    }
  }
  const onToggle = () => {
    setIsOpen(!isOpen);
  }

  const header = value.length > 0 ? value : defaultValue;
  
  return (
    <DropDownContainer isOpen={isOpen} margin={margin}>
      <DropDownHeader isOpen={isOpen} ref={ref} onClick={onToggle}>
        {header}
      </DropDownHeader>
      { isOpen && <DropDownMenu value={value} list={list} onClick={onClickHandler} />}
    </DropDownContainer>
  );
}

export default DropDownList;

const DropDownHeader = styled.div<{isOpen: boolean}>`
  width: 100%;
  font-size: 14px;
  padding: 12px 8px;
  color: #333;
  cursor: pointer;
  border: 1px solid #DDD;
  ${({ isOpen }) => isOpen && `
    background-color: #497952;
    color: white;
    border: 1px solid #1d482a;
  `}
`;

const DropDownContainer = styled.div<{isOpen: boolean; margin?:boolean}>`
  display: flex;
  width: 100%;
  position: relative;
  ${({ isOpen }) => isOpen && `
    z-index: 99;
  `}
  ${({ margin }) => margin && `
    margin-bottom: 34px;
  `}
`;
