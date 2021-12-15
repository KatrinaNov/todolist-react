import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./components/Todolist";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";

export type FilterType = "all" | "active" | "completed"
export type TodolistsType = {
  id: string
  title: string
  filter: FilterType
}
type TasksType = {
  [key: string]: Array<TaskType>
}

function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ])

  let [tasks, setTasks] = useState<TasksType>({
    [todolistID1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID2]: [
      {id: v1(), title: "HTML&CSS2", isDone: true},
      {id: v1(), title: "JS2", isDone: true},
      {id: v1(), title: "ReactJS2", isDone: false},
      {id: v1(), title: "Rest API2", isDone: false},
      {id: v1(), title: "GraphQL2", isDone: false},
    ]
  })
  function removeTodolist(todolistId: string) {
    setTodolists(todolists.filter(f => f.id !== todolistId))
    delete tasks[todolistId]
    setTasks({...tasks})
    // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(f=>f.id !==id)})
    // let filteredTasks = tasks.filter(t => t.id != id);
    // setTasks(filteredTasks);
  }
  function addTask(todolistId: string, taskTitle: string) {
    let newTask = {id: v1(), title: taskTitle, isDone: false}
    setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    // setTasks([newTask, ...tasks])
  }

  function changeFilter(todolistId: string, value: FilterType) {
    setTodolists(todolists.map(m => m.id === todolistId ? {...m, filter: value} : m))
    // setFilter(value);
  }

  function removeTask(todolistId: string, id: string) {
    setTasks({...tasks, [todolistId]: tasks[todolistId].filter(f => f.id !== id)})
    // setTasks(tasks.filter(t => t.id !== id))
  }

  function changeTaskStatus(todolistId: string, taskId: string, isDone: boolean) {
    setTasks({...tasks, [todolistId] : tasks[todolistId].map(m=> m.id === taskId ? {...m, isDone} : m)})
    // setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t))
  }

  function addTodolist(title: string) {
    let newId = v1();
    setTodolists([{id: newId, title: title, filter: 'all'}, ...todolists])
    setTasks({...tasks, [newId]: []})
  }


  return (
    <div className="App">
      <AddItemForm addItemCallback={addTodolist}/>
      {todolists.map(m => {
        let tasksForTodoList = tasks[m.id];
        if (m.filter === "active") {
          tasksForTodoList = tasks[m.id].filter(task => !task.isDone)
        }
        if (m.filter === "completed") {
          tasksForTodoList = tasks[m.id].filter(task => task.isDone)
        }

        return (
          <Todolist
            key={m.id}
            todolistId={m.id}
            title={m.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            filter={m.filter}
            changeTaskStatus={changeTaskStatus}
            removeTodolist={removeTodolist}
          />
        )

      })}

    </div>
  );
}

export default App;
