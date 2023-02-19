import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import '../App.scss';
import Header from '../components/Header';
import About from './About';
import Projects from './Projects';
import Experience from "./Experience";
import Contact from "./Contact";
import HTMLBG from '../components/Background/HTMLBG';
import LSManager from '../logic/LSManager';
import styling from '../logic/styling'

function MainSite({Links}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguage] = useState({lang: LSManager.getVarElseSet("language", LSManager.getBrowserLang())});
  const [navTrigger, setNavTrigger] = useState({trigger: 0, event: null});
  const langDiv = useRef();
  let AlteredLinks = Links;
  AlteredLinks[0] = "about";
  
  const [scrollEvent, setScrollEvent] = useState();

  const changeLang = (NewLanguage, Event) => {
    setLanguage({lang: NewLanguage});
    LSManager.setVar("language", NewLanguage);
  }

  const getLangColor = (Language, LanguageOn) => {
    if (Language == LanguageOn)
      return "link on"
    return "link";
  }

  const handleScroll = (Event) => {
    setScrollEvent(Event);
    const linkIndex = styling.getPageIndex();
    if (location.pathname != "/" + Links[linkIndex])
      navigate("/" + Links[linkIndex]);
    let pageContainer = document.getElementById("pageContainer");
    let pageScroller = document.getElementById("pageScroller");
    for (let i = 0; i < pageContainer.children.length; i++) {
      const completion = styling.getElemScrollCompletion(pageContainer.children[i], pageScroller);
      pageContainer.children[i].style.filter = "sepia(" + (1 - completion)*100 + "%) hue-rotate(" + (1 - completion) * -135 + "deg) brightness(" + (1 + (completion - 1) * 0.9 ) + ")";
      pageContainer.children[i].style.opacity = completion;
    }
  }

  useEffect(() => {
    if (navTrigger.trigger) {
      document.getElementById(navTrigger.event.target.getAttribute("goto")).scrollIntoView({behavior: "smooth"});
    } else {
      if (location.pathname != "/")
        document.getElementById(location.pathname.slice(1)).scrollIntoView({behavior: "smooth"})
    }
  }, [navTrigger])

  return (
    <div className="flexRow" style={{position: "relative", overflow: "hidden", height: "100%", width: "100vw"}}>
      <div id="mainPageBG" className="flexRow" style={{position: "absolute", justifyContent: "center", zIndex: "-1", width: "100vw", height: "100vh", backgroundColor: "var(--background)"}}>
        {/* <HTMLBG Language={language} navTrigger={navTrigger} scrollEvent={scrollEvent} Links={AlteredLinks}/> */}
      </div>
      {(window.innerWidth > 1170) ? (
              <Header Language={language} navTrigger={navTrigger} setNavTrigger={setNavTrigger}/>
      ) : (
        <></>
      )}
      <div id="langDiv" className="flexRow" style={{zIndex: 3, position: "fixed"}}>
        <div ref={langDiv} className="flexRow" style={{pointerEvents: "auto"}}>
          <button value="enUs" onClick={(Event) => changeLang("enUs", Event)} className={getLangColor("enUs", language.lang)}>ENG</button>
          <p style={{paddingTop: "10px"}}>/</p>
          <button value="enUs" onClick={(Event) => changeLang("se", Event)} className={getLangColor("se", language.lang)}>SWE</button>
        </div>
      </div>
      <div className="flexColumn" style={{position: "relative", justifyContent: "center", width: "100%"}}>
        <div id="pageScroller" className="flexRow" onScroll={handleScroll} style={{justifyContent: "center", width: "100%", height: "100vh", overflowY: "scroll", scrollSnapType: "y mandatory"}}>
          <div id="pageContainer" className="flexColumn" style={{width: "50%"}}>
            <About Language={language} navTrigger={navTrigger}/>
            <Projects Language={language} navTrigger={navTrigger}/>
            <Experience Language={language} navTrigger={navTrigger}/>
            <Contact Language={language} navTrigger={navTrigger}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainSite
