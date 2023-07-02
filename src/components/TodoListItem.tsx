import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { HiX, HiCheck } from 'react-icons/hi';
import { completedTask, deleteTask, setFilteredTasks } from '../redux/slices/todoSlice';
import { useDispatch } from 'react-redux';

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOutAnimation = keyframes`
    from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const fadeCompleteAnimation = keyframes`
    from {
      opacity: 1;
  }
  to {
    opacity: 0.5;
  }
`;

const Wrapper = styled.div<{ isDeleting: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 15px 15px 20px;
  border-bottom: 1px solid var(--colors-text);
  animation: ${fadeInAnimation} 0.5s ease-in-out;

  ${(props) =>
    props.isDeleting &&
    css`
      animation: ${fadeOutAnimation} 0.5s ease-in-out;
    `}
`;
const DeleteButton = styled(HiX)`
  font-size: 20px;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.2s linear;

  &:hover {
    opacity: 1;
  }
`;
const Content = styled.div`
  display: flex;
  gap: 25px;
`;

const StyledDiv = styled.div<{ isActive: boolean }>`
  position: relative;
  cursor: pointer;
  width: 17px;
  height: 17px;
  border: 1px solid var(--colors-text);
  border-radius: 50%;
  transition: all 0.2s linear;
  background-image: ${(props) =>
    !props.isActive ? 'linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))' : ''};
  opacity: ${(props) => (!props.isActive ? '1' : '0.5')};
  &:hover {
    opacity: 1;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const IconBefore = styled.div<{ isActive: boolean }>`
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.isActive ? 'block' : 'none')};
`;

const Title = styled.span<{ isActive: boolean }>`
  font-size: var(--fs);
  text-decoration: ${(props) => (props.isActive ? 'none' : 'line-through')};
  opacity: ${(props) => (props.isActive ? '1' : '0.5')};

  ${(props) =>
    !props.isActive &&
    css`
      animation: ${fadeCompleteAnimation} 0.5s ease-in-out;
    `}
`;

interface TodoListItemProps {
  title: string;
  isActive: boolean;
  id: string;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({ id, title, isActive }) => {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const dispatch = useDispatch();

  const onClickComplete = () => {
    dispatch(completedTask(id));
    dispatch(setFilteredTasks());
  };

  const onClickDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      dispatch(deleteTask(id));
    }, 500);
  };
  return (
    <Wrapper isDeleting={isDeleting}>
      <Content>
        <StyledDiv isActive={isActive} onClick={onClickComplete}>
          <IconWrapper>
            <IconBefore isActive={isActive} />
            {!isActive && <HiCheck size={10} color="#fff" />}
          </IconWrapper>
        </StyledDiv>
        <Title isActive={isActive}>{title}</Title>
      </Content>

      <DeleteButton onClick={onClickDelete} />
    </Wrapper>
  );
};
