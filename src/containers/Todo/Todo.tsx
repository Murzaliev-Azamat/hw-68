import React, {useEffect, useState} from 'react';
import Task from "../../components/Task/Task";
import {useDispatch, useSelector} from "react-redux";
import {addTask, deleteTask, fetchTasks} from "./TodoSlice";
import {AppDispatch, RootState} from "../../app/store";
import Spinner from "../../components/Spinner/Spinner";


const Todo = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.todo.tasks);
  const loading = useSelector((state: RootState) => state.todo.loading);
  const [taskTitle, setTaskTitle] = useState<string>('');

  const onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTaskTitle(value)
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addTask(taskTitle));
    await dispatch(fetchTasks());
    setTaskTitle('');
  }

  const removeTask = async (id: string) => {
    await dispatch(deleteTask(id));
    await dispatch(fetchTasks());
  }

  return (
    <div>
      <form onSubmit={onFormSubmit} className="input-group mt-2">
      <input onChange={onTextFieldChange} value={taskTitle} type="text" className="form-control" placeholder="Введите заголовок"/>
      <button className="btn btn-primary">Add task</button>
      </form>
      {loading ? <Spinner/> : tasks.map((task) => (
        <Task id={task.id} key={task.id} title={task.title} status={task.status} onDelete={removeTask}/>
      ))}
    </div>
  );
};

export default Todo;