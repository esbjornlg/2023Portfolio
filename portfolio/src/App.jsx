import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom'
import './App.scss';
import Navbar from './routes/Navbar';
import AnimatedRoutes from './routes/AnimatedRoutes';
import About from './routes/About';
import Projects from './routes/Projects';
import Experience from './routes/Experience';
import Contact from './routes/Contact';
import LSManager from './logic/LSManager';
import { BsLightbulb, BsLightbulbOff } from 'react-icons/bs';
import langPack from './lang.jsx';

function App() {
  const [lightMode, setLightMode] = useState(LSManager.getVarElseSet("lightMode", "1"));
  const [language, setLanguage] = useState({lang: LSManager.getVarElseSet("language", "enUs")});
  const [navTrigger, setNavTrigger] = useState({trigger: 0, event: null});
  const rays = useRef();
  const circles = useRef();
  const langDiv = useRef();
  const Lang = new langPack();
  const changeLightMode = () => {
    if (lightMode == "1")
      setLightMode(LSManager.setVar("lightMode", "0"));
    else
      setLightMode(LSManager.setVar("lightMode", "1"));
  }

  const changeLang = (NewLanguage, Event) => {
    setLanguage({lang: NewLanguage});
    LSManager.setVar("language", NewLanguage);
    for (const [Key, Value] of Object.entries(langDiv.current.children))
      if (Value.nodeName == "BUTTON")
          Value.className = getLangColor(Value.value);
  }

  const getLangColor = (NewLanguage) => {
    if (NewLanguage == language.lang)
      return "switchText on"
    return "switchText";
  }

  useEffect(() => {
    if (navTrigger.trigger) {
      document.documentElement.style.setProperty("--pageInX", navTrigger.event.pageX);
      document.documentElement.style.setProperty("--pageInY", navTrigger.event.pageY);
      // console.log(getComputedStyle(document.documentElement).getPropertyValue("--pageInX"))
      if (!Array.from(document.getElementsByClassName("pageBox")[0].classList).includes("pageIn")) {
        let pageInCircle = document.createElement("div");
        pageInCircle.className = "pageInCircle";
        for (let i = 0; i < circles.current.children.length; i++) {
          if (circles.current.children[i].class = "pageInCircle")
            circles.current.children[i].remove();
        }
        circles.current.appendChild(pageInCircle);
      }
    }
  }, [navTrigger])
  

  return (
    <BrowserRouter>
    <div className="flexRow" style={{position: "relative", overflow: "hidden", height: "100vh", width: "100vw"}}>
      <div style={{position: "absolute", zIndex: "-1", width: "100vw", height: "100vh", backgroundColor: "var(--background)"}}> {/* background */}
        <div ref={circles}>
          {/* <div className="pageInCircle"></div> */}
        </div>
        <div ref={rays} >
          <div className="ray rayHoriz"></div>
          <div className="ray rayVert"></div>
        </div>
      </div>
      <div className="flexColumn" style={{position: "relative", width: "fit-content", height: "100%", marginLeft: "0px", padding: "20px", backgroundColor: "rgba(0,0,0,0.3"}}>
        <div className="flexColumn">
          <h1 style={{whiteSpace: "nowrap", marginTop: "50px"}}>Esbjörn Lyster Golawski</h1>
          <h3 style={{paddingLeft: "5px"}}>{Lang.titles.title[language.lang]}</h3>
        </div>
        <Navbar Language={language} navTrigger={navTrigger} setNavTrigger={setNavTrigger}/>
        <div className="flexColumn" style={{height: "100%", justifyContent: "end", paddingBottom: "40px"}}>
          <div className="flexRow" style={{justifyContent: "space-evenly"}}>
            {/* {lightMode == "1" ? (
              <button onClick={changeLightMode}><BsLightbulbOff size="20px"/></button>
              ) : (
                <button onClick={changeLightMode}><BsLightbulb size="20px"/></button>
                )
            } */}
            <div ref={langDiv} className="flexRow">
              <button value="enUs" onClick={(Event) => changeLang("enUs", Event)} className={getLangColor("enUs")}>ENG</button>
              <p style={{paddingTop: "10px"}}>/</p>
              <button value="enUs" onClick={(Event) => changeLang("se", Event)} className={getLangColor("se")}>SWE</button>
            </div>
          </div>
        </div>
      </div>
      <div className="flexRow" style={{justifyContent: "center", width: "100%", height: "100%", backgroundColor: "rgba(255,0,0,0.2)"}}>
        <div className="flexColumn" style={{position: "relative", width: "80%", justifyContent: "center", alignItems: "center"}}>
            <AnimatedRoutes Language={language} navTrigger={navTrigger}/>
        </div>
      </div>
    </div>
    </BrowserRouter>
  )
}

export default App
