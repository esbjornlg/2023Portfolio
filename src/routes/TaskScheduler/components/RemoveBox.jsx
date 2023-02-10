import React, {useState, useEffect} from 'react'
import SelectList from './SelectList'
import { FiTrash } from 'react-icons/fi'

const RemoveBox = ({LoadedList, UpdateList, WarningMsg, ParentSetState, ParentStateParam, ParentState}) => {
  const [FormText, SetFormText] = useState({
      Text: ""
  });

  useEffect(() => {
    ParentSetState({...ParentState, [ParentStateParam]: FormText.Text});
  }, [FormText])
  

  const HandleFormSubmit = (Event) => {
    Event.preventDefault();
    if (window.confirm(WarningMsg + " '" + FormText.Text + "'?"))
      UpdateList(FormText.Text, false)
  }

//RENDER VVVVVVVVVVVVVVVVVVVVVVVVVVV
    return (
    <>
    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
      <SelectList DivStyle={{marginTop: "0.4rem"}} LoadedList={LoadedList} Disabled={false} ParentState={FormText} ParentSetState={SetFormText} ParentStateParam ="Text"/>
      <button className="ButtonShadow" style={{padding: "4px"}} onClick={HandleFormSubmit}>
        <FiTrash size="1.5em"/>
      </button>
    </div>
    </>
  )
}
export default RemoveBox