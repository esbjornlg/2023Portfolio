import React from 'react'
import langPack from '../lang.jsx'

const ArticleScroller = ({Articles}) => {
  
  const handleScroll = () => {

  }

  return (
    <div className="imageScroller">
      {Articles.map((article) => (
        <div className="flexRow">
          <div className="flexColumn">
            <h2>{article.title}</h2>
            <p>{article.p}</p>
          </div>
          <img src={article.image} />
        </div>
      ))}
    </div>
  )
}

export default ArticleScroller