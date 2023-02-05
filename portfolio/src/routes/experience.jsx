import React from 'react'
import langPack from '../lang.jsx'

const Experience = ({Language}) => {
  const Lang = new langPack();
  return (
    <div className="flexColumn pageBox">
      <h2>{Lang.titles.info[Language.lang]}</h2>
      <p>
        {Lang.ps.info[Language.lang]}
      </p>
    </div>
  )
}

export default Experience