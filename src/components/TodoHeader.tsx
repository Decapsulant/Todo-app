import styled from 'styled-components';
import React from 'react';
import { HiSun, HiMoon } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleTheme } from '../redux/slices/todoSlice';

const Header = styled.header`
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.h1`
  font-size: 36px;
  font-family: var(--family);
  font-weight: var(--fw-bold);
  text-transform: uppercase;
  letter-spacing: 10px;
  color: #fff;
`;
const ThemeSwitcher = styled.div`
  cursor: pointer;
  display: inline-block;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

export const TodoHeader = () => {
  const theme = useSelector((state: RootState) => state.Todo.theme);
  const dispatch = useDispatch();

  React.useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);
  return (
    <Header>
      <Title>Todo</Title>
      <ThemeSwitcher onClick={() => dispatch(toggleTheme())}>
        {theme === 'light' ? (
          <HiSun color="#fff" fontSize={'28px'} />
        ) : (
          <HiMoon color="#fff" fontSize={'28px'} />
        )}
      </ThemeSwitcher>
    </Header>
  );
};
