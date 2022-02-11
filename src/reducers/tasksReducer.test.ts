import {v1} from "uuid";
import {
  addTaskAC,
  changeStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer
} from "./tasksReducer";
import {TasksType} from "../App";
import {addTodolistAC, removeTodolistAC} from "./todolistReducer";

test('correct task should be removed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let startState: TasksType ={
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "React Book", isDone: true}
    ]
  }
  const endState = tasksReducer(startState, removeTaskAC(startState[todolistId1][0].id, todolistId1))

  expect(endState[todolistId1].length).toBe(1);
  expect(endState[todolistId2].length).toBe(2);
  expect(endState[todolistId1][0].title).toBe("JS")
})
test('correct task should be added to correct array', () => {
  const startState: TasksType = {
    "todolistId1": [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false }
    ],
    "todolistId2": [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false }
    ]
  };

  const action = addTaskAC("juce", "todolistId2");

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juce");
  expect(endState["todolistId2"][0].isDone).toBe(false);
})
test('correct task should change its name', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTaskTitle = 'New task';

  let startState: TasksType ={
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "React Book", isDone: true}
    ]
  }
  const endState = tasksReducer(startState, changeTaskTitleAC(startState[todolistId1][0].id, newTaskTitle, todolistId1))

  expect(endState[todolistId1].length).toBe(2);
  expect(endState[todolistId1][0].title).toBe(newTaskTitle);
  expect(endState[todolistId1][1].title).toBe("JS");
})
test('correct status of task should be changed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newStatus = false;

  let startState: TasksType ={
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "React Book", isDone: true}
    ]
  }
  const endState = tasksReducer(startState, changeStatusAC(startState[todolistId1][0].id, newStatus, todolistId1))

  expect(endState[todolistId1].length).toBe(2);
  expect(endState[todolistId1][0].isDone).toBe(newStatus);
  expect(endState[todolistId1][1].isDone).toBe(true);
})
test('status of specified task should be changed', () => {
  const startState: TasksType = {
    "todolistId1": [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false }
    ],
    "todolistId2": [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false }
    ]
  };

  const action = changeStatusAC("2", false, "todolistId2");

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId2"][1].isDone).toBe(false);
  expect(endState["todolistId1"][1].isDone).toBe(true);
});

test('new array should be added when new todolist is added', () => {
  const startState: TasksType = {
    "todolistId1": [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false }
    ],
    "todolistId2": [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false }
    ]
  };

  const action = addTodolistAC("new todolist");

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState);
  const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
  const startState: TasksType = {
    "todolistId1": [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false }
    ],
    "todolistId2": [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false }
    ]
  };

  const action = removeTodolistAC("todolistId2");

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).toBeUndefined();
});






