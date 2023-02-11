import React from 'react'
import { Link } from "react-router-dom";
import '../index.scss'
import langPack from '../lang.jsx'

const Navbar = ({Language, navTrigger, setNavTrigger}) => {
  const Lang = new langPack();

  const handleLinkClick= (Event) => {
    setNavTrigger({trigger: navTrigger.trigger + 1, event: Event})
  }  

  return (
    <div id="navbar" className="flexColumn" style={{width: "fit-content"}}>
      <Link onClick={handleLinkClick} goto="about" className="link" to="/">{Lang.titles.home[Language.lang]}</Link>
      <Link onClick={handleLinkClick} goto="projects" className="link" to="/projects">{Lang.titles.projects[Language.lang]}</Link>
      <Link onClick={handleLinkClick} goto="experience" className="link" to="/experience">{Lang.titles.info[Language.lang]}</Link>
      <Link onClick={handleLinkClick} goto="contact" className="link" to="/contact">{Lang.titles.contact[Language.lang]}</Link>
    </div>
  )
}

export default Navbar