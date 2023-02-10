import React, {useState} from 'react'

const EditVariableSubmit = ({InputClassName, InputStyle, Placeholder, InputType, InitialValue, UpdateVariable, StepValue, MinValue, MaxValue, Suffix}) => {
    const [FormText, SetFormText] = useState({
        Text: InitialValue
    });

    const HandleFormTextChange = (Event) => {
        SetFormText({Text: Event.target.value});
        UpdateVariable(Event.target.value);
    }

//RENDER VVVVVVVVVVVVVVVVVVVVVVVVVVV
    return (
    <div style={{display: "flex", flexDirection: "row", marginTop: "7px"}}>
      <input className={InputClassName} style={InputStyle} placeholder={Placeholder} type={InputType} step={StepValue} min={MinValue} max={MaxValue} value={FormText.Text} onChange={HandleFormTextChange}/>
      <div style= {{paddingTop: "7px", fontSize: "1.1em"}}>{Suffix}</div>
    </div>
  )
}

export default EditVariableSubmit