import React, {useState, useRef, useEffect} from 'react'
import DateLogic from '../logic/DateLogic'
import TaskScheduler from '../logic/TaskScheduler'
import IfChecker from '../logic/IfChecker'
import EditVariableOnChange from './EditVariableOnChange'
import TaskDisplay from './TaskDisplay'
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md'
import { BsFillCalendarCheckFill, BsCalendarCheck } from 'react-icons/bs'
import AddTaskInTable from './AddTaskInTable'
import '../style/StyleIndex.jsx'

const TimelineTaskList = ({LoadedTasks, UserCapacity, EditTask, EditTaskVariable, RemoveTask, LoadedCategories, LoadedTaskStates, UpdateTasks, UpdateCategories}) => {
  const RenderCount = useRef([0, 0]);
  const HorizScrollLen = window.innerWidth * 10;
  let LastScrollLeft;
  const [Transform, SetTransform] = useState({Scale: 1, RootDate: new Date(), Scope: "Days"})
  const DatesContainer = useRef();
  const BiggerDatesContainer = useRef();
  const TaskLegendsContainer = useRef();
  const TaskRowsContainer = useRef();
  const TodayLine = useRef();
  const ZoomSlider = useRef();
  const ZoomSliderValue = useRef(1);
  const ScrollerContainer = useRef();
  const ScrollerElem = useRef();
  const HeaderField = useRef();
  const TLScroll = useRef();
  const HeaderScroll = useRef();
  const [WorkSessions, SetWorkSessions] = useState(TaskScheduler.GetTasksWorkSessions(LoadedTasks));
  
  const [TaskListView, SetTaskListView] = useState(
    {
      TaskTableClass: "TaskTableMini",
      ShowCompleted: false
    }
    );
    const ChangeTaskList = () => {
      if (TaskListView.TaskTableClass == "TaskTableMini") {
        SetTaskListView({
          ...TaskListView,
          TaskTableClass: "TaskTable"
        })
      } else {
        SetTaskListView({
          ...TaskListView,
          TaskTableClass: "TaskTableMini"
        })
      }
    }

    const ExpandTaskList = () => {
      if (TaskListView.TaskTableClass == "TaskTableMini")
        SetTaskListView({...TaskListView, TaskTableClass: "TaskTable"})
    }
  
    const HandleShowCompleted = () => {
      if (TaskListView.ShowCompleted == true) {
        SetTaskListView({
          ...TaskListView,
        ShowCompleted: false
        })
      } else {
        SetTaskListView({
          ...TaskListView,
          ShowCompleted: true
        })
      }
    }
  
    const [DisplayedTasks, SetDisplayedTasks] = useState({
      Tasks: []
    })
  
    const DisplayedTasksRefs = useRef({})
  
    const [Search, SetSearch] = useState({
      String: ""
    });
  
    const CreateTaskDisplays = (TaskList) => {
      let IsMini = true;
      if (TaskListView.TaskTableClass == "TaskTable")
        IsMini = false;
      let TaskDisplays = [];
      
      for (let i = 0; i < TaskList.length; i++) {
        if (!Object.hasOwn(TaskList[i], "CanBeEdited"))
          TaskList[i] = {...TaskList[i], CanBeEdited: true}
        TaskDisplays.push(React.createElement(TaskDisplay, {key: TaskList[i].Id, DisplayedTasksRefs: DisplayedTasksRefs, IsMini: IsMini, EditTask: EditTask, EditTaskVariable: EditTaskVariable, RemoveTask: RemoveTask, LoadedCategories: LoadedCategories, LoadedTaskStates: LoadedTaskStates, Task: TaskList[i]}));
      }
      return TaskDisplays;
    }
  
    const CheckTask = (Task, SearchArg, ShowCompleted) => {
      if (!ShowCompleted) {
        if (Task.Completion == "Completed")
          return false;
      }
      for (const [Key, Value] of Object.entries(Task)) {
        if (Value.toString().toLowerCase().includes(SearchArg.toLowerCase()))
          return true;
      }
      return false;
    }

    const [FilteredTasks, SetFilteredTasks] = useState();

    const SearchTasks = (SearchArg, ShowCompleted) => {
      let FilteredTasks = LoadedTasks.filter(Task => CheckTask(Task, SearchArg, ShowCompleted));
      return FilteredTasks;
    }
  
    const UpdateTaskSearch = (SearchArg, ShowCompleted) => {
      let CreatedDisplays = [];
      let FilteredTasks = [];
      let IsMini = true;
      if (TaskListView.TaskTableClass == "TaskTable")
        IsMini = false;
      if (LoadedTasks.length != 0) {
        FilteredTasks = SearchTasks(SearchArg, ShowCompleted);
        SetFilteredTasks(FilteredTasks);
        CreatedDisplays = CreateTaskDisplays(FilteredTasks);
        CreatedDisplays.unshift(React.createElement(AddTaskInTable, {key: -1, DisplayedTasksRefs: DisplayedTasksRefs, LoadedCategories: LoadedCategories, LoadedTaskStates: LoadedTaskStates, UpdateTasks: UpdateTasks, UpdateCategories: UpdateCategories, IsMini: IsMini, ExpandTaskList: ExpandTaskList}));
      }
      if (CreatedDisplays.length == 0)
        CreatedDisplays.unshift(React.createElement(AddTaskInTable, {key: -1, DisplayedTasksRefs: DisplayedTasksRefs, LoadedCategories: LoadedCategories, LoadedTaskStates: LoadedTaskStates, UpdateTasks: UpdateTasks, UpdateCategories: UpdateCategories, IsMini: IsMini, ExpandTaskList: ExpandTaskList}));
      SetDisplayedTasks({Tasks: CreatedDisplays});
      return FilteredTasks;
    }
  
  //^^^^^ TaskList
  //VVVVV Timeline

  const FindEarliestChildOfClass = (ChildrenList, ClassName) => {
    let EarliestChild;
    for (let i = 0; i < ChildrenList.length; i++) {
      if (!EarliestChild) {
        if (ChildrenList[i].className == ClassName)
          EarliestChild = ChildrenList[i];
      }
      else if (ChildrenList[i].EndTime.getTime() < EarliestChild.EndTime.getTime() && ChildrenList[i].className == ClassName)
        EarliestChild = ChildrenList[i];
    }
    return EarliestChild;
  }

  const FindLatestChildOfClass = (ChildrenList, ClassName) => {
    let LatestChild;
    for (let i = 0; i < ChildrenList.length; i++) {
      if (!LatestChild) {
        if (ChildrenList[i].className == ClassName)
          LatestChild = ChildrenList[i];
      }
      else if (ChildrenList[i].StartingTime.getTime() > LatestChild.StartingTime.getTime() && ChildrenList[i].className == ClassName)
        LatestChild = ChildrenList[i];
    }
    return LatestChild;
  }
  
  const GetDateRange = (TheDate, Scale) => {
    let HalfRangeMS = DateLogic.GetDayMS() * TaskScheduler.GetDefaultDateRange()/(2 * Scale);
    let StartingTime = new Date(TheDate.getTime() - HalfRangeMS);
    let EndTime = new Date(TheDate.getTime() + HalfRangeMS);
    return {StartingTime: StartingTime, EndTime: EndTime};
  }

  const CreateTaskRow = (Task) => {
    let TaskRow = document.createElement("div");
    if (Task)
      TaskRow.Id = Task.Id;
    TaskRow.className = "TLRow TLTaskRow";
    return TaskRow;
  }

  const CreateTaskDiv = (Task, Scale, IsDetailed) => {
    let TaskDiv = document.createElement("div");
    TaskDiv.className = "TaskDiv";
    TaskDiv.StartingTime = Task.StartingTime;    
    TaskDiv.EndTime = Task.EndTime;
    let Dimensions = DateLogic.CalcDimensions(Transform.RootDate, Task.StartingTime, Task.EndTime, Scale, TaskListView);
    TaskDiv.style.width = Dimensions.Width + "px";
    TaskDiv.style.left = Dimensions.Left + "px";
    TaskDiv.style.backgroundColor = "var(--" + Task.Completion.replace(" ", "") + ")";
    TaskDiv.style.textShadow = "2px 2px rgba(0, 0, 0, 0.3)";
    return TaskDiv;
  }

  const CreateTaskDivs = (ChildContainer, Task, Scale, IsDetailed) => {
    let TaskCopy = {...Task, StartingTime: new Date(Task.StartingTime), EndTime: new Date(Task.Deadline)};
    let DateRange = GetDateRange(Transform.RootDate, Scale);
    let EndTime = DateRange.EndTime;
    let SecondPartStartingTime;
    let EarliestChild = FindEarliestChildOfClass(ChildContainer.children, "TaskDiv");
    if (EarliestChild)
      EndTime = EarliestChild.StartingTime;
    let LatestChild = FindLatestChildOfClass(ChildContainer.children, "TaskDiv");
    if (LatestChild)
      SecondPartStartingTime = LatestChild.EndTime;
    if (TaskCopy.EndTime.getTime() > DateRange.StartingTime.getTime() && TaskCopy.StartingTime.getTime() < EndTime.getTime()) {
      let TaskDiv = CreateTaskDiv(TaskCopy, Scale, IsDetailed);
      ChildContainer.appendChild(TaskDiv);
    }
    if (!SecondPartStartingTime)
      return;
    if (TaskCopy.StartingTime.getTime() >= SecondPartStartingTime.getTime() && TaskCopy.StartingTime.getTime() < DateRange.EndTime.getTime()) {
      let TaskDiv = CreateTaskDiv(TaskCopy, Scale, IsDetailed);
      ChildContainer.appendChild(TaskDiv);
    }
  }

  const CreateWorkDiv = (WorkSession, Task, Scale, IsDetailed) => {
    let WorkDiv = document.createElement("div");
    let HourLength = (WorkSession.EndTime.getTime() - WorkSession.StartingTime.getTime()) / DateLogic.GetHrMS();
    HourLength = Math.round(HourLength * 10) / 10  + "h"
    WorkDiv.innerHTML = HourLength;
    WorkDiv.className = "WorkDiv";
    WorkDiv.StartingTime = WorkSession.StartingTime;    
    WorkDiv.EndTime = WorkSession.EndTime;
    let Dimensions = DateLogic.CalcDimensions(Transform.RootDate, WorkSession.StartingTime, WorkSession.EndTime, Scale, TaskListView);
    WorkDiv.style.width = Dimensions.Width + "px";
    WorkDiv.style.left = Dimensions.Left + "px";
    WorkDiv.style.backgroundColor = "var(--" + Task.Completion.replace(" ", "") + ")";
    WorkDiv.style.textShadow = "2px 2px rgba(0, 0, 0, 0.3)";

    let WorkDivInfo = document.createElement("div");
    WorkDivInfo.className = "WorkDivInfo";
    WorkDivInfo.StartingTime = WorkSession.StartingTime;    
    WorkDivInfo.EndTime = WorkSession.EndTime;
    WorkDivInfo.style.width = Dimensions.Width + "px";
    WorkDivInfo.style.left = Dimensions.Left + "px";
    WorkDivInfo.style.backgroundColor = "var(--" + Task.Completion.replace(" ", "") + "Half)";
    WorkDivInfo.style.borderColor = "var(--" + Task.Completion.replace(" ", "") + ")";
    if (WorkSession.IsDue) {
        WorkDiv.style.backgroundImage = "repeating-linear-gradient(45deg, var(--Late1Half) 0px, var(--Late1Half) 2px, var(--BoxColorHalf) 3px, var(--BoxColorHalf) 4px, var(--Transparent) 5px, var(--Transparent) 13px)";
        WorkDivInfo.style.backgroundImage = "repeating-linear-gradient(45deg, var(--Late1Half) 0px, var(--Late1Half) 2px, var(--BoxColorHalf) 3px, var(--BoxColorHalf) 4px, var(--Transparent) 5px, var(--Transparent) 13px)";

    }
    return [WorkDiv, WorkDivInfo];
  }

  const CreateWorkDivs = (ChildContainer, Task, WorkSessions, Scale, IsDetailed) => {
    let DateRange = GetDateRange(Transform.RootDate, Scale);
    let EndTime = DateRange.EndTime;
    let SecondPartStartingTime;
    let EarliestChild = FindEarliestChildOfClass(ChildContainer.children, "WorkDiv");
    if (EarliestChild)
      EndTime = EarliestChild.StartingTime;
    let LatestChild = FindLatestChildOfClass(ChildContainer.children, "WorkDiv");
    if (LatestChild)
      SecondPartStartingTime = LatestChild.EndTime;
    for (let i = 0; i < WorkSessions.length; i++) {
      if (WorkSessions[i].EndTime.getTime() > DateRange.StartingTime.getTime() && WorkSessions[i].StartingTime.getTime() < EndTime.getTime()) {
        let WorkDiv = CreateWorkDiv(WorkSessions[i], Task, Scale, IsDetailed);
        ChildContainer.appendChild(WorkDiv[1]);
        ChildContainer.appendChild(WorkDiv[0]);
      }
    }
    if (!SecondPartStartingTime)
      return;
    for (let i = 0; i < WorkSessions.length; i++) {
      if (WorkSessions[i].StartingTime.getTime() >= SecondPartStartingTime.getTime() && WorkSessions[i].StartingTime.getTime() < DateRange.EndTime.getTime()) {
        let WorkDiv = CreateWorkDiv(WorkSessions[i], Task, Scale, IsDetailed);
        ChildContainer.appendChild(WorkDiv[1]);
        ChildContainer.appendChild(WorkDiv[0]);
      }
    }
  }

  const CreateAllTaskWorkDivs = (TaskList, Scale, IsDetailed, NewWorkSessions) => {
    for (let i = 0; i < TaskRowsContainer.current.children.length; i++) {
      if(TaskRowsContainer.current.children[i].Id) {
        CreateTaskDivs(TaskRowsContainer.current.children[i], IfChecker.FindObjectWithKeyValue(TaskList, "Id", TaskRowsContainer.current.children[i].Id), Scale, IsDetailed);
        for (let j = 0; j < NewWorkSessions.AllTaskHours.length; j++) {
          if (NewWorkSessions.AllTaskHours[j].Id == TaskRowsContainer.current.children[i].Id) {
            CreateWorkDivs(TaskRowsContainer.current.children[i], IfChecker.FindObjectWithKeyValue(TaskList, "Id", NewWorkSessions.AllTaskHours[j].Id), NewWorkSessions.AllTaskHours[j].WorkSessions, Scale, IsDetailed);
            break;
          }
        }
      }
    }
  }

  const CreateTaskRows = (TaskList) => {
    for (let i = -1; i < TaskList.length; i++) {
      if (i >= 0)
        TaskRowsContainer.current.appendChild(CreateTaskRow(TaskList[i]));
      else
        TaskRowsContainer.current.appendChild(CreateTaskRow());
    }
  }

  const RemoveAllTaskRows = () => {
    for (let i = TaskRowsContainer.current.children.length - 1; i >= 0; i--) {
      if (TaskRowsContainer.current.children[i].className != "")
        TaskRowsContainer.current.removeChild(TaskRowsContainer.current.children[i]);
    }
  }

  const RemoveAllTimeDivs = () => {
    while (DatesContainer.current.firstChild)
      DatesContainer.current.removeChild(DatesContainer.current.lastChild);
    while (BiggerDatesContainer.current.firstChild)
      BiggerDatesContainer.current.removeChild(BiggerDatesContainer.current.lastChild);
  }

  const RemoveDivsOffRange = (ChildContainer, Scale) => {
    let DateRange = GetDateRange(Transform.RootDate, Scale);
    for (let i = ChildContainer.children.length - 1; i >= 0; i--) { //Remove all before range
      if (ChildContainer.children[i].EndTime.getTime() < DateRange.StartingTime.getTime())
        ChildContainer.removeChild(ChildContainer.children[i]);
    }
    for (let i = ChildContainer.children.length - 1; i >= 0; i--) { //Remove all after range
      if (ChildContainer.children[i].StartingTime.getTime() > DateRange.EndTime.getTime())
        ChildContainer.removeChild(ChildContainer.children[i]);
    }
  }

  const RemoveAllTimeDivsOffRange = (Scale) => {
    RemoveDivsOffRange(DatesContainer.current, Scale);
    RemoveDivsOffRange(BiggerDatesContainer.current, Scale);
  }

  const RemoveAllTaskDivsOffRange = (Scale) => {
    for (let i = 0; i < TaskRowsContainer.current.children.length; i++)
      RemoveDivsOffRange(TaskRowsContainer.current.children[i], Scale);
  }

  const CreateTimeDiv = (StartingTime, EndTime, Scope, Scale, IsBigger) => {
    let TimeDiv = document.createElement("div");
    TimeDiv.className = "TimeDiv";
    if (IsBigger) {
      switch (Scope) {
        case "Years":
          TimeDiv.innerHTML = StartingTime.getFullYear();
          break;
        case "Months":
          TimeDiv.innerHTML = DateLogic.GetMonthStr(DateLogic.RoundMonth(StartingTime).getMonth() + 1) + " " + StartingTime.getFullYear();
          break;
        case "Days":
          TimeDiv.innerHTML = StartingTime.getDate() + " " + DateLogic.GetMonthStr(StartingTime.getMonth() + 1) + " " + StartingTime.getFullYear();
          break;
      }
    } else {
      switch (Scope) {
        case "Months":
          TimeDiv.innerHTML = DateLogic.GetMonthStr(DateLogic.RoundMonth(StartingTime).getMonth() + 1);
          break;
        case "Days":
          TimeDiv.innerHTML = StartingTime.getDate();
          break;
        case "Hours":
          if (StartingTime.getHours() > 9)
            TimeDiv.innerHTML = StartingTime.getHours();
          else
          TimeDiv.innerHTML = "0" + StartingTime.getHours().toString();
          break;
      }
    }
    TimeDiv.StartingTime = StartingTime;    
    TimeDiv.EndTime = EndTime;
    TimeDiv.IsBigger = IsBigger;
    let Dimensions = DateLogic.CalcDimensions(Transform.RootDate, StartingTime, EndTime, Scale, TaskListView);
    TimeDiv.style.width = Dimensions.Width + "px";
    TimeDiv.style.left = Dimensions.Left + "px";
    return TimeDiv;
  }

  const CreateTimeDivs = (Scope, Scale, IsBigger, RootDate) => {
    let DateRange = GetDateRange(Transform.RootDate, Scale);
    let EndTime = DateRange.EndTime;
    let CurrentTime;
    let MSPerDivArr = [];
    let SecondPartStartingTime;
    let EarliestChild;
    if (IsBigger)
      EarliestChild = FindEarliestChildOfClass(BiggerDatesContainer.current.children, "TimeDiv");
    else
      EarliestChild = FindEarliestChildOfClass(DatesContainer.current.children, "TimeDiv");
    if (EarliestChild)
      EndTime = EarliestChild.StartingTime;
    let LatestChild;
    if (IsBigger)
      LatestChild = FindLatestChildOfClass(BiggerDatesContainer.current.children, "TimeDiv");
    else
      LatestChild = FindLatestChildOfClass(DatesContainer.current.children, "TimeDiv");
    if (LatestChild)
      SecondPartStartingTime = LatestChild.EndTime;
    switch (Scope) {
      case "Years":
        let CurrentTime2 = DateLogic.RoundDownYear(DateRange.StartingTime);
        if (EarliestChild) {
          while(CurrentTime2.getTime() < EndTime.getTime()) {
            MSPerDivArr.push(DateLogic.GetYearMS(CurrentTime2));
            let CurrentTime2Copy = new Date(CurrentTime2);
            CurrentTime2 = new Date(CurrentTime2Copy.setFullYear(CurrentTime2Copy.getFullYear() + 1));
          }
          CurrentTime2 = new Date(DateLogic.RoundYear(SecondPartStartingTime).getTime());
        }
        while(CurrentTime2.getTime() < DateRange.EndTime.getTime()) {
          MSPerDivArr.push(DateLogic.GetYearMS(CurrentTime2));
          let CurrentTime2Copy = new Date(CurrentTime2);
          CurrentTime2 = new Date(CurrentTime2Copy.setFullYear(CurrentTime2Copy.getFullYear() + 1));
        }
        CurrentTime = DateLogic.RoundDownYear(DateRange.StartingTime);
        if (SecondPartStartingTime)
          SecondPartStartingTime = DateLogic.RoundYear(SecondPartStartingTime);
        break;
      case "Months":
        let CurrentTime3 = DateLogic.RoundDownMonth(DateRange.StartingTime);
        if (EarliestChild) {
          while(CurrentTime3.getTime() < EndTime.getTime()) {
            MSPerDivArr.push(DateLogic.GetDaysInMonth(CurrentTime3) * DateLogic.GetDayMS());
            CurrentTime3 = new Date(CurrentTime3.getTime() + MSPerDivArr[MSPerDivArr.length - 1]);
          }
          CurrentTime3 = DateLogic.RoundMonth(SecondPartStartingTime);
        }
        while(CurrentTime3.getTime() < DateRange.EndTime.getTime()) {
          MSPerDivArr.push(DateLogic.GetDaysInMonth(CurrentTime3) * DateLogic.GetDayMS());
          CurrentTime3 = new Date(CurrentTime3.getTime() + MSPerDivArr[MSPerDivArr.length - 1]);
        }
        CurrentTime = DateLogic.RoundDownMonth(DateRange.StartingTime);
        if (SecondPartStartingTime)
          SecondPartStartingTime = DateLogic.RoundMonth(SecondPartStartingTime);
        break;
      case "Days":
        MSPerDivArr.push(DateLogic.GetDayMS());
        CurrentTime = DateLogic.RoundDownDay(DateRange.StartingTime);
        if (SecondPartStartingTime)
          SecondPartStartingTime = DateLogic.RoundDay(SecondPartStartingTime);
        break;
      case "Hours":
        MSPerDivArr.push(DateLogic.GetHrMS());
        CurrentTime = DateLogic.RoundDownHour(DateRange.StartingTime);
        if (SecondPartStartingTime)
          SecondPartStartingTime = DateLogic.RoundHour(SecondPartStartingTime);
        break;
    }
    let MSPerDivIndex = 0;
    while (CurrentTime.getTime() < EndTime.getTime()) {
      let NewTimeDiv = CreateTimeDiv(CurrentTime, new Date(CurrentTime.getTime() + MSPerDivArr[MSPerDivIndex]), Scope, Scale, IsBigger);
      if (IsBigger)
        BiggerDatesContainer.current.appendChild(NewTimeDiv);
      else
        DatesContainer.current.appendChild(NewTimeDiv);
      CurrentTime = new Date(CurrentTime.getTime() + MSPerDivArr[MSPerDivIndex]);
      MSPerDivIndex++;
      if (MSPerDivIndex >= MSPerDivArr.length)
        MSPerDivIndex = 0;
    }
    if (!SecondPartStartingTime)
      return;
    while (SecondPartStartingTime.getTime() < DateRange.EndTime.getTime()) {
      let NewTimeDiv = CreateTimeDiv(SecondPartStartingTime, new Date(SecondPartStartingTime.getTime() + MSPerDivArr[MSPerDivIndex]), Scope, Scale, IsBigger);
      if (IsBigger)
        BiggerDatesContainer.current.appendChild(NewTimeDiv);
      else
        DatesContainer.current.appendChild(NewTimeDiv);
      SecondPartStartingTime = new Date(SecondPartStartingTime.getTime() + MSPerDivArr[MSPerDivIndex]);
      MSPerDivIndex++;
      if (MSPerDivIndex >= MSPerDivArr.length)
        MSPerDivIndex = 0;
    }
  }

  const FixDivDimensions = (Scale, NewRootDate) => {
    let RootDate = Transform.RootDate;
    if (NewRootDate)
      RootDate = NewRootDate;
    for (let i = 0; i < DatesContainer.current.children.length; i++) {
      let Dimensions = DateLogic.CalcDimensions(RootDate, DatesContainer.current.children[i].StartingTime, DatesContainer.current.children[i].EndTime, Scale, TaskListView);
      DatesContainer.current.children[i].style.width = Dimensions.Width + "px";
      DatesContainer.current.children[i].style.left = Dimensions.Left + "px";
    }
    for (let i = 0; i < BiggerDatesContainer.current.children.length; i++) {
      let Dimensions = DateLogic.CalcDimensions(RootDate, BiggerDatesContainer.current.children[i].StartingTime, BiggerDatesContainer.current.children[i].EndTime, Scale, TaskListView);
      BiggerDatesContainer.current.children[i].style.width = Dimensions.Width + "px";
      BiggerDatesContainer.current.children[i].style.left = Dimensions.Left + "px";
    }
    for (let i = 0; i < TaskRowsContainer.current.children.length; i++) {
      for (let j = 0; j < TaskRowsContainer.current.children[i].children.length; j++) {
        let Dimensions = DateLogic.CalcDimensions(RootDate, TaskRowsContainer.current.children[i].children[j].StartingTime, TaskRowsContainer.current.children[i].children[j].EndTime, Scale, TaskListView);
        TaskRowsContainer.current.children[i].children[j].style.width = Dimensions.Width + "px";
        TaskRowsContainer.current.children[i].children[j].style.left = Dimensions.Left + "px";
      }
    }
    let TodayLineDimensions = DateLogic.CalcDimensions(RootDate, new Date(), new Date(), Scale, TaskListView);
    TodayLine.current.style.left = TodayLineDimensions.Left + "px";
  }
  
  useEffect(() => {
    if (RenderCount.current[0] == 0) {
      let TodayLineDimensions = DateLogic.CalcDimensions(Transform.RootDate, new Date(), new Date(), Transform.Scale, TaskListView);
      TodayLine.current.style.left = TodayLineDimensions.Left + "px";
      LastScrollLeft = HorizScrollLen/2;
      ScrollerContainer.current.scrollLeft = HorizScrollLen/2;
      ScrollerContainer.current.scrollTop = HorizScrollLen/2;
      RenderCount.current = [RenderCount.current[0] + 1, RenderCount.current[1]];
    }
  }, [])

  const SetSearchFunc = (SearchArg, NewWorkSessions) => { //Exists cause we don't want to spam call this from a reference to it in an HTML element
    if (!NewWorkSessions)
      NewWorkSessions = WorkSessions;
    SetSearch({...Search, String: SearchArg});
    ResetRows(UpdateTaskSearch(SearchArg, TaskListView.ShowCompleted), NewWorkSessions);
  }

  const ResetRows = (TaskList, NewWorkSessions) => {
    RemoveAllTaskRows();
    CreateTaskRows(TaskList);
    CreateAllTaskWorkDivs(TaskList, Transform.Scale, true, NewWorkSessions);
  }
  
  useEffect(() => {
    let NewWorkSessions = TaskScheduler.GetTasksWorkSessions(LoadedTasks)
    SetWorkSessions(NewWorkSessions);
    SetSearchFunc(Search.String, NewWorkSessions);
    CreateTimeDivs(Transform.Scope, Transform.Scale, false);
    CreateTimeDivs(TaskScheduler.GetParentScope(Transform.Scope), Transform.Scale, true);
    RenderCount.current = [RenderCount.current[0], RenderCount.current[1] + 1];
    if (TaskLegendsContainer.current.getBoundingClientRect().height > ScrollerContainer.current.getBoundingClientRect().height)
      ScrollerElem.current.style.height = TaskLegendsContainer.current.getBoundingClientRect().height + 1000 + "px";
    else
      ScrollerElem.current.style.height = ScrollerContainer.current.getBoundingClientRect().height + "px";
  }, [LoadedTasks, UserCapacity])

  useEffect(() => {
    SetSearchFunc(Search.String);
  }, [TaskListView])
  
   useEffect(() => {
    for (const [Key, Value] of Object.entries(DisplayedTasksRefs.current))
      DisplayedTasksRefs.current[Key](LoadedCategories);
  }, [LoadedCategories])

  const FixScopes = (NewScale) => {
    let ObjToAppend = {};
    let NewFixedScale = 1.5 * (NewScale ** 5.7) + 0.04;
    let AppliedNewScope = false;
    if (NewFixedScale < 0.5) {
      if (Transform.Scope != "Months") {
        RemoveAllTimeDivs();
        CreateTimeDivs("Months", NewFixedScale, false);
        CreateTimeDivs(TaskScheduler.GetParentScope("Months"), NewFixedScale, true);
        ObjToAppend = {Scope: "Months"};
        AppliedNewScope = true;
      }
    } else if (NewFixedScale < 8) {
      if (Transform.Scope != "Days") {
        RemoveAllTimeDivs();
        CreateTimeDivs("Days", NewFixedScale, false);
        CreateTimeDivs(TaskScheduler.GetParentScope("Days"), NewFixedScale, true);
        ObjToAppend = {Scope: "Days"};
        AppliedNewScope = true;
      }
    } else {
      if (Transform.Scope != "Hours") {
        RemoveAllTimeDivs();
        CreateTimeDivs("Hours", NewFixedScale, false);
        CreateTimeDivs(TaskScheduler.GetParentScope("Hours"), NewFixedScale, true);
        ObjToAppend = {Scope: "Hours"};
        AppliedNewScope = true;
      }
    }
    if (!AppliedNewScope) {
      RemoveAllTimeDivsOffRange(NewFixedScale);
      RemoveAllTaskDivsOffRange(NewFixedScale);
      CreateTimeDivs(Transform.Scope, NewFixedScale, false);
      CreateTimeDivs(TaskScheduler.GetParentScope(Transform.Scope), NewFixedScale, true);
    }
    CreateAllTaskWorkDivs(LoadedTasks, NewFixedScale, true, WorkSessions);
    FixDivDimensions(NewFixedScale);
    SetTransform(Object.assign({...Transform, Scale: NewFixedScale}, ObjToAppend));
    ZoomSliderValue.current = NewScale;
  }

  useEffect(() => {
    let NewRootDate;
    if (TaskListView.TaskTableClass == "TaskTable")
      NewRootDate = new Date(Transform.RootDate.getTime() + (DateLogic.GetDayMS()/(Transform.Scale)) * ((TaskScheduler.RemToPixels(74.6 - 21) + 122 - 28)/(2*TaskScheduler.GetDayWidth())));
    else
      NewRootDate = new Date(Transform.RootDate.getTime() + (DateLogic.GetDayMS()/(Transform.Scale)) * ((TaskScheduler.RemToPixels(21 - 74.6) - 122 + 28)/(2*TaskScheduler.GetDayWidth())));
    Transform.RootDate = NewRootDate;
    RemoveAllTimeDivsOffRange(Transform.Scale);
    RemoveAllTaskDivsOffRange(Transform.Scale);
    FixDivDimensions(Transform.Scale, NewRootDate);
    CreateTimeDivs(Transform.Scope, Transform.Scale, false);
    CreateTimeDivs(TaskScheduler.GetParentScope(Transform.Scope), Transform.Scale, true);
    CreateAllTaskWorkDivs(LoadedTasks, Transform.Scale, true, WorkSessions);
  }, [TaskListView.TaskTableClass])
  

  const HandleHeaderScroll = (Event) => {
    TLScroll.current.scrollTop = Event.target.scrollTop;
  }

  const HandleInvisScroll = (Event) => {
    let HorizScrollDiff = 0;
    if (LastScrollLeft)
      HorizScrollDiff = Event.target.scrollLeft - LastScrollLeft;
    if (Event.target.scrollLeft > HorizScrollLen * 0.8 || Event.target.scrollLeft < HorizScrollLen * 0.2)
      Event.target.scrollLeft = HorizScrollLen/2;
    TLScroll.current.scrollTop = Event.target.scrollTop;
    HeaderScroll.current.scrollTop = Event.target.scrollTop;
    ScrollerContainer.current.scrollTop = TLScroll.current.scrollTop;
    LastScrollLeft = Event.target.scrollLeft;
    Transform.RootDate = new Date(Transform.RootDate.getTime() + (DateLogic.GetDayMS()/(Transform.Scale)) * (HorizScrollDiff/TaskScheduler.GetDayWidth()));
    RemoveAllTimeDivsOffRange(Transform.Scale);
    RemoveAllTaskDivsOffRange(Transform.Scale);
    FixDivDimensions(Transform.Scale);
    CreateTimeDivs(Transform.Scope, Transform.Scale, false);
    CreateTimeDivs(TaskScheduler.GetParentScope(Transform.Scope), Transform.Scale, true);
    CreateAllTaskWorkDivs(LoadedTasks, Transform.Scale, true, WorkSessions);
  }
  
  const HandleFormChange = (Event) => {
    if (Event.target.name == "Scale") {
      FixScopes(Event.target.value);
    }
    else
    SetTransform({
      ...Transform, [Event.target.name]: Event.target.value
    });
  }

  return (
  <div style={{backgroundColor: "var(--BoxColor)", overflow: "hidden", position: "relative", width: "100%", height: "100%"}}>
    <div style={{width: "fit-content", backgroundColor: "var(--DarkOpaque)", display: "flex", flexDirection: "column", position: "absolute", right: "0px", padding: "10px", borderBottomLeftRadius: "15px", zIndex: "6"}}>
      <input className="Slider" ref={ZoomSlider} name="Scale" type="range" min="0" max="2" step="0.001" value={ZoomSliderValue.current} onChange={HandleFormChange}/>
    </div>
    <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "row"}}>
      <div id="Header" ref={HeaderField} style={{width: "fit-content", height: "100%", position: "relative", display: "flex", flexDirection: "column", zIndex: "6"}}>
        <div className="NoBorderWidth" style={{backgroundColor: "var(--BoxColor)", minHeight: "6rem", maxHeight: "6rem", display: 'flex', flexDirection: 'column', borderStyle: "solid", borderWidth: "0px 1px 1px 0px", zIndex: "6"}}>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: "10px"}}>
            {(TaskListView.ShowCompleted == true) ?
              (<button className="ButtonWithIcon" title="Hide completed tasks" onClick={HandleShowCompleted}>
              <BsFillCalendarCheckFill  size="3em"/>
              </button>
              ) : (
              <button className="ButtonWithIcon" title="Show completed tasks" onClick={HandleShowCompleted}>
              <BsCalendarCheck size="3em"/>
              </button>
              )}
              <EditVariableOnChange InputClassName="RoundedInputLong" Placeholder="Search for tasks..." InputType="text" InitialValue ="" UpdateVariable={SetSearchFunc} ButtonSubmitText="Search tasks"/>
              {(TaskListView.TaskTableClass == "TaskTable") ?
              (<button className="ButtonWithIcon" title="Collapse task fields" onClick={ChangeTaskList}>
              <MdOutlineArrowBackIosNew size="3em"/>
              </button>
              ) : (
              <button className="ButtonWithIcon" title="Show all task fields" onClick={ChangeTaskList}>
              <MdOutlineArrowForwardIos size="3em"/>
              </button>
              )}
          </div>
          <table className={TaskListView.TaskTableClass}>
            <thead>
              <tr>
                <th className="MiniTitle" style={{minWidth: "10.5rem", maxWidth: "10.5rem"}}>Task name</th>
                <th className="MiniTitle" style={{minWidth: "10.5rem", maxWidth: "10.5rem"}}>Progress</th>
                { (TaskListView.TaskTableClass == "TaskTable") ? (
                  <>           
                    <th className="MiniTitle" style={{minWidth: "10.5rem", maxWidth: "10.5rem"}}>Description</th> 
                    <th className="MiniTitle" style={{minWidth: "10.5rem", maxWidth: "10.5rem"}}>Category</th>
                    <th className="MiniTitle" style={{minWidth: "13rem", maxWidth: "13rem"}}>Start date</th>
                    <th className="MiniTitle" style={{minWidth: "13rem", maxWidth: "13rem"}}>Deadline</th> 
                    <th className="MiniTitle" style={{minWidth: "4rem", maxWidth: "4rem"}}>Duration</th>
                    <th className="MiniTitle" style={{minWidth: "6rem", maxWidth: "6rem"}}>Edit</th>     
                  </>
                ) :
                (
                  <>
                  </>
                )}
              </tr>
            </thead>
          </table>
        </div>
        <div className="NoBorderWidth" style={{height: "calc(100% - 6rem)", position: "relative", display: "flex", flexDirection: "row", backgroundColor: "var(--BoxColor)", borderStyle: "solid", borderWidth: "0px 1px 0px 0px"}}>      
          <div ref={HeaderScroll} onScroll={HandleHeaderScroll} className="NoBorderWidth" style={{overflowY: "scroll", overflowX: "hidden", width: "fit-content", height: "100%", position: "relative", backgroundColor: "var(--BoxColor)", display: "flex", flexDirection: "column"}}>
            <table ref={TaskLegendsContainer} className={TaskListView.TaskTableClass}>
              <tbody>
                {DisplayedTasks.Tasks}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div id="timeline" style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", position: "absolute"}}>
        <div ref={ScrollerContainer} style={{left: (TaskListView.TaskTableClass == "TaskTableMini") ? "calc(21rem + 28px)" : "calc(74.6rem + 122px)", width: "100%", height: "100%", overflow: "scroll", position: "absolute", zIndex: "5"}} onScroll={HandleInvisScroll}>
          <div ref={ScrollerElem} style={{width: HorizScrollLen + "px", height: "1  px"}}></div>
        </div>
        <div style={{height: "100%", width: "100%", position: "absolute", left: "0px", top: "0px", zIndex: "4", pointerEvents: "none"}}>
          <div ref={TodayLine} className="TodayLine">

          </div>
        </div>
        <div style={{width: "100%", backgroundColor: "var(--BoxColor)", display: "flex", flexDirection: "row", height: "fit-content", borderTopLeftRadius: "10px", borderTopRightRadius: "10px"}}>
          <div style={{width: "100%", minHeight: "6rem", maxHeight: "6rem", backgroundColor: "var(--BoxColor)", display: "flex", flexDirection: "column", borderTopRightRadius: "30px"}}>
            <div ref={BiggerDatesContainer} className="NoBorderWidth" style={{height: "50%", position: "relative", backgroundColor: "var(--BoxColor)", borderStyle: "solid", borderWidth: "0px 0px 0px 0px", overflow: "hidden", borderTopRightRadius: "10px"}}>
              
            </div>
            <div ref={DatesContainer} className="NoBorderWidth" style={{height: "50%", position: "relative", backgroundColor: "var(--BoxColor)", borderStyle: "solid", borderWidth: "1px 0px 1px 0px", overflow: "hidden"}}>
            
            </div>
          </div>
        </div>
        <div ref={TLScroll} style={{width: "100%", overflow: "scroll", backgroundColor: "var(--BoxColor", height: "100%", position: "relative", display: "flex", flexDirection: "row", borderBottomRightRadius: "10px"}}>
          <div ref={TaskRowsContainer} className="NoBorderWidth" style={{width: "100%", height: "fit-content", position: "relative", borderBottomRightRadius: "0px", overflow: "hidden"}}>

          </div> 
        </div>
      </div>
    </div>
  </div>
  )
}
export default TimelineTaskList