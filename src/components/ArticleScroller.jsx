import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import styling from '../logic/styling'
const ArticleScroller = ({Articles, Language}) => {
  const ArticleScroller = useRef();

  const handleScroll = () => {
    if (!ArticleScroller.current)
      return;
    for (let i = 0; i < ArticleScroller.current.children.length; i++) {
      const completion = styling.getElemScrollCompletion(ArticleScroller.current.children[i], ArticleScroller.current);
      ArticleScroller.current.children[i].style.filter = "blur(" + (1 - completion)*3 + "px)";
      ArticleScroller.current.children[i].style.opacity = completion + 0.4;
    }
  }
  handleScroll();

  return (
    <div ref={ArticleScroller} name="articleScroller" onScroll={handleScroll} className="flexColumn borderBox" style={{width: "100%", maxHeight: "430px", scrollSnapType: "y mandatory", overflowY: "scroll"}}>
      {Articles.map((article, index) => (
        <div key={"Article" + index} className="flexRow borderBox article" style={{justifyContent: "space-evenly", alignItems: "center", width: "100%", minHeight: "400px", padding: "20px", scrollSnapAlign: "start", marginBottom: "10px"}}>
          <div className="flexColumn" style={{justifyContent: "center", width: "55%", maxHeight: "100%"}}>
              <h3 style={{fontSize: "30px", marginRight: "10px", overflowWrap: "break-word", hyphens: "auto"}}>{article.title[Language.lang]} <p style={{fontSize: "20px"}}>{article.year}</p></h3>
            <div className="borderBox article" style={{padding: "10px 20px 20px 0px", borderWidth: "0px", overflowY: "scroll"}}>
                <p>{article.p[Language.lang]}</p>
            </div>
          </div>
          <div className="flexColumn" style={{justifyContent: "center", alignItems: "center", width: "40%", height: "100%", maxHeight: "calc(var(--articleHeight))"}}>
            {(article.link) ? (
              <Link className="flexColumn" to={article.link} style={{justifyContent: "center", width: "100%", textDecoration: "none"}}>
                <img src={article.image} style={{width: "100%", height: "70%", objectFit: "cover"}} />
                <h3 style={{fontSize: "30px", marginTop: "10px"}}>{article.tags.map((tag) => (tag + " "))}</h3>
              </Link>
            ) : (
              <>
                <img src={article.image} style={{width: "100%", height: "70%", objectFit: "cover"}} />
                <h3 style={{fontSize: "30px", marginTop: "10px"}}>{article.tags.map((tag) => (tag + " "))}</h3>
              </>
            )
            }
          </div>
        </div>
      ))}
    </div>
  )
}

export default ArticleScroller