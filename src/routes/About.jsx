import React, { useRef } from 'react'
import { GrLinkedin, GrGithub } from "react-icons/gr"
import langPack from '../lang.jsx'
import "../index.scss"

const About = ({Language, navTrigger}) => {
  const Lang = new langPack();
  const Page = useRef();
  return (
    <div id="about" ref={Page} className="flexColumn page borderBox">
      <h2>{Lang.titles.home[Language.lang]}</h2>
      <div id="aboutContent" className="flexRow">
        <p>
          {Lang.ps.home[Language.lang]}
        </p>
        <div className="flexColumn">
          <img id="avatar" src="./avatar.png" style={{width: "300px", height: "300px", margin: "10px 0px 0px 10px"}} />        
          <div className="flexRow" style={{justifyContent: "center"}}>
            <a href="https://www.linkedin.com/in/esbj%C3%B6rn-lyster-golawski-76359a1b7/" target="_blank" className="article link externLink" ><GrLinkedin/></a>
            <a href="https://github.com/esbjornlg" target="_blank" className="article link externLink" ><GrGithub/></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About