import React, {useState, useEffect} from 'react';
import SelectList from './SelectList';
import IfChecker from '../logic/IfChecker';
import DateLogic from '../logic/DateLogic';
import { BiEditAlt, BiCheck } from 'react-icons/bi'
import { FiTrash } from 'react-icons/fi'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'


const TaskDisplay = ({DisplayedTasksRefs, IsMini, EditTask, EditTaskVariable, RemoveTask, LoadedCategories, LoadedTaskStates, Task}) => {
  const [RenderCount, SetRenderCount] = useState(0);

  const [LocalLoadedCategories, SetLocalLoadedCategories] = useState({
    Categories: LoadedCategories,
    PreferredElement: ""
  });

  const [LocalPreferredCompletion, SetLocalPreferredCompletion] = useState({
    PreferredCompletion: IfChecker.FindObjectWithKeyValue(LoadedTaskStates.TaskStates, "Text", Task.Completion)
  });
  
  const UpdateCategories = (NewCategories) => {
    SetLocalLoadedCategories({...LocalLoadedCategories, Categories: NewCategories});
  }

  const UpdatePreferredCategory = (PreferredElement) => {
    SetLocalLoadedCategories({...LocalLoadedCategories, PreferredElement: PreferredElement});
  }

  DisplayedTasksRefs.current[Task.Id] = UpdateCategories;

  let DueSoonDayCount = 3;
  const [FormTask, SetFormTask] = useState({
    Id: Task.Id,
    Completion: Task.Completion,
    Name: Task.Name,
    Description: Task.Description,
    Category: Task.Category,
    StartingTime: Task.StartingTime,
    Deadline: Task.Deadline,
    EstDuration: Task.EstDuration,
    RealDuration: 0,
    Editable: false
  });

  const SetDisplayNotifs = () => {
    let Color = "var(--BoxColor2)";
    let DueColor = "";
    let DueText = "";
    let DueTextClass = "ShadowTextWhite";
    switch(FormTask.Completion) {
      case LoadedTaskStates.TaskStates[0].Text:
        Color = LoadedTaskStates.TaskStates[0].color;
        break;
      case LoadedTaskStates.TaskStates[1].Text:
        Color = LoadedTaskStates.TaskStates[1].color;
        break;
      case LoadedTaskStates.TaskStates[2].Text:
        Color = LoadedTaskStates.TaskStates[2].color;
        break;
    }
    if (FormTask.Completion != LoadedTaskStates.TaskStates[2].Text && Task.Deadline) {
      let HoursUntilDeadline = Math.round((Date.parse(Task.Deadline) - Date.now())/3600000);
      let HoursUntilStartingTime = Math.round((Date.parse(Task.StartingTime) - Date.now())/3600000);
      if (HoursUntilStartingTime > 0) {
        DueText = "Begins in " + DateLogic.FormatDayHours(HoursUntilStartingTime);
      } else if (HoursUntilDeadline > 0){
        DueText = DateLogic.FormatDayHours(HoursUntilDeadline) + " left!"
      } else {
        DueText = DateLogic.FormatDayHours(HoursUntilDeadline * (-1)) + " late!"
      }
      if (HoursUntilDeadline < DueSoonDayCount*24 && HoursUntilDeadline > 0) {
        DueColor = "linear-gradient(-90deg, rgba(0,0,0,0) 92%, var(--DueSoon3) 96%, var(--DueSoon2) 97%, var(--DueSoon1) 100%)";
        DueTextClass = "ShadowText";
      } else if (HoursUntilDeadline < 0) {
        DueColor = "repeating-linear-gradient(45deg, var(--Late1Half) 0px, var(--Late1Half) 2px, var(--BoxColorHalf) 3px, var(--BoxColorHalf) 4px, var(--Transparent) 5px, var(--Transparent) 13px)";
      }
    }
    return {Color: Color, DueColor: DueColor, DueText: DueText, DueTextClass: DueTextClass};
  }

  const [DisplayInfo, SetDisplayInfo] = useState(SetDisplayNotifs());
  
  useEffect(() => {
    if (!FormTask.Editable) {
      SetFormTask({
        ...FormTask,
        Id: Task.Id,
        Completion: Task.Completion,
        Name: Task.Name,
        Description: Task.Description,
        Category: Task.Category,
        StartingTime: Task.StartingTime,
        Deadline: Task.Deadline,
        EstDuration: Task.EstDuration,
        RealDuration: 0,
      });
    }
  }, [FormTask.Editable])

  useEffect(() => {
    SetFormTask({
      ...FormTask,
      Id: Task.Id,
      Completion: Task.Completion,
      Name: Task.Name,
      Description: Task.Description,
      Category: Task.Category,
      StartingTime: Task.StartingTime,
      Deadline: Task.Deadline,
      EstDuration: Task.EstDuration,
      RealDuration: 0,
    });
  }, [Task])

  useEffect(() => {
    UpdatePreferredCategory(Task.Category);
  }, [Task.Category])

  useEffect(() => {
    SetLocalPreferredCompletion({PreferredCompletion: IfChecker.FindObjectWithKeyValue(LoadedTaskStates.TaskStates, "Text", Task.Completion)});
  }, [Task.Completion])

  useEffect(() => {
    if (RenderCount > 0)
      EditTaskVariable(Task, "Completion", FormTask.Completion);
    SetRenderCount(RenderCount + 1);
  }, [FormTask.Completion])

  useEffect(() => {
    let DisplayStyle = SetDisplayNotifs();
    SetDisplayInfo(DisplayStyle);
  }, [FormTask.Completion, Task.StartingTime, Task.Deadline])

  const HandleFormChange = (Event) => {
  if(Event.target.type == "datetime-local") {
    SetFormTask({...FormTask, [Event.target.name]: Event.target.value.replace("T", " ")});
    } else {
    SetFormTask({
      ...FormTask, [Event.target.name]: Event.target.value
    });
    }
  }

  const HandleEditableChange = (Event) => {
    SetFormTask({
      ...FormTask, Editable: !FormTask.Editable
    });
  }

  const HandleSubmitTaskEdit = (Event) => {
    if (IfChecker.FormTaskSubmit(FormTask)) {
      EditTask(FormTask);
      HandleEditableChange();
    }
  }

  const HandleRemoveTask = (Event) => {
    RemoveTask(FormTask, 0);
  }

  const Editability = () => {
    let ReturnedHTML;
    if(Task.CanBeEdited) {
      if (FormTask.Editable) {
        ReturnedHTML = <>
        <button className="ButtonShadow" style={{padding: "8px"}} onClick={() => {HandleEditableChange(Event)}}><MdOutlineArrowBackIosNew size="1.6em"/></button>
        <button type="submit" className="ButtonShadow" style={{padding: "6px"}} onClick={() => {HandleSubmitTaskEdit(Event)}}><BiCheck size="2em"/></button>
        </>
      } else {
        ReturnedHTML = <>
        <button className="ButtonShadow" style={{padding: "6px"}} onClick={() => {HandleEditableChange(Event)}}><BiEditAlt size="2em"/></button>
        <button className="ButtonShadow" style={{padding: "6px"}} onClick={() => {HandleRemoveTask(Event)}}><FiTrash size="2em"/></button>
        </>
      } 
    } else {
      ReturnedHTML = <></>
    }
    return ReturnedHTML;
  }
  //RENDER VVVVVVVVVVVVVVVVVVVVV
  return (
    <tr className="TaskTableTr">
        <td className="TaskTableTd" style={{minWidth: "10.5rem", maxWidth: "10.5rem", backgroundColor: DisplayInfo.Color, backgroundImage: DisplayInfo.DueColor}}>
          <input className="RoundedInputBright" type="text" name="Name" maxLength="20" value={FormTask.Name} readOnly={!FormTask.Editable} onChange={HandleFormChange} style={{width: "10rem"}}/>
        </td>
        <td className="TaskTableTd" style={{minWidth: "10.5rem", maxWidth: "10.5rem", backgroundColor: DisplayInfo.Color, backgroundImage: DisplayInfo.DueColor}}>
          <div style={{display: "flex", flexDirection: "column", justifyContent: "end"}}>
            <label className={DisplayInfo.DueTextClass} style={{marginBottom: "0.6rem"}}>{DisplayInfo.DueText}</label>
            <SelectList DivStyle={{marginBottom: "0.5rem"}} name="Completion" LoadedList={LoadedTaskStates.TaskStates} PreferredElement={LocalPreferredCompletion.PreferredCompletion} Disabled={!Task.CanBeEdited} ParentState={FormTask} ParentSetState={SetFormTask} ParentStateParam="Completion" />
          </div>
        </td>
        { (IsMini) ? (
          <>                
          </>
        ) :
        (
          <>
            <td className="TaskTableTd" style={{minWidth: "10.5rem", maxWidth: "10.5rem", backgroundColor: DisplayInfo.Color, backgroundImage: DisplayInfo.DueColor}}>
              <textarea className="RoundedInputBright UnscalableTextArea" name="Description" maxLength="100" value={FormTask.Description} readOnly={!FormTask.Editable} onChange={HandleFormChange}></textarea>
            </td>
            <td className="TaskTableTd" style={{minWidth: "10.5rem", maxWidth: "10.5rem", backgroundColor: DisplayInfo.Color, backgroundImage: DisplayInfo.DueColor}}>
              <SelectList name="Category" LoadedList={LocalLoadedCategories.Categories} PreferredElement={Task.Category} Disabled={!FormTask.Editable} ParentState={FormTask} ParentSetState = {SetFormTask} ParentStateParam ="Category" />
            </td>
            <td className="TaskTableTd" style={{minWidth: "11.6rem", maxWidth: "11.6rem", backgroundColor: DisplayInfo.Color, backgroundImage: DisplayInfo.DueColor}}>
              <input className="RoundedInputBright" type="datetime-local" name="StartingTime" value={FormTask.StartingTime} readOnly={!FormTask.Editable} onChange={HandleFormChange}/>
            </td>
            <td className="TaskTableTd" style={{minWidth: "11.6rem", maxWidth: "11.6rem", backgroundColor: DisplayInfo.Color, backgroundImage: DisplayInfo.DueColor}}>
              <input className="RoundedInputBright" type="datetime-local" name="Deadline" value={FormTask.Deadline} readOnly={!FormTask.Editable} onChange={HandleFormChange}/>
            </td>
            <td className="TaskTableTd" style={{minWidth: "4rem", maxWidth: "4rem", backgroundColor: DisplayInfo.Color, backgroundImage: DisplayInfo.DueColor}}>
              <div style={{display: "flex", flexDirection: "row"}}>
                <input className="RoundedInputBright" type="text" maxLength="4" name="EstDuration" placeholder="0" value={FormTask.EstDuration} readOnly={!FormTask.Editable} onChange={HandleFormChange}/>
                <div style= {{marginLeft: "-" + (20).toString() + "px", paddingTop: "7px", fontSize: "1em"}}>h</div>
              </div>
            </td>
            <td className="TaskTableTd" style={{minWidth: "6rem", maxWidth: "6rem", backgroundColor: DisplayInfo.Color, backgroundImage: DisplayInfo.DueColor}}>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: "space-evenly", width: "6rem"}}>
                {Editability()}
              </div>
            </td>
          </>
        )}

    </tr>
  )
}

export default TaskDisplay