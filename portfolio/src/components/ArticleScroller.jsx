import React from 'react'
import langPack from '../lang.jsx'

const ArticleScroller = ({Articles, Language}) => {
  const Lang = new langPack();
  const handleScroll = () => {

  }

  return (
    <div className="articleScroller">
      {Articles.map((article) => (
        <div className="flexRow">
          <div className="flexColumn">
            <h2>{article.title[Language]}</h2>
            <p>{article.p[Language]}</p>
          </div>
          <img src={article.image} width= "100%"/>
        </div>
      ))}
    </div>
  )
}

export default ArticleScroller