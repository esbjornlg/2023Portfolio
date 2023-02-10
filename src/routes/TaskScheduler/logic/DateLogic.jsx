import TaskScheduler from "./TaskScheduler";

const DateLogic = {
  FormatDayHours: function FormatDayHours(Time) {
    let DueText = "";
    Time = Math.round(Time);
    DueText = Math.round(Time/24) + " days";
    if (Math.abs(Time) < 24) {
    DueText = Math.round(Time) + " hours";
    if (Math.abs(Time) < 2) {
        DueText = Math.round(Time) + " hour";
    }
    } else {
    if (Math.abs(Time/24) < 1.5) {
        DueText = Math.round(Time/24) + " day";
    }
    }
    return DueText; 
  },

  GetMonths: function GetMonths() {
    let Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return Months;
  },
  
  GetMonthStr: function GetMonthStr(MonthNumber) {
    let Months = this.GetMonths();
    return Months[MonthNumber - 1];
  },

  GetHoursOfADay: function GetHoursOfADay() {
    let FullHours = [
    "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
    "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
  ];
    return FullHours;
  },

  GetDaysInMonth: function GetDaysInMonth(TheDate) { 
    let Year = TheDate.getFullYear();
    let Month = TheDate.getMonth();
    return new Date(Year, Month + 1, 0).getDate();
  },

  GetCalendarFromYear: function GetCalendarFromYear(Year) {
    let Calendar = {};
    let Months = this.GetMonths();
    for (var i = 0; i < Months.length; i++) {
      Calendar[Months[i]] = this.GetDaysInMonth(Year, i+1);
    }
    return Calendar;
  },

  FormatDateWithHours: function FormatDateWithHours(DateVar) { 
    let YYYY, MM, DD, HH;
    YYYY = new Date(DateVar).getFullYear();
    MM = String(new Date(DateVar).getMonth() + 1);
    DD = String(new Date(DateVar).getDate());
    HH = String(new Date(DateVar).getHours());
    return YYYY + "-" + MM + "-" + DD + " " + HH + ":00:00";
  },

  FormatDate: function FormatDate(DateVar) { 
    let YYYY, MM, DD;
    YYYY = new Date(DateVar).getFullYear();
    MM = String(new Date(DateVar).getMonth() + 1);
    DD = String(new Date(DateVar).getDate());
    return YYYY + "-" + MM + "-" + DD;
  },

  GetHrMS: function GetHrMS() {
    return 1000 * 60 * 60;
  },

  GetDayMS: function GetDayMS() {
    return 1000 * 60 * 60 * 24;
  },

  GetYearMS: function GetYearMS(TheDate) {
    let CurrentYear = this.RoundDownYear(TheDate);
    let CurrentYearCopy = new Date(CurrentYear);
    let NextYear = new Date(CurrentYearCopy.setFullYear(CurrentYearCopy.getFullYear() + 1));
    let MSDiff = NextYear.getTime() - CurrentYear.getTime();
    return MSDiff;
  },

  RoundHour: function RoundHour(TheDate) {
    let TheDateCopy = new Date(TheDate);
    TheDateCopy.setMinutes(TheDateCopy.getMinutes() + 30);
    TheDateCopy.setMinutes(0, 0, 0)
    return TheDateCopy;
  },

  RoundDownHour: function RoundDownHour(TheDate) {
    let TheDateCopy = new Date(TheDate);
    TheDateCopy.setMinutes(0, 0, 0)
    return TheDateCopy;
  },


  RoundDay: function RoundDay(TheDate) {
    let TheDateCopy = new Date(TheDate);
    TheDateCopy.setHours(TheDateCopy.getHours() + 12);
    TheDateCopy.setHours(0, 0, 0, 0);
    return TheDateCopy;
  },

  RoundDownDay: function RoundDownDay(TheDate) {
    let TheDateCopy = new Date(TheDate);
    TheDateCopy.setHours(0, 0, 0, 0);
    return TheDateCopy;
  },

  RoundMonth: function RoundMonth(TheDate) {
    let DayCount = this.GetDaysInMonth(TheDate);
    let TheDateCopy = new Date(TheDate);
    TheDateCopy = new Date(TheDateCopy.getTime() + this.GetDayMS() * DayCount/2);
    TheDateCopy.setDate(1);
    TheDateCopy.setHours(0, 0, 0, 0);
    return TheDateCopy;
  },

  RoundDownMonth: function RoundMonth(TheDate) {
    let TheDateCopy = new Date(TheDate);
    TheDateCopy.setDate(1);
    TheDateCopy.setHours(0, 0, 0, 0);
    return TheDateCopy;
  },

  RoundDownYear: function RoundMonth(TheDate) {
    let TheDateCopy = new Date(TheDate);
    TheDateCopy.setMonth(0, 1)
    TheDateCopy.setHours(0, 0, 0, 0);
    return TheDateCopy;
  },

  RoundYear: function RoundMonth(TheDate) {
    let CurrentYear = this.RoundDownYear(TheDate);
    let CurrentYearCopy = new Date(CurrentYear);
    let NextYear = new Date(CurrentYearCopy.setFullYear(CurrentYearCopy.getFullYear() + 1));
    let MSDiff = NextYear.getTime() - CurrentYear.getTime();
    let TheDateCopy = new Date(TheDate.getTime() + MSDiff/2);
    TheDateCopy = this.RoundDownYear(TheDateCopy);
    return TheDateCopy;
  },

  CalcDimensions: function CalcWidth(RootTime, StartTime, EndTime, Scale, TaskListView) {
    let RootStartDiff = StartTime.getTime() - RootTime.getTime();
    let DatesDiffMS = EndTime.getTime() - StartTime.getTime();
    let Width = (DatesDiffMS * Scale / this.GetDayMS()) * TaskScheduler.GetDayWidth();
    let Left = (RootStartDiff * Scale / this.GetDayMS()) * TaskScheduler.GetDayWidth() + TaskScheduler.GetHorizOffset(TaskListView);
    return {Width: Width, Left: Left}
  }

}
export default DateLogic