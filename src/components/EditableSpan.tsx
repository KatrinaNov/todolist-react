import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
  title: string
  upDateItemTitle: (title: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
  let [localTitle, setLocalTitle] = useState(props.title)
  let [edit, setEdit] = useState(false)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setViewMode();
    }
  }
  const setActiveMode = () => setEdit(true)
  const setViewMode = () => {
    setEdit(false)
    props.upDateItemTitle(localTitle)
  }

  return (
    edit ?
      <input
        value={localTitle}
        autoFocus
        onBlur={setViewMode}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
      />
      : <span onDoubleClick={setActiveMode}>{props.title}</span>
  );
};

export default EditableSpan;