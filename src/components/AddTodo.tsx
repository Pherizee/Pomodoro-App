import { ChangeEvent, FormEvent, useState } from "react";

interface AddTodoProps {
  addNewTodo: (todo: string) => void;
}

const AddTodo = ({ addNewTodo }: AddTodoProps) => {
  const [todo, setTodo] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    addNewTodo(todo);
    setTodo("");
  };

  const handleChange = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    setTodo(input.value);
  };

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <label htmlFor="addTodo">Add a new task</label>
      <input type="text" id="addTodo" value={todo} onChange={handleChange} />

      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;
