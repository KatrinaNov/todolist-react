import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "@mui/material";
import TextField from '@material-ui/core/TextField';

type AddItemFormProps = {
  addItemCallback: (title: string) => void
}
const AddItemForm = React.memo((props: AddItemFormProps) => {
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

  return (
    <div>
    <TextField
      value={title}
      error={error}
      onChange={changeTitle}
      onKeyPress={OnKeyPressHandler}
      className={error ? "error" : ""}
      id="outlined-basic"
      label="title is required"
      variant="outlined"
      size="small"
    />
  <Button color='success' variant="contained" onClick={addTask}
          style={{maxWidth: '40px', maxHeight: '40px', minWidth: '30px', minHeight: '30px'}}>+</Button>
    </div>
  )
})

export default AddItemForm;