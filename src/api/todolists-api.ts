import axios, {AxiosResponse} from "axios";

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  headers: {
    'API-KEY': '860b2199-293d-4424-9b31-caa190db03c4'
  },
  withCredentials :true
})

type Created = BaseResponseType<{ item: TodoType }>;
type CreatedTask = BaseResponseType<{ item: TaskType }>;

export const todolistApi = {
  getTodos() {
    return instance.get<Array<TodoType>>('todo-lists')
  },

  createTodo(title: string) {
    return instance.post<Created, AxiosResponse<Created>, { title: string }>('todo-lists', {title})
  },

  deleteTodo(todolistId: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
  },
  updateTodoTitle(todolistId: string, title: string) {
    return instance.put<BaseResponseType, AxiosResponse<BaseResponseType>, { title: string }>(`todo-lists/${todolistId}`, {title})
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<CreatedTask, AxiosResponse<CreatedTask>, { title: string }>(`todo-lists/${todolistId}/tasks`, {title})
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<UpdateTaskModelType, AxiosResponse<BaseResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  }
}

export type TodoType = {
  addedDate: string
  id: string
  title: string
  order: number
}
type BaseResponseType<T = {}> = {
  fieldsErrors: string[]
  messages: string[]
  resultCode: number
  data: T
}
type GetTasksResponseType = {
  items: Array<TaskType>
  error: null | string
  totalCount: number
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4
}

export type TaskType = {
  description: string | null
  title: string
  // completed: boolean
  status: number
  priority: number
  startDate: Date
  deadline: Date | null
  id: string
  todoListId: string
  order: number
  addedDate: Date
}
export type UpdateTaskModelType = {
  title: string
  description: string | null
  status: TaskStatuses
  priority: TaskPriorities
  startDate: Date
  deadline: Date | null
}