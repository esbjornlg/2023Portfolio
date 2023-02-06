import React from 'react'
import langPack from '../lang.jsx'
import ArticleScroller from '../components/ArticleScroller'

const Projects = ({Language}) => {
  const Lang = new langPack();
  return (
    <div className="flexColumn pageBox">
      <h2>{Lang.titles.projects[Language.lang]}</h2>
      <ArticleScroller Articles={Lang.projects} Language={Language}/>
    </div>
  )
}

export default Projects