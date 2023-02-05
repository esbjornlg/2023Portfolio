import React, { useRef } from 'react'
import { Routes, Route, Outlet, Link } from "react-router-dom";
import '../index.scss'
const Navbar = (rays) => {

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
        <div style={{position: "relative", top: "50px", width: "40px", height: "10px", backgroundColor: "var(--text1)"}}></div>
      <div className="flexColumn navbarLinks" style={{padding: 0}}>
        <Link onMouseEnter={handleMouseEnter} className="Link" to="/">Home</Link>
        <Link onMouseEnter={handleMouseEnter} className="Link" to="/projects">Projects</Link>
        <Link onMouseEnter={handleMouseEnter} className="Link" to="/experience">Experience</Link>
        <Link onMouseEnter={handleMouseEnter} className="Link" to="/contact">Contact</Link>
      <Outlet />
      </div>
    </div>
  )
}

export default Navbar