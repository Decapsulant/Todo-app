import React from 'react';
import { Container } from './Container';
import { TodoHeader } from './TodoHeader';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';
const Todo = () => {
  return (
    <div>
      <Container>
        <TodoHeader />
        <TodoInput />
        <TodoList />
      </Container>
    </div>
  );
};
export default Todo;
