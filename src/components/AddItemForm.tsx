import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormProps = {
  addItemCallback: (title: string) => void
}
const AddItemForm = (props: AddItemFormProps) => {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<boolean>(false)

  const addTask = () => {
    title.trim() ? props.addItemCallback(title.trim()) : setError(true)
    setTitle('')
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(false)
  }
  const OnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addTask()
  }
  const errorClass = error ? 'error' : ''
  const errorMessage = error && <div style={{color: 'red'}}>Title is required</div>

  return (
    <div>
      <input
        value={title}
        onChange={changeTitle}
        onKeyPress={OnKeyPressHandler}
        className={errorClass}/>
      <button onClick={addTask}>+</button>
      {errorMessage}
    </div>
  )
}

export default AddItemForm;