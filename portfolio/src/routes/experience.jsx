import React, { useRef, useEffect } from 'react'
import langPack from '../lang.jsx'
import { motion } from "framer-motion"

const Experience = ({Language, navTrigger}) => {
  const Lang = new langPack();
  const Page = useRef();
  useEffect(() => {
    document.documentElement.style.setProperty("--routeX", Page.current.getBoundingClientRect().left);
    document.documentElement.style.setProperty("--routeY", Page.current.getBoundingClientRect().top);
  }, [Page, navTrigger])

  return (
    <motion.div ref={Page} className="flexColumn pageBox">
      <h2>{Lang.titles.info[Language.lang]}</h2>
      <p>
        {Lang.ps.info[Language.lang]}
      </p>
    </motion.div>
  )
}

export default Experience