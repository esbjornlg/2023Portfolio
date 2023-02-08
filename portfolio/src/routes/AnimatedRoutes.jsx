import React from 'react'
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom'
import About from './About';
import Projects from './Projects';
import Experience from './Experience';
import Contact from './Contact';
import { AnimatePresence } from "framer-motion"

function AnimatedRoutes({Language, navTrigger}) {
    const location = useLocation();

  return (
    <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<About Language={Language} navTrigger={navTrigger}/>}/>
            <Route path="/projects" element={<Projects style={{backgroundColor: "red"}} Language={Language} navTrigger={navTrigger}/>}/>
            <Route path="/experience" element={<Experience Language={Language} navTrigger={navTrigger}/>}/>
            <Route path="/contact" element={<Contact Language={Language} navTrigger={navTrigger}/>}/>
            <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes