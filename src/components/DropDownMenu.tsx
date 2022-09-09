import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';

interface DropDownListProps {
  value: string;
  list: string[];
  onClick:(target: Element) => void;
}

const DropDownList = ({ onClick, list, value }: DropDownListProps) => {
  const onClickHandler = useCallback((e: Event) => {
    const target = e.target as Element;
    onClick(target);
  }, [onClick]);

  useEffect(() => {
    document.addEventListener('mouseup', onClickHandler);
    return () => {
      document.removeEventListener('mouseup', onClickHandler);
    }
  }, [onClickHandler]);

  const DropDownListItem = (item: string) => {
    if(item === value) return null;
    return <DropDownItem key={item}>{item}</DropDownItem>
  }
  const renderListItem = list.map(DropDownListItem);
  return (
    <DropDownMenuWrapper>
      { renderListItem }
    </DropDownMenuWrapper>
  );
}

export default DropDownList;

const DropDownItem = styled.li`
  font-size: 14px;
  color: #333;
  padding: 12px 8px;
  cursor: pointer;
  border: 1px solid #DDD;
  background-color: #FFF;
  :hover {
    background-color: #EEE;
  }
`;

const DropDownMenuWrapper = styled.ul`
  position: absolute;
  top: 42px;
  left: 0;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;