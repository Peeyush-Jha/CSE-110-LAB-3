import { fireEvent, render, screen } from '@testing-library/react';
import { ToDoList } from './toDoList'; // Assuming ToDoList component is being tested

test('should display all items in the to-do list', () => {
  render(<ToDoList />);
  
  // Assuming there's a dummy list or a way to initialize with test items
  const toDoItems = ['Apples', 'Bananas'];
  toDoItems.forEach(item => {
    expect(screen.getByText(item)).toBeInTheDocument();
  });
});

test('should display correct number of items bought', () => {
    render(<ToDoList />);
    const checkbox1 = screen.getByTestId('todo-checkbox-1');
    const checkbox2 = screen.getByTestId('todo-checkbox-2');
  
    fireEvent.click(checkbox1);
    fireEvent.click(checkbox2);
  
    expect(screen.getByTestId('items-bought-counter').textContent).toBe('Items bought: 2');
  });