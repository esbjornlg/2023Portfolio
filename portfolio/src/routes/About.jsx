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
    console.log(`Comparing values: ${Page.current.getBoundingClientRect().left}, ${Page.current.getBoundingClientRect().top};`);
    if (navTrigger.event) {
      console.log(`${getComputedStyle(document.documentElement).getPropertyValue("--pageInX") - getComputedStyle(document.documentElement).getPropertyValue("--routeX")}, ${getComputedStyle(document.documentElement).getPropertyValue("--pageInY") - getComputedStyle(document.documentElement).getPropertyValue("--routeY")}`);

    }
  }, [Page, navTrigger])

  return (
    <motion.div
    initial={{clipPath: "circle(0 at calc(var(--pageInX)*1px - var(--routeX)*1px) calc(var(--pageInY)*1px - var(--routeY)*1px))"}}
    animate={{clipPath: "circle(120vw at calc(var(--pageInX)*1px - var(--routeX)*1px) calc(var(--pageInY)*1px - var(--routeY)*1px))"}}
    exit={{clipPath: "circle(0vw at calc(var(--pageInX)*1px - var(--routeX)*1px) calc(var(--pageInY)*1px - var(--routeY)*1px))"}}
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