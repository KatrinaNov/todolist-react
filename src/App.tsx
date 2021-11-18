import React, {useState} from 'react';
import './App.css';
import Todolist from "./components/Todolist";

export type FilterType = "all" | "active" | "completed"

function App() {
  const title = 'What to learn';
  let [tasks, setTasks] = useState(
    [
      {id: 1, title: 'HTML', isDone: true},
      {id: 2, title: 'CSS', isDone: true},
      {id: 3, title: 'JS', isDone: true},
      {id: 4, title: 'REACT', isDone: false},
    ]
  )
  let [filter, setFilter] = useState<FilterType>("all");
  let tasksForTodoList = tasks;
  if (filter === "active") {
    tasksForTodoList = tasks.filter(task => !task.isDone)
  }
  if (filter === "completed") {
    tasksForTodoList = tasks.filter(task => task.isDone)
  }

  function removeTasks(id: number) {
    setTasks(tasks.filter(t => t.id !== id))
  }

  function changeFilter(value: FilterType) {
    setFilter(value);
  }

  return (
    <div className="App">
      <Todolist title={title} tasks={tasksForTodoList} removeTasks={removeTasks} changeFilter={changeFilter}/>
    </div>
  );
}

export default App;
