import {v1} from "uuid";
import {TasksStateType} from "../App";
import {
  addEmptyArrayOfTaskAC,
  addTaskAC,
  changeStatusAC,
  changeTaskTitleAC,
  removeAllTaskAC,
  removeTaskAC,
  TasksReducer
} from "./TasksReducer";

test('correct task should be removed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let startState: TasksStateType ={
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "React Book", isDone: true}
    ]
  }
  const endState = TasksReducer(startState, removeTaskAC(startState[todolistId1][0].id, todolistId1))

  expect(endState[todolistId1].length).toBe(1);
  expect(endState[todolistId2].length).toBe(2);
  expect(endState[todolistId1][0].title).toBe("JS")
})
test('correct all tasks of todolist should be removed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let startState: TasksStateType ={
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "React Book", isDone: true}
    ]
  }
  const endState = TasksReducer(startState, removeAllTaskAC(todolistId1))

  expect(endState[todolistId1]).toBeUndefined();
  expect(endState[todolistId2].length).toBe(2);
})
test('correct task should be added', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTaskTitle = 'New task';

  let startState: TasksStateType ={
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "React Book", isDone: true}
    ]
  }
  const endState = TasksReducer(startState, addTaskAC(newTaskTitle, todolistId1))

  expect(endState[todolistId1].length).toBe(3);
  expect(endState[todolistId1][0].title).toBe(newTaskTitle);
})
test('correct empty array of tasks should be added', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistId = v1();

  let startState: TasksStateType ={
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "React Book", isDone: true}
    ]
  }
  const endState = TasksReducer(startState, addEmptyArrayOfTaskAC(newTodolistId))

  expect(endState[newTodolistId]).toBeDefined()
  expect(endState[newTodolistId].length).toBe(0)
})
test('correct task should change its name', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTaskTitle = 'New task';

  let startState: TasksStateType ={
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "React Book", isDone: true}
    ]
  }
  const endState = TasksReducer(startState, changeTaskTitleAC(startState[todolistId1][0].id, newTaskTitle, todolistId1))

  expect(endState[todolistId1].length).toBe(2);
  expect(endState[todolistId1][0].title).toBe(newTaskTitle);
  expect(endState[todolistId1][1].title).toBe("JS");
})
test('correct status of task should be changed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newStatus = false;

  let startState: TasksStateType ={
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "React Book", isDone: true}
    ]
  }
  const endState = TasksReducer(startState, changeStatusAC(startState[todolistId1][0].id, newStatus, todolistId1))

  expect(endState[todolistId1].length).toBe(2);
  expect(endState[todolistId1][0].isDone).toBe(newStatus);
  expect(endState[todolistId1][1].isDone).toBe(true);
})

