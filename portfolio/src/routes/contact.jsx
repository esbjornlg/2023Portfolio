import React, { useRef, useEffect } from 'react'
import langPack from '../lang.jsx'
import { motion } from "framer-motion"

const Contact = ({Language, navTrigger}) => {
  const Lang = new langPack();
  const Page = useRef();
  useEffect(() => {
    document.documentElement.style.setProperty("--routeX", Page.current.getBoundingClientRect().left);
    document.documentElement.style.setProperty("--routeY", Page.current.getBoundingClientRect().top);
    document.documentElement.style.setProperty("--routeWidth", Page.current.getBoundingClientRect().offsetWidth);
    console.log(getComputedStyle(document.documentElement).getPropertyValue("--routeWidth"));
  }, [Page, navTrigger])
  
  return (
    <motion.div ref={Page} className="flexColumn pageBox">
        <h2>{Lang.titles.contact[Language.lang]}</h2>
        <p>
          {Lang.ps.contact[Language.lang]}
        </p>
    </motion.div>
  )
}

export default Contact