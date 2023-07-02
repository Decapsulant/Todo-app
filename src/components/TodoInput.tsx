import styled from 'styled-components';
import React from 'react';
import { addTask, setTitle } from '../redux/slices/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
const Input = styled.input`
  border: none;
  box-sizing: border-box;
  color: var(--color-text);
  border-radius: var(--radius);
  padding: 17px 20px 17px 60px;
  outline: none;
  background-color: var(--colors-ui-base);
  width: 100%;
  box-shadow: var(--shadow);
  margin-bottom: 20px;

  &::placeholder {
    color: var(--colors-text);
    opacity: 0.6;
  }
`;
const Label = styled.label`
  background-color: var(--colors-ui-base);
  max-width: 100%;
  position: relative;

  &::after {
    left: 20px;
    top: -2px;
    position: absolute;
    content: '';
    width: 17px;
    display: block;
    opacity: 0.3;
    height: 17px;
    border: 1px solid var(--colors-text);
    border-radius: 50%;
  }
`;

interface TodoInputProps {}

export const TodoInput: React.FC<TodoInputProps> = () => {
  const title = useSelector((state: RootState) => state.Todo.inputValue);
  const dispatch = useDispatch();
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value));
  };
  const addTaskHandler = () => {
    dispatch(addTask(title));
    dispatch(setTitle(''));
  };
  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13 && title.trim().length > 0) {
      addTaskHandler();
    }
  };
  return (
    <Label>
      <Input
        onKeyPress={onKeyPressHandler}
        onChange={inputHandler}
        value={title}
        type="text"
        placeholder="Create a new todo..."
      />
    </Label>
  );
};
