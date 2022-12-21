export interface TaskProps {
  id: string,
  title: string,
  status: boolean,
}

export interface TaskApi {
  title: string,
  status: boolean,
}

export interface TasksApiList {
  [id: string]: TaskApi;
}