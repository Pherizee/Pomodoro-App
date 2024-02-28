export interface TodoType {
  id: string;
  task: string;
  completed: boolean;
}

interface TodoPropsType {
  todo: TodoType;
  selectedTodo: TodoType | null;
  setCompleted: (id: string) => void;
  removeTodo: (id: string) => void;
  changeSelectedTodo: (id: string) => void;
}

const Todo = ({
  todo,
  setCompleted,
  selectedTodo,
  changeSelectedTodo,
  removeTodo,
}: TodoPropsType) => {
  return (
    <li className={todo.completed ? "completed" : ""}>
      <label htmlFor={todo.id}>
        <input
          type="checkbox"
          id={todo.id}
          checked={selectedTodo?.id === todo.id}
          onChange={() => changeSelectedTodo(todo.id)}
        />

        {todo.task}
      </label>

      <button
        title="toggle completed"
        onClick={() => {
          setCompleted(todo.id);
        }}
      >
        {todo.completed ? "X" : "✅"}
      </button>
      <button title="remove task" onClick={() => removeTodo(todo.id)}>
        🗑️
      </button>
    </li>
  );
};

export default Todo;
