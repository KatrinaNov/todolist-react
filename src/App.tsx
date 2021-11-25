import React, {useState} from 'react';
import './App.css';
import Todolist, {TasksType} from "./components/Todolist";
import {v1} from "uuid";

export type FilterType = "all" | "active" | "completed"

function App() {
  const title = 'What to learn';
  const initialState = [
    {id: v1(), title: 'HTML', isDone: true},
    {id: v1(), title: 'CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'REACT', isDone: false},
  ]
  let [tasks, setTasks] = useState<Array<TasksType>>(initialState)
  let [filter, setFilter] = useState<FilterType>("all");
  let tasksForTodoList = tasks;
  if (filter === "active") {
    tasksForTodoList = tasks.filter(task => !task.isDone)
  }
  if (filter === "completed") {
    tasksForTodoList = tasks.filter(task => task.isDone)
  }
  function addTask(taskTitle: string) {
    let newTask = {id: v1(), title: taskTitle, isDone: false}
    setTasks([newTask, ...tasks])
  }
  function changeFilter(value: FilterType) {
    setFilter(value);
  }
  function removeTasks(id: string) {
    setTasks(tasks.filter(t => t.id !== id))
  }


  return (
    <div className="App">
      <Todolist
        title={title}
        tasks={tasksForTodoList}
        removeTasks={removeTasks}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
