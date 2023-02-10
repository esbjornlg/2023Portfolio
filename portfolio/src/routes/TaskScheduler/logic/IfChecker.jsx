const IfChecker = {
	FormTaskSubmit: function FormTaskSubmit(FormTask) {
		if (FormTask.Name == undefined || FormTask.Name == "") {
			alert("Task name has to be at least one character long!");
		// } else if (FormTask.Category == "") {
		// 	alert("Category can't be empty, please create a category.");
		} else if (FormTask.StartingTime == undefined || FormTask.StartingTime == 0) {
			alert("Starting time can't be left empty!");
		} else if (FormTask.Deadline == undefined || FormTask.Deadline == 0) {
			alert("Deadline can't be left empty!");
		} else if (Date.parse(FormTask.Deadline) <= Date.parse(FormTask.StartingTime)) {
			alert("Deadline has to be after starting date!");
		} else if (!(Number(FormTask.EstDuration)) && (Number(FormTask.EstDuration) !== 0)) {
			alert("Estimated duration must be a number!")
		} else if (FormTask.EstDuration == undefined || FormTask.EstDuration <= 0) {
				alert("Estimated duration must be longer than 0 hours!");
		} else {
			return true;
		}
		return false;
	},

	FindObjectWithKeyValue: function FindObjectWithKeyValue(ObjectList, Key, Value) {
		for (let i = 0; i < ObjectList.length; i++) {
			if (ObjectList[i][Key] == Value) 
				return ObjectList[i];
		}
		return {[Key]: Value};
	},

	ObjectListHasObject: function ObjectListHasObject(LoadedList, TheObject) {
		for (let i = 0; i < LoadedList.length; i++) {
      let EqualCount = 0;
      for (const [Key, Value] of Object.entries(LoadedList[i])) {
        if (TheObject[Key]) {
          if (TheObject[Key] == LoadedList[i][Key])
            EqualCount++;
        }
        if (EqualCount == Object.keys(TheObject).length)
          return true;
		  }
		}
    return false;
	},

 	 CheckIfStrOrObj: function CheckIfStrOrObj(Variable, PossibleObjKey) {
		if (typeof(Variable) == "object")
     	 return Variable[PossibleObjKey];
		else
			return Variable;
	},

 	 ListHasPairOrVariable: function ListHasPairOrVariable(LoadedList, TheKey, TheValue) {
		for (let i = 0; i < LoadedList.length; i++) {
      if (this.CheckIfStrOrObj(TheValue, TheKey) == this.CheckIfStrOrObj(LoadedList[i], TheKey))
				return(LoadedList[i]);
    }
	},
}
export default IfChecker