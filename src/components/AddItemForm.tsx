import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useState} from "react";
import {Button, IconButton} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type AddItemFormProps = DefaultInputPropsType &{
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
    <div className={'addItemForm'}>
      <input
        value={title}
        onChange={changeTitle}
        onKeyPress={OnKeyPressHandler}
        className={errorClass}
        {...props}
      />
      <Button
        variant="contained"
        color="success"
        onClick={addTask}
        style={{padding:'5px 14px',minWidth:'auto',fontSize:'24px',lineHeight: '24px'}}
      >+</Button>
      {/*<button onClick={addTask}>+</button>*/}
      {errorMessage}
    </div>
  )
}

export default AddItemForm;