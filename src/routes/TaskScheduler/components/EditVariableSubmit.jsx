import React, {useState} from 'react'

const EditVariableSubmit = ({InputClassName, InputStyle, Placeholder, InputType, InitialValue, UpdateVariable, ButtonSubmitText, StepValue, MinValue, MaxValue, Suffix}) => {
    const [FormText, SetFormText] = useState({
        Text: InitialValue
    });

    const HandleFormTextChange = (Event) => {
        SetFormText({Text: Event.target.value});
    }

    const HandleFormSubmit = (Event) => {
    Event.preventDefault();
    UpdateVariable(FormText.Text);
    }

//RENDER VVVVVVVVVVVVVVVVVVVVVVVVVVV
    return (
    <>
    <form onSubmit={HandleFormSubmit}>
      <div style={{marginTop: "7px"}}>
        <input className={InputClassName} style={InputStyle} type={InputType} placeholder={Placeholder} step={StepValue} min={MinValue} max={MaxValue} value={FormText.Text} onChange={HandleFormTextChange}/>
        <div style= {{paddingTop: "7px", fontSize: "1.1em"}}>{Suffix}</div>
      </div>
      <div style={{display: "flex", justifyContent: "flex-start", marginBottom: "7px"}}>
        <button type="submit">{ButtonSubmitText}</button>
      </div>
    </form>
    </>
  )
}

export default EditVariableSubmit