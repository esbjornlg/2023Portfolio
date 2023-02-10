import React, { useState, useRef, useEffect } from 'react'
import langPack from '../lang.jsx'
import "../index.scss"

const Experience = ({Language, navTrigger}) => {
  const Lang = new langPack();
  const tabCont = useRef();
  const tabBtnCont = useRef();
  const [activeTab, setActiveTab] = useState(0);
  
  const switchTab = (tabNr) => {
    if (tabNr == activeTab)
      return;
    tabBtnCont.current.children[activeTab].classList.toggle("btnOn");
    setActiveTab(tabNr);
    tabBtnCont.current.children[tabNr].classList.toggle("btnOn");

  }

  return (
    <div id="experience" className="flexColumn page borderBox">
      <h2>{Lang.titles.info[Language.lang]}</h2>
      <div ref={tabBtnCont} className="flexRow link">
        <button className="link btnOn" onClick={() => switchTab(0)}>{Lang.titles.stack[Language.lang]}</button>
        <button className="link" onClick={() => switchTab(1)}>{Lang.titles.work[Language.lang]}</button>
        <button className="link" onClick={() => switchTab(2)}>{Lang.titles.education[Language.lang]}</button>
      </div>
      <div style={{width: "fit-content", minHeight: "300px"}}>
      {(activeTab == 0) ? (
        <div className="flexRow">
        <ul>
          <li>C++</li>
          <li>C#</li>
          <li>Python</li>
          <li>JavaScript</li>
          <li>TypeScript</li>
          <li>SQL</li>
          <li>React</li>
        </ul>
        <ul>
          <li>Angular</li>
          <li>.NET</li>
          <li>Git</li>
          <li>Bison</li>
          <li>Unreal Engine</li>
          <li>MS Office</li>
        </ul>
      </div>
      ) : (activeTab == 1) ? (
        <div>
          <ul>
            <li>{Lang.experience.PostNord2020.title[Language.lang]}, PostNord <p style={{fontSize: "20px"}}>{Lang.experience.PostNord2020.year}</p></li>
            <li>{Lang.experience.BOLD2019.title[Language.lang]}, Bold Printing <p style={{fontSize: "20px"}}>{Lang.experience.BOLD2019.year}</p></li>
          </ul>
        </div>
      ) : (
        <div>
        <ul>
          <li>{Lang.education.BTH2021.school[Language.lang]} <p style={{fontSize: "20px"}}>{Lang.education.BTH2021.year}</p></li>
        </ul>
      </div>
      )}
      </div>
    </div>
  )
}
export default Experience