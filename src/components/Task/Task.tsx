import React from 'react';
import {isDoneTask} from "../../containers/Todo/TodoSlice";
import {AppDispatch} from "../../app/store";
import {useDispatch} from "react-redux";

interface Props {
  title: string;
  status: boolean;
  id: string;
  onDelete: (id: string) => void;
}

const Task: React.FC<Props> = ({title, status,id,onDelete}) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="border border-1 p-3 mt-2 d-flex align-items-center justify-content-between">
      <p>{title}</p>
      <div>
      <input type="checkbox" onChange={() => dispatch(isDoneTask(id))}/>
      <button className="btn btn-danger ms-3" onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
};

export default Task;