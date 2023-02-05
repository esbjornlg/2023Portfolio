import React from 'react'
import langPack from '../lang.jsx'

const Projects = ({Language}) => {
  const Lang = new langPack();
  return (
    <div className="flexColumn pageBox">
      <h2>{Lang.titles.projects[Language.lang]}</h2>
    </div>
  )
}

export default Projects