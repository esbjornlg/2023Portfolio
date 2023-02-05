import React, {useState, useRef, useEffect} from 'react';
import IfChecker from '../logic/IfChecker'

const SelectList = ({LoadedList, PreferredElement, Disabled, ParentSetState, ParentStateParam, ParentState}) => {
  let InitialOption = "";
  if (PreferredElement) 
    InitialOption = PreferredElement;
  if (typeof(PreferredElement) == "object")
    InitialOption = PreferredElement.Text;
  
  const [RenderCount, SetRenderCount] = useState(0);

  const [SelectOption, SetSelectOption] = useState({
    Option: InitialOption
  });

  const SelectRef = useRef();

  const FindStyle = (OptionText) => {
    let TheObject = IfChecker.ListHasPairOrVariable(LoadedList, "Text", OptionText);
    let NewStyle = {};
    if (typeof(TheObject) == "object") {
      for (const [Key, Value] of Object.entries(TheObject)) {
        if (Key != "Text")
          NewStyle[Key] = Value;
      }
    } 
    return NewStyle;
  }

  const [Style, SetStyle] = useState({})

  const CreateOption = (Option) => {
    if (!Option)
      Option = "";
    let OptionElement = document.createElement("option");
    if (typeof(Option) == "object") {
      OptionElement.text = Option.Text;
      for (const [Key, Value] of Object.entries(Option)) {
        if (Key != "Text")
          OptionElement.style[Key] = Value;
      }
    } else {
      OptionElement.text = Option;
    }
    return OptionElement;
  }

  const CreateOptions = () => {
    var Select = SelectRef.current;
    let LoadedListWithPrefElem = [...LoadedList];
    if (PreferredElement) {
      if (!IfChecker.ListHasPairOrVariable(LoadedListWithPrefElem, "Text", PreferredElement)) 
        LoadedListWithPrefElem.push(PreferredElement);
    }
    for (let i = Select.options.length; i >= 0; i--) {
      if (Select.options[i]) {
        if (!IfChecker.ListHasPairOrVariable(LoadedListWithPrefElem, "Text", Select.options[i].value))
          Select.remove(i)
      }
    }
    for (let i = 0; i < LoadedListWithPrefElem.length; i++) {
      let IncludesNew = false;
      for (let j = 0; j < Select.options.length; j++) {
        if (Select.options[j]) {
          if (Select.options[j].value == IfChecker.CheckIfStrOrObj(LoadedListWithPrefElem[i], "Text")) {
            IncludesNew = true;
            break;
          }
        }
      }
      if (!IncludesNew)
        Select.add(CreateOption(LoadedListWithPrefElem[i]));
    }
    ParentSetState({...ParentState, [ParentStateParam]: Select.value});
  }

  useEffect(() => {
    if (RenderCount == 0) {
      let FirstOption = "";
      if (PreferredElement)
        FirstOption = IfChecker.CheckIfStrOrObj(PreferredElement, "Text")
      else {
        if (LoadedList)
          FirstOption = IfChecker.CheckIfStrOrObj(LoadedList[0], "Text")
      }
      SetStyle(FindStyle(FirstOption));
    }
  }, [LoadedList, PreferredElement]);

  const HandleFormChange = (Event) => {
    SetSelectOption({
      Option: Event.target.value
    });
    SetStyle(FindStyle(Event.target.value));
    ParentSetState({...ParentState, [ParentStateParam]: Event.target.value});
  }

//RENDER VVVVVVVVVVVVVVVVVVVVVVVVVVV
  return (
        <select style={Style} ref={SelectRef} value={SelectOption.Option} disabled={Disabled} onChange={HandleFormChange}>
        </select>
  )
}

export default SelectList