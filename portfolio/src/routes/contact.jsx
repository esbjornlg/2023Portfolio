import React, { useRef, useEffect } from 'react'
import langPack from '../lang.jsx'
import { motion } from "framer-motion"

const Contact = ({Language, navTrigger}) => {
  const Lang = new langPack();
  const Page = useRef();
  useEffect(() => {
    document.documentElement.style.setProperty("--routeX", Page.current.getBoundingClientRect().left);
    document.documentElement.style.setProperty("--routeY", Page.current.getBoundingClientRect().top);
    console.log(`Comparing values: ${Page.current.getBoundingClientRect().left}, ${Page.current.getBoundingClientRect().top};`);
    if (navTrigger.event) {
      console.log(`${getComputedStyle(document.documentElement).getPropertyValue("--pageInX") - getComputedStyle(document.documentElement).getPropertyValue("--routeX")}, ${getComputedStyle(document.documentElement).getPropertyValue("--pageInY") - getComputedStyle(document.documentElement).getPropertyValue("--routeY")}`);

    }
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