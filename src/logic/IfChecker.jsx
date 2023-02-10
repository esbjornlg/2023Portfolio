const IfChecker = {
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