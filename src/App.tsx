import React from 'react';
import './App.css';
import Todolist from "./components/Todolist";

function App() {
  const title_1 = 'What to learn';
  const title_2 = 'What to buy';
  const task_1 = [
    {id:1, title: 'HTML', isDone: true},
    {id:2, title: 'CSS', isDone: true},
    {id:3, title: 'JS', isDone: true},
    {id:4, title: 'REACT', isDone: false},
  ]
  const task_2 = [
    {id:5, title: 'Milk', isDone: true},
    {id:6, title: 'Boots', isDone: true},
    {id:7, title: 'Car', isDone: false},
    {id:8, title: 'House', isDone: false}
  ]

    return (
        <div className="App">
            <Todolist title={title_1} tasks={task_1}/>
            <Todolist title={title_2} tasks={task_2}/>
        </div>
    );
}

export default App;
