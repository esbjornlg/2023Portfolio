import React, { useRef } from 'react'
import langPack from '../lang.jsx'

const ArticleScroller = ({Articles, Language}) => {
  const Lang = new langPack();
  const ArticleScroller = useRef();
  const bodyStyle = getComputedStyle(document.body)

  function fadeElement(element) {
    if (!element)
      return;
    const artScrollTop = ArticleScroller.current.getBoundingClientRect().top;
    const artScrollBottom = ArticleScroller.current.getBoundingClientRect().bottom;
    const artScrollMid = artScrollBottom - (artScrollBottom - artScrollTop)/2
    const elemTop = element.getBoundingClientRect().top;
    const elemBottom = element.getBoundingClientRect().bottom;
    const elemMid = elemBottom - (elemBottom - elemTop)/2
    let completion = 1 - Math.abs(elemMid - artScrollMid)/(Math.abs((artScrollBottom - artScrollTop)));
    element.style.filter = "blur(" + (1 - completion)*3 + "px)";
    element.style.opacity = completion;
  }
  const handleScroll = () => {
    for (let i = 0; i < ArticleScroller.current.children.length; i++)
      fadeElement(ArticleScroller.current.children[i]);
  }

  return (
    <div ref={ArticleScroller} onScroll={handleScroll} className="flexColumn borderBox" style={{width: "100%", height: "400px", overflowY: "scroll", scrollSnapType: "y mandatory"}}>
      {Articles.map((article, index) => (
        <div key={"Article" + index} className="flexRow article borderBox" style={{justifyContent: "space-evenly", width: "100%", minHeight: "400px", padding: "10px", alignItems: "center", scrollSnapAlign: "start"}}>
          <div className="flexColumn" style={{justifyContent: "start", width: "55%", height: "80%", paddingRight: "20px", backgroundColor: "var(--articleColor)"}}>
            <div className="flexRow" style={{alignItems: "start"}}>
              <h3 style={{fontSize: "30px", marginRight: "10px"}}>{article.title[Language.lang]}</h3>
              <p style={{fontSize: "30px"}}>{article.year}</p>
            </div>
              <p>{article.p[Language.lang]}</p>
          </div>
          <img src={article.image} style={{width: "40%", height: "fit-content", maxHeight: "var(--articleHeight)"}} />
        </div>
      ))}
    </div>
  )
}

export default ArticleScroller