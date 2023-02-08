import React, { useRef, useEffect } from 'react'
import langPack from '../lang.jsx'
import { motion } from "framer-motion"
import "../index.scss"

const About = ({Language, navTrigger}) => {
  const Lang = new langPack();
  const Page = useRef();
  useEffect(() => {
    document.documentElement.style.setProperty("--routeX", Page.current.getBoundingClientRect().left);
    document.documentElement.style.setProperty("--routeY", Page.current.getBoundingClientRect().top);
    console.log()
  }, [Page, navTrigger])

  return (
    <motion.div
    initial={{}}
    animate={{}}
    exit={{}}
    transition={{duration: 2, ease: [0.25, 0.1, 0.25, 1]}}
    ref={Page} className="flexColumn pageBox">
      <h2>{Lang.titles.home[Language.lang]}</h2>
      <p>
        {Lang.ps.home[Language.lang]}
      </p>
    </motion.div>
  )
}

export default About