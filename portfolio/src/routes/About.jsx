import React from 'react'
import langPack from '../lang.jsx'

const About = ({Language}) => {
  const Lang = new langPack();
  return (
    <div className="flexColumn pageBox">
      <h2>{Lang.titles.home[Language.lang]}</h2>
      <p>
        {Lang.ps.home[Language.lang]}
      </p>
    </div>
  )
}

export default About