import React, { useRef } from 'react'
import { Routes, Route, Outlet, Link, Router, BrowserRouter } from "react-router-dom";
import '../index.scss'
import langPack from '../lang.jsx'

const Navbar = ({Language}) => {
  const Lang = new langPack();
  // const handleMouseEnter = (Event) => {
  //   console.log("mouse entered:" + Event.target.offsetWidth);
  // }

  const handleMouseEnter = (Event) => {
  //   Event.target.addEventListener("mouseenter", () => {
  //     rayHoriz.style.opacity = 1;
  //     rayVert.style.opacity = 1;
  //   });
  
  //   Event.target.addEventListener("mouseleave", () => {
  //     rayHoriz.style.opacity = 0;
  //     rayVert.style.opacity = 0;
  //   });
  };

  return (
    <div className="flexRow" style={{padding: "0"}}>
      <div className="flexColumn navbarLinks" style={{padding: 0}}>
          {/* <BrowserRouter> */}
            <Link className="Link" to="/">{Lang.titles.home[Language.lang]}</Link>
            <Link className="Link" to="/projects">{Lang.titles.projects[Language.lang]}</Link>
            <Link className="Link" to="/experience">{Lang.titles.info[Language.lang]}</Link>
            <Link className="Link" to="/contact">{Lang.titles.contact[Language.lang]}</Link>
          {/* </BrowserRouter> */}
      </div>
    </div>
  )
}

export default Navbar