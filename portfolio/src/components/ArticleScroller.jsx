import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import langPack from '../lang.jsx'
import styling from '../logic/styling'
const ArticleScroller = ({Articles, Language}) => {
  const ArticleScroller = useRef();

  const handleScroll = () => {
    for (let i = 0; i < ArticleScroller.current.children.length; i++) {
      const completion = styling.getElemScrollCompletion(ArticleScroller.current.children[i], ArticleScroller.current);
      ArticleScroller.current.children[i].style.filter = "blur(" + (1 - completion)*3 + "px)";
      ArticleScroller.current.children[i].style.opacity = completion;
    }
  }

  return (
    <div ref={ArticleScroller} onScroll={handleScroll} className="flexColumn borderBox" style={{width: "100%", height: "400px", overflowY: "scroll", scrollSnapType: "y mandatory"}}>
      {Articles.map((article, index) => (
        <div key={"Article" + index} className="flexRow borderBox article" style={{justifyContent: "space-evenly", alignItems: "end", width: "100%", minHeight: "400px", padding: "20px", scrollSnapAlign: "start"}}>
          <div className="flexColumn borderBox article" style={{justifyContent: "center", width: "55%", height: "100%", padding: "10px 20px 20px 20px", borderWidth: "0px"}}>
            <div className="flexRow" style={{alignItems: "start"}}>
              <h3 style={{fontSize: "30px", marginRight: "10px"}}>{article.title[Language.lang]}</h3>
              <p style={{fontSize: "30px"}}>{article.year}</p>
            </div>
              <p>{article.p[Language.lang]}</p>
          </div>
          <div className="flexColumn" style={{alignItems: "center", width: "40%", height: "100%", maxHeight: "calc(var(--articleHeight))"}}>
            {(article.link) ? (
              <Link to="/projects/taskscheduler" style={{width: "100%"}}>
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