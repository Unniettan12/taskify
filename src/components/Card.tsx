import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import React, { useState, useRef, useEffect } from "react";

interface Props {
  todo: Todo;
  key: number;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Card: React.FC<Props> = ({ todo, key, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          value={editTodo}
          ref={inputRef}
          onChange={(e) => setEditTodo(e.target.value)}
        />
      ) : todo.isDone ? (
        <s className="Card">{todo.todo}</s>
      ) : (
        <span className="Card">{todo.todo}</span>
      )}

      <span
        className="icon"
        onClick={() => {
          if (!edit && !todo.isDone) {
            setEdit(!edit);
          }
        }}
      >
        <AiFillEdit />
      </span>
      <span className="icon" onClick={() => handleDelete(todo.id)}>
        <AiFillDelete />
      </span>
      <span className="icon" onClick={() => handleDone(todo.id)}>
        <MdDone />
      </span>
    </form>
  );
};

export default Card;
