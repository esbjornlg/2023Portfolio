import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineMenu } from "react-icons/ai"

import '../App.scss';
import Header from '../components/Header';
import About from './About';
import Projects from './Projects';
import Experience from "./Experience";
import Contact from "./Contact";
import LSManager from '../logic/LSManager';
import styling from '../logic/styling'
import langPack from '../lang.jsx';

function MainSite() {
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguage] = useState({lang: LSManager.getVarElseSet("language", "se")});
  const [navTrigger, setNavTrigger] = useState({trigger: 0, event: null});
  // const [dockHeader, setDockHeader] = useState(false);
  const langDiv = useRef();
  const Lang = new langPack();
  const links = ["/", "/projects", "/experience", "/contact"];

  const changeLang = (NewLanguage, Event) => {
    setLanguage({lang: NewLanguage});
    LSManager.setVar("language", NewLanguage);
  }

  const getLangColor = (Language, LanguageOn) => {
    if (Language == LanguageOn)
      return "link on"
    return "link";
  }

  // const toggleHeader = () => {
  //   if (dockHeader) {
  //     setDockHeader(false);
  //     document.getElementById("mainPageHeader").style.transform = "translateX(0px)";
  //   }
  //   else {
  //     setDockHeader(true);
  //     document.getElementById("mainPageHeader").style.transform = "translateX(-110%)";
  //   }
  // }

  const handleScroll = (Event) => {
    const linkIndex = Math.round(Event.target.scrollTop / window.innerHeight);
    if (location.pathname != links[linkIndex])
      navigate(links[linkIndex]);
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
      <div style={{position: "absolute", zIndex: "-1", width: "100vw", height: "100vh", backgroundColor: "var(--background)"}}> {/* background */}
      </div>
      {/* <button className="link" onClick={() => toggleHeader()} style={{zIndex: 3, position: "fixed", width: "50px", height: "50px", top: "57px", left: "0px"}}>
        <AiOutlineMenu />
      </button> */}
      {(window.innerWidth > 1170) ? (
              <Header Language={language} navTrigger={navTrigger} setNavTrigger={setNavTrigger}/>
      ) : (
        <></>
      )}
      <div id="langDiv" className="flexRow" style={{position: "fixed", left: "40px", bottom: "0px", paddingBottom: "10px"}}>
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
