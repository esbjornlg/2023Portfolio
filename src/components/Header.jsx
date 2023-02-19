import React from 'react'
import Navbar from './Navbar';
import langPack from '../lang.jsx';
const Header = ({Language, navTrigger, setNavTrigger}) => {
    const Lang = new langPack();
  return (
    <div id="mainPageHeader" className="flexColumn unclickable" style={{zIndex: 2, position: "fixed", width: "fit-content", height: "100%", marginLeft: "50px", padding: "40px 0px 40px 0px", transformOrigin: "left"}}>
    <div className="flexColumn unclickable">
      <h1 style={{pointerEvents: "auto", whiteSpace: "nowrap", marginTop: "0px"}}>Esbjörn Lyster Golawski</h1>
      <h3 style={{pointerEvents: "auto"}}>{Lang.titles.title[Language.lang]}</h3>
    </div>
    <Navbar Language={Language} navTrigger={navTrigger} setNavTrigger={setNavTrigger}/>
  </div>
  )
}

export default Header