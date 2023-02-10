import React, {useState} from 'react';
import './index.css';
import './style/TaskList.css'
import './style/HeaderFooter.css'
import './style/Timeline.css'
import LSManager from './logic/LSManager';
import DateLogic from './logic/DateLogic';
import SelectList from './components/SelectList';
import TimelineTaskList from './components/TimelineTaskList';
import Footer from './components/Footer';
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { Link } from "react-router-dom";


function TaskScheduler() {

  const [LoadedCategories, SetLoadedCategories] = useState(LSManager.GetList("Categories"));

    const [LoadedTaskStates, SetLoadedTaskStates] = useState(
      {
        TaskStates: LSManager.GetTaskStates().TaskStates
      });
    
  
  const [LoadedTasks, SetLoadedTasks] = useState(
    {
      Tasks: LSManager.GetList("Tasks")
  });

  const [LoadedHoursOfDay, SetLoadedHoursOfDay] = useState(
    {
      Hours: DateLogic.GetHoursOfADay()
  });

  let InitialUserCapacityStart = "08:00"
  if (LSManager.GetVariable("UserCapacityStart"))
    InitialUserCapacityStart = LSManager.GetVariable("UserCapacityStart");
  else
    LSManager.EditVariable("UserCapacityStart", InitialUserCapacityStart)
  let InitialUserCapacityEnd = "17:00"
  if (LSManager.GetVariable("UserCapacityEnd"))
    InitialUserCapacityEnd = LSManager.GetVariable("UserCapacityEnd");
  else
    LSManager.EditVariable("UserCapacityEnd", InitialUserCapacityEnd)
  const [UserCapacity, SetUserCapacity] = useState(
    {
      Start: InitialUserCapacityStart,
      End: InitialUserCapacityEnd,
      RenderCount: 0
  });

  const UpdateUserCapacityStart = (NewUserCapacity) => {
    if (UserCapacity.RenderCount > 0) {
      SetUserCapacity({...UserCapacity, Start: NewUserCapacity.Start})
      LSManager.EditVariable("UserCapacityStart", NewUserCapacity.Start);
    }
    SetUserCapacity({...UserCapacity, RenderCount: UserCapacity.RenderCount + 1});
  }

  const UpdateUserCapacityEnd = (NewUserCapacity) => {
    if (UserCapacity.RenderCount > 0) {
      SetUserCapacity({...UserCapacity, End: NewUserCapacity.End})
      LSManager.EditVariable("UserCapacityEnd", NewUserCapacity.End);
    }
    SetUserCapacity({...UserCapacity, RenderCount: UserCapacity.RenderCount + 1});
  }
  
  const UpdateCategories = (Category, AddOrRemove) => {
    if (AddOrRemove)
      LSManager.AddItemToList("Categories", Category);
    else
      LSManager.RmvItemFromList("Categories", Category);
    SetLoadedCategories(LSManager.GetList("Categories"));
  }

  const UpdateTasks = (Task, AddOrRemove) => {
    if (AddOrRemove)
      LSManager.AddTask(Task);
    else
      LSManager.RmvTask(Task);
    SetLoadedTasks({Tasks: LSManager.GetList("Tasks")});
  }

  const EditTask = (Task) => {
    LSManager.EditTask(Task);
    SetLoadedTasks({Tasks: LSManager.GetList("Tasks")});
  }

  const EditTaskVariable = (Task, Key, Value) => {
    LSManager.EditTaskVariable(Task, Key, Value);
    SetLoadedTasks({Tasks: LSManager.GetList("Tasks")});
  }
  
  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column', position: "relative", minHeight: "100vh"}}>
        <div className="Header" style={{display: 'flex', flexDirection: 'row', justifyContent: "space-between", width: "100%", height: "4.5rem"}}>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', marginLeft: "30px"}}>
            <Link className="ButtonWithIcon" to="/projects">
                <MdOutlineArrowBackIosNew className="ButtonWithIcon" size="60%" style={{paddingTop: "1rem", color: "black"}}/>        
            </Link>
            <p className="ShadowText" style={{fontSize: '25px', marginTop: "18px", marginBottom: "-20px"}}>Task scheduler 2022</p>
          </div>
          <div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: "5px", marginBottom: "7px", marginRight: "30px"}}>
              <div style={{display: "flex", flexDirection: "column", marginRight: "10px"}}>
                <label className="ShadowText SmallTitleCentered">Start work</label>
                <SelectList LoadedList={LoadedHoursOfDay.Hours} PreferredElement={UserCapacity.Start} Disabled={false} ParentState={UserCapacity} ParentSetState={UpdateUserCapacityStart} ParentStateParam="Start" />
              </div>
              <div style={{display: "flex", flexDirection: "column"}}>
                <label className="ShadowText SmallTitleCentered" style={{}}>End work</label>
                <SelectList LoadedList={LoadedHoursOfDay.Hours} PreferredElement={UserCapacity.End} Disabled={false} ParentState={UserCapacity} ParentSetState={UpdateUserCapacityEnd} ParentStateParam="End" />
              </div>
            </div>
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', left: "0px", right: "0px", position: "absolute", top: "4.5rem", bottom: "5rem"}}>
          <TimelineTaskList LoadedTasks={LoadedTasks.Tasks} UserCapacity={UserCapacity} EditTask={EditTask} EditTaskVariable={EditTaskVariable} RemoveTask={UpdateTasks} LoadedCategories={LoadedCategories} LoadedTaskStates={LoadedTaskStates} UpdateTasks={UpdateTasks} UpdateCategories={UpdateCategories}/>
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default TaskScheduler;