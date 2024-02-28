import { useState } from "react";
import Todo, { TodoType } from "./Todo";
import AddTodo from "./AddTodo";

interface TodoListProps {
  selectedTodo: TodoType | null;
  setSelectedTodo: (todo: TodoType | null) => void;
}

const TodoList = ({ selectedTodo, setSelectedTodo }: TodoListProps) => {
  const [todoList, setTodoList] = useState<TodoType[]>([]);

  const addNewTodo = (todo: string): void => {
    const todoObj: TodoType = {
      id: todoList.length.toString(),
      task: todo,
      completed: false,
    };

    setTodoList((prevTodos) => [...prevTodos, todoObj]);
  };

  const setCompleted = (id: string) => {
    const newTodos = todoList.map((todo) => {
      if (todo.id !== id) return todo;

      todo.completed = !todo.completed;
      setSelectedTodo(null);
      return todo;
    });
    setTodoList(newTodos);
  };

  const changeSelectedTodo = (id: string) => {
    const todo = todoList.filter((todo) => todo.id === id);
    setSelectedTodo(todo[0]);
  };

  const removeTodo = (id: string) => {
    const todos = todoList.filter((todo) => todo.id !== id);
    setTodoList(todos);
  };

  return (
    <div>
      <h2>Todo List</h2>

      <AddTodo addNewTodo={addNewTodo} />

      <ul className="todo-tasks">
        {todoList.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            setCompleted={setCompleted}
            selectedTodo={selectedTodo}
            removeTodo={removeTodo}
            changeSelectedTodo={changeSelectedTodo}
          />
        ))}
      </ul>

      {!!todoList.length && <p>Please select a todo to proceed</p>}
    </div>
  );
};

export default TodoList;
