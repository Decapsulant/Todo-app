import React from 'react';
import styled from 'styled-components';
import { TodoListItem } from './TodoListItem';
import { clearCompleted, setFilter, setFilteredTasks } from '../redux/slices/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export enum FilterValue {
  completed = 'completed',
  all = 'all',
  active = 'active',
  clearCompleted = 'clearComplited',
}
const Wrapper = styled.div`
  width: 100%;
  background-color: var(--colors-ui-base);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
`;
const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    gap: 15px;
    align-items: center;
  }
`;
const FilterButton = styled.button<{ isActive?: boolean }>`
  border: none;
  cursor: pointer;
  background-color: inherit;
  transition: all 0.2s linear;
  color: ${(props) => (props.isActive ? 'red' : 'hsl(234, 39%, 85%)')};
  font-weight: 700;
  font-size: 14px;
  font-family: var(--family);
  opacity: 0.7;
  width: 100%;

  &:hover {
    color: var(--colors-text);
    opacity: 1;
  }
`;
const FilterButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;
const FilterCount = styled.span`
  font-size: 14px;
  opacity: 0.7;
  color: var(--colors-text);
`;

const NoTasks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  padding: 15px 0;
  border-bottom: 1px solid var(--colors-text);
`;

const ListBody = styled.div`
  min-height: 300px;
`;

export const TodoList = () => {
  const { filteredTasks, filter } = useSelector((state: RootState) => state.Todo);
  const dispatch = useDispatch();
  const leftTask = filteredTasks.length > 1 ? 'items' : 'item';

  const onClickFilterList = (filter: 'all' | 'active' | 'completed') => {
    dispatch(setFilter(filter));
    dispatch(setFilteredTasks());
  };

  return (
    <Wrapper>
      <ListBody>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((t) => (
            <TodoListItem key={t.id} id={t.id} title={t.title} isActive={t.isActive} />
          ))
        ) : (
          <NoTasks>List is empty</NoTasks>
        )}
      </ListBody>

      {/*filrer*/}
      <FilterWrapper>
        <FilterCount>
          <span>
            {filteredTasks.length} {leftTask} left
          </span>
        </FilterCount>
        <FilterButtonWrapper>
          <FilterButton isActive={filter === 'all'} onClick={() => onClickFilterList('all')}>
            All
          </FilterButton>
          <FilterButton isActive={filter === 'active'} onClick={() => onClickFilterList('active')}>
            Active
          </FilterButton>
          <FilterButton
            isActive={filter === 'completed'}
            onClick={() => onClickFilterList('completed')}>
            Completed
          </FilterButton>
        </FilterButtonWrapper>
        <div>
          <FilterButton onClick={() => dispatch(clearCompleted())}>Clear Completed</FilterButton>
        </div>
      </FilterWrapper>
    </Wrapper>
  );
};
