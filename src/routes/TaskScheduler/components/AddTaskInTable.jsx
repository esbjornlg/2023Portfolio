import React, {useState} from 'react';
import SelectList from './SelectList'
import IfChecker from '../logic/IfChecker';
import RemoveBox from './RemoveBox';
import { IoMdAdd } from 'react-icons/io'
const AddTaskInTable = ({DisplayedTasksRefs, LoadedCategories, LoadedTaskStates, UpdateTasks, UpdateCategories, IsMini, ExpandTaskList}) => {
  let InitialCategory = "";
  if (!LoadedCategories[0])
    InitialCategory = LoadedCategories[0];

  const [LocalLoadedCategories, SetLocalLoadedCategories] = useState({
    Categories: LoadedCategories,
    PreferredElement: ""
  });

  const HandleInputFocus = () => {
    ExpandTaskList();
  }

  const UpdateLocalLoadedCategories = (NewCategories) => {
    SetLocalLoadedCategories({...LocalLoadedCategories, Categories: NewCategories});
  }

  const [FormTask, SetFormTask] = useState({
    Id: 0,
    Completion: LoadedTaskStates.TaskStates[0].Text,
    Name: "",
    Description: "",
    Category: InitialCategory,
    NewCategory: "",
    StartingTime: 0,
    Deadline: 0,
    EstDuration: 8,
    RealDuration: 0
  });
  
  DisplayedTasksRefs.current[-1] = UpdateLocalLoadedCategories;

  const HandleFormChange = (Event) => {
    if(Event.target.type == "datetime-local") {
    SetFormTask({...FormTask, [Event.target.name]: Event.target.value.replace("T", " ")});
    } else {
    SetFormTask({
      ...FormTask, [Event.target.name]: Event.target.value
    });
    }
  }

  const HandleNewCategory = (Event) => {
    if (FormTask.NewCategory!= "")
      UpdateCategories(FormTask.NewCategory, true);
  }

  const HandleFormSubmit = (Event) => {
    Event.preventDefault();
    let FormToSubmit = FormTask;
    if (FormTask.NewCategory != "")
      FormToSubmit = {...FormToSubmit, Category: FormTask.NewCategory};
    if (IfChecker.FormTaskSubmit(FormToSubmit)) {
      if (FormToSubmit.Category != "" && FormTask.NewCategory != "")
        UpdateCategories(FormToSubmit.Category, true);
      UpdateTasks(FormToSubmit, 1);
      SetFormTask({...FormTask,
        NewCategory: ""
      });
    }
  }

  //RENDER VVVVVVVVVVVVVVVVVVVVV
  return (
    <tr className="TaskTableTr">
        <td className="TaskTableTd" style={{minWidth: "10.5rem", maxWidth: "10.5rem", backgroundColor: "var(--BoxColor3)"}}>
          <input className="RoundedInputBright" placeholder="New task name..." type="text" name="Name" maxLength="20" value={FormTask.Name} onChange={HandleFormChange} onFocus={HandleInputFocus} required/>
        </td>
        <td className="TaskTableTd" style={{minWidth: "10.5rem", maxWidth: "10.5rem", backgroundColor: "var(--BoxColor3)"}}>
          <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            {/* <label className="ShadowText" style={{marginBottom: "0.5rem"}}>New task progress</label> */}
            <SelectList DivStyle={{height: "25px"}} name="Completion" LoadedList={LoadedTaskStates.TaskStates} Disabled={false} ParentState={FormTask} ParentSetState={SetFormTask} ParentStateParam="Completion" />
          </div>
        </td> 
        { (IsMini) ? (
          <>                
          </>
        ) :
        (
          <>
            <td className="TaskTableTd" style={{minWidth: "10.5rem", maxWidth: "10.5rem", backgroundColor: "var(--BoxColor3)"}}>
              <textarea className="RoundedInputBright UnscalableTextArea" name="Description" maxLength="100" value={FormTask.Description} onChange={HandleFormChange}></textarea>
            </td>
            <td className="TaskTableTd" style={{minWidth: "10.5rem", maxWidth: "10.5rem", backgroundColor: "var(--BoxColor3)"}}>
            {(LocalLoadedCategories.Categories.length) ? (
              <>
                <RemoveBox UpdateList={UpdateCategories} LoadedList={LocalLoadedCategories.Categories} WarningMsg="Remove category" ParentState={FormTask} ParentSetState={SetFormTask} ParentStateParam="Category"/>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                  <input className="RoundedInputBright" style={{width: "70%", marginTop: "2px"}} type="text" placeholder="New category..." name="NewCategory" maxLength="20" value={FormTask.NewCategory} onChange={HandleFormChange}/>
                  <button className="ButtonShadow" style={{marginTop: "2px", padding: "2px", paddingTop: "5px", paddingBottom: "2px"}} onClick={HandleNewCategory}><IoMdAdd size="1.5em"/></button>
                </div>
              </>
            ) : (
              <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                <input className="RoundedInputBright" style={{marginTop: "5px", width: "70%", transform: "translateY(0%)"}} type="text" placeholder="New category..." name="NewCategory" maxLength="20" value={FormTask.NewCategory} onChange={HandleFormChange}/>
                <button className="ButtonShadow" style={{padding: "3px", transform: "translateY(0%)", paddingTop: "2px", paddingBottom: "2px"}} onClick={HandleNewCategory}><IoMdAdd size="1.5em"/></button>
              </div>
            )}            </td>
            <td className="TaskTableTd" style={{minWidth: "11.6rem", maxWidth: "11.6rem", backgroundColor: "var(--BoxColor3)"}}>
              <input className="RoundedInputBright" type="datetime-local" name="StartingTime" value={FormTask.StartingTime} onChange={HandleFormChange}/>
            </td>
            <td className="TaskTableTd" style={{minWidth: "11.6rem", maxWidth: "11.6rem", backgroundColor: "var(--BoxColor3)"}}>
              <input className="RoundedInputBright" type="datetime-local" name="Deadline" value={FormTask.Deadline} onChange={HandleFormChange}/>
            </td>
            <td className="TaskTableTd" style={{minWidth: "4rem", maxWidth: "4rem", backgroundColor: "var(--BoxColor3)"}}>
              <div style={{display: "flex", flexDirection: "row"}}>
                <input className="RoundedInputBright" type="number" step="0.1" name="EstDuration" value={FormTask.EstDuration} onChange={HandleFormChange} required/>
                <div style= {{marginLeft: "-" + (20).toString() + "px", paddingTop: "7px", fontSize: "1em"}}>h</div>
              </div>
            </td>
            <td className="TaskTableTd" style={{minWidth: "6rem", maxWidth: "6rem", backgroundColor: "var(--BoxColor3)"}}>
              <div style={{height: "calc(var(--RowHeight) - 1rem)", display: 'flex', flexDirection: 'column', width: "6rem"}}>
                <button className="ButtonShadow SmallButton" style={{height: "100%"}} onClick={HandleFormSubmit}>Add task</button>
              </div>
            </td>
          </>
        )}

    </tr>
  )
}

export default AddTaskInTable