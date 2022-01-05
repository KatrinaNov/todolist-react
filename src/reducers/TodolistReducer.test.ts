import {v1} from "uuid";
import {
  addTodolistAC,
  changeFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistReducer
} from "./TodolistReducer";
import {FilterType, TodolistsType} from "../App";


test('correct todolist should be removed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let startState: Array<TodolistsType> =[
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]
  const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();
  let newTodolistId = v1();

  let newTodolistTitle = 'New title';

  let startState: Array<TodolistsType> =[
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]
  const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
})
test('correct todolist should change its name', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = 'New title';

  let startState: Array<TodolistsType> =[
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]
  const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId1, newTodolistTitle))

  expect(endState.length).toBe(2);
  expect(endState[0].title).toBe(newTodolistTitle);
  expect(endState[1].title).toBe("What to buy");
})
test('correct filter of todolist should be changed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newFilter: FilterType = 'completed';

  let startState: Array<TodolistsType> =[
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]
  const endState = todolistReducer(startState, changeFilterAC(newFilter, todolistId1))

  expect(endState.length).toBe(2);
  expect(endState[0].filter).toBe(newFilter);
  expect(endState[1].filter).toBe("all");
})

