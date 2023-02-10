import React from 'react'
import langPack from '../lang.jsx'
import ArticleScroller from '../components/ArticleScroller'

const Projects = ({Language, navTrigger}) => {
  const Lang = new langPack();
  
  return (
    <div id="projects"  className="flexColumn page borderBox" style={{height: "500px"}}>
      <h2>{Lang.titles.projects[Language.lang]}</h2>
      <ArticleScroller Articles={Lang.projects} Language={Language}/>
    </div>
  )
}

export default Projects