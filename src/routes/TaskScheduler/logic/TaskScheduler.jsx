import LSManager from './LSManager'
import DateLogic from './DateLogic';

const TaskScheduler = {

  CalcWorkDayLength: function CalcWorkDayLength(WorkStart, WorkEnd) {
    let WorkDayLength = WorkEnd - WorkStart;
    if (WorkDayLength < 0)
      WorkDayLength = 24 + WorkDayLength;
    if (WorkDayLength == 0)
      WorkDayLength = 24;
    return WorkDayLength;
	},

  GetSessionsLengthSum: function GetSessionLengthSum(Sessions) {
    let LengthSum = 0;
    for (let i = 0; i < Sessions.length; i++)
      LengthSum = LengthSum + (Sessions[i].EndTime.getTime() - Sessions[i].StartingTime.getTime())/(1000 * 3600);
    return LengthSum;
	},

  GetFirstSessionIndexAfterDate: function GetFirstSessionIndexAfterTime(Sessions, TheDate) {
    for (let i = 0; i < Sessions.length; i++) {
      if ((Sessions[i].StartingTime.getTime() <= TheDate.getTime() && Sessions[i].EndTime.getTime() > TheDate.getTime()) || Sessions[i].EndTime.getTime() > TheDate.getTime())
        return i;
    }
    return Sessions.length;
	},

  CompareDeadlines: function CompareDeadlines(Elem1, Elem2) {
    if (Elem1.Deadline < Elem2.Deadline )
      return -1;
    if (Elem1.Deadline > Elem2.Deadline )
      return 1;
    return 0;
  },

  CompareStartTimes: function CompareStartTimes(Elem1, Elem2) {
    if (Elem1.StartingTime < Elem2.StartingTime )
      return -1;
    if (Elem1.StartingTime > Elem2.StartingTime )
      return 1;
    return 0;
  },

  FindUnoccupiedSessions: function FindUnoccupiedSessions(OccupiedDates, TheDate, WorkStart, WorkEnd) {
    let StartingTime = new Date(new Date(TheDate + " 00:00:00").getTime() + 3600 * 1000 *  WorkStart); //ANVÄND DENNA METOD FÖR ATT FORMATERA DATUM TILL RÄTT TIDSZON
    let EndTime = new Date(StartingTime.getTime() + 3600 * 1000 * this.CalcWorkDayLength(WorkStart, WorkEnd));
    if (!OccupiedDates[TheDate])
      return [{StartingTime: StartingTime, EndTime: EndTime}];
    let UnoccupiedSessions = [];
    for (let i = 0; i < OccupiedDates[TheDate].length; i++) {
      if (OccupiedDates[TheDate][i].StartingTime.getTime() > StartingTime.getTime() ) {
        if (StartingTime >= EndTime)
          break;
        if (OccupiedDates[TheDate][i].StartingTime > EndTime) {
          UnoccupiedSessions.push({StartingTime: StartingTime, EndTime: EndTime});
          StartingTime = EndTime;
          break;
        } else
          UnoccupiedSessions.push({StartingTime: StartingTime, EndTime: OccupiedDates[TheDate][i].StartingTime})
      }
      StartingTime = OccupiedDates[TheDate][i].EndTime;
    }
    if (StartingTime.getTime() < EndTime.getTime()) {
      UnoccupiedSessions.push({StartingTime: StartingTime, EndTime: EndTime})
    }
    return UnoccupiedSessions;
  },

  OccupySessions: function OccupySessions(OccupiedDates, TheDate, Sessions) {
    if (!OccupiedDates[TheDate]) {
      Sessions.sort(this.CompareStartTimes)
      OccupiedDates[TheDate] = Sessions;
      return OccupiedDates[TheDate];
    } else {
      OccupiedDates[TheDate] = [...OccupiedDates[TheDate], ...Sessions]
      OccupiedDates[TheDate].sort(this.CompareStartTimes);
      return OccupiedDates[TheDate];
    }
  },

  CheckDue: function CheckDue(Deadline, StartingTime, EndTime) {
    let NewWorkSessions = [];
    let IsDue = false;
    if (StartingTime.getTime() < Deadline.getTime() && Deadline.getTime() < EndTime) {
      NewWorkSessions.push({
        StartingTime: StartingTime,
        EndTime: Deadline,
        IsDue: false
      });
      NewWorkSessions.push({
        StartingTime: Deadline,
        EndTime: EndTime,
        IsDue: true
      });
    } else {
      if (Deadline.getTime() <= StartingTime.getTime())
        IsDue = true;
      NewWorkSessions.push({
        StartingTime: StartingTime,
        EndTime: EndTime,
        IsDue: IsDue
      });
    }
    return NewWorkSessions;
  },

  CreateWorkSessions: function CreateWorkSessions(TheDate, UnoccupiedSessions, HoursLeft, StartingTime, Deadline) {
    let WorkSessions = [];
    let HoursToDedicate = HoursLeft;
    let UnoccupiedSessionIndex = this.GetFirstSessionIndexAfterDate(UnoccupiedSessions, StartingTime);
    let CurrentHoursUnoccupied = 0;
    if (UnoccupiedSessionIndex < UnoccupiedSessions.length) {
      if (StartingTime.getTime() - UnoccupiedSessions[UnoccupiedSessionIndex].StartingTime.getTime() >= 0)
      CurrentHoursUnoccupied = this.GetSessionsLengthSum([UnoccupiedSessions[UnoccupiedSessionIndex]]) - (StartingTime.getTime() - UnoccupiedSessions[UnoccupiedSessionIndex].StartingTime.getTime())/(1000 * 3600);
      else
      CurrentHoursUnoccupied = this.GetSessionsLengthSum([UnoccupiedSessions[UnoccupiedSessionIndex]]);
    }
    if (CurrentHoursUnoccupied <= 0)
    return {WorkSessions: undefined, HoursLeft: HoursToDedicate}
    while (HoursToDedicate && UnoccupiedSessionIndex < UnoccupiedSessions.length) {
      let NewStartingTime = new Date(UnoccupiedSessions[UnoccupiedSessionIndex].StartingTime.getTime() + 3600 * 1000 * (this.GetSessionsLengthSum([UnoccupiedSessions[UnoccupiedSessionIndex]]) - CurrentHoursUnoccupied));
      let NewEndTime = new Date(UnoccupiedSessions[UnoccupiedSessionIndex].StartingTime.getTime() + 3600 * 1000 * (this.GetSessionsLengthSum([UnoccupiedSessions[UnoccupiedSessionIndex]]) - CurrentHoursUnoccupied + HoursToDedicate));
      if (CurrentHoursUnoccupied >= HoursToDedicate) {
        WorkSessions = [...WorkSessions, ...this.CheckDue(Deadline, NewStartingTime, NewEndTime)];
        CurrentHoursUnoccupied = CurrentHoursUnoccupied - HoursToDedicate;
        HoursToDedicate = 0;
      } else {
        WorkSessions = [...WorkSessions, ...this.CheckDue(Deadline, NewStartingTime, UnoccupiedSessions[UnoccupiedSessionIndex].EndTime)];
        HoursToDedicate =  HoursToDedicate - CurrentHoursUnoccupied;
        UnoccupiedSessionIndex++;
        if (UnoccupiedSessionIndex < UnoccupiedSessions.length)
          CurrentHoursUnoccupied = this.GetSessionsLengthSum([UnoccupiedSessions[UnoccupiedSessionIndex]]);
      }
    }
    return {WorkSessions: WorkSessions, HoursLeft: HoursToDedicate};
  },

	GetTasksWorkSessions: function GetTasksWorkSessions(LoadedTasks) {
    let WorkStart = parseInt(LSManager.GetVariable("UserCapacityStart").substring(0, 2));
    let WorkEnd = parseInt(LSManager.GetVariable("UserCapacityEnd").substring(0, 2));
    let AllTaskHours = []; //Lista med alla tasks som objekt där en key är HoursLeft
    let OccupiedDates = {}; //"2022-10-10": [{StartingTime: new Date("2022-10-10 00:00:00"), EndTime: new Date("2022-10-10 17:00:00")}]
    for (let i = 0; i < LoadedTasks.length; i++) {
      AllTaskHours.push({
        Id: LoadedTasks[i].Id,
        StartingTime: new Date(LoadedTasks[i].StartingTime),
        Deadline: new Date(LoadedTasks[i].Deadline),
        HoursLeft: LoadedTasks[i].EstDuration,
        WorkSessions: []
      })
    }
    AllTaskHours.sort(this.CompareDeadlines)
    for (let i = 0; i < AllTaskHours.length; i++) {
      let CurrentDate = AllTaskHours[i].StartingTime; //StartingTime är correct
      CurrentDate = new Date(CurrentDate.getTime() - 86400000);
      while (AllTaskHours[i].HoursLeft > 0) {
        CurrentDate = DateLogic.FormatDate(CurrentDate);
        let UnoccupiedSessions = this.FindUnoccupiedSessions(OccupiedDates, CurrentDate, WorkStart, WorkEnd);
        if (UnoccupiedSessions.length > 0) {
          let NewWorkSessions = this.CreateWorkSessions(CurrentDate, UnoccupiedSessions, AllTaskHours[i].HoursLeft, AllTaskHours[i].StartingTime, AllTaskHours[i].Deadline);
          if (NewWorkSessions.WorkSessions)
            AllTaskHours[i].WorkSessions = [...AllTaskHours[i].WorkSessions, ...NewWorkSessions.WorkSessions];
          AllTaskHours[i].HoursLeft = NewWorkSessions.HoursLeft;
          if (NewWorkSessions.WorkSessions) {
            if (OccupiedDates[CurrentDate])
              OccupiedDates[CurrentDate] = [...OccupiedDates[CurrentDate], ...NewWorkSessions.WorkSessions];
            else
              OccupiedDates[CurrentDate] = NewWorkSessions.WorkSessions;
            OccupiedDates[CurrentDate].sort(this.CompareStartTimes);
          }
        }
        CurrentDate = new Date(new Date(CurrentDate).getTime() + 86400000);
      }
    }
    return {AllTaskHours: AllTaskHours, OccupiedDates: OccupiedDates};
	},

  GetParentScope: function GetParentScope(Scope) {
    switch (Scope) {
      case "Months":
        return "Years";
      case "Days":
        return "Months";
      case "Hours":
        return "Days";
    }
  },

  GetDayWidth: function GetDayWidth() {
    return 70;
	},

  GetDefaultDateRange: function GetDefaultDateRange() {
    return 30 * (window.innerWidth / 1920);
	},

  RemToPixels: function RemToPixels(Rem) {
    return Rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  },

  GetHorizOffset: function GetHorizOffset(TaskListView) {
    let PreferredOffset = (TaskScheduler.RemToPixels(21) + 28) + (window.innerWidth - (TaskScheduler.RemToPixels(21) + 28))/2;
    if (TaskListView.TaskTableClass == "TaskTable")
        PreferredOffset = (TaskScheduler.RemToPixels(74.6) + 122) + (window.innerWidth - (TaskScheduler.RemToPixels(74.6) + 122))/2;
    return PreferredOffset;
	},


}
export default TaskScheduler