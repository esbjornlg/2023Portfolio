import React  from 'react'
import { GrMail } from "react-icons/gr"
import langPack from '../lang.jsx'

const Contact = ({Language, navTrigger}) => {
  const Lang = new langPack();
  return (
    <div id="contact" className="flexColumn page borderBox">
        <h2>{Lang.titles.contact[Language.lang]}</h2>
        <p>
          {Lang.ps.contact[Language.lang]}
        </p>
        <a href="mailto:esbjornlystergolawski@email.com" className="article link externLink" >{Lang.titles.emailMe[Language.lang]} <GrMail style={{marginBottom: "-3px"}}/></a>
    </div>
  )
}

export default Contact