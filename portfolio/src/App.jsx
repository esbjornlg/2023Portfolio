import { useState, useEffect, useRef, useInsertionEffect } from 'react';
import { BrowserRouter, Route, Routes } from  'react-router-dom'
import './App.scss';
import Navbar from './routes/nav';
import SelectList from './components/SelectList';
import Contact from './routes/contact';
import LSManager from './logic/LSManager';
import { BsLightbulb, BsLightbulbOff } from 'react-icons/bs';
import langPack from './lang.jsx';

function App() {
  const [lightMode, setLightMode] = useState(LSManager.getVarElseSet("lightMode", "1"));
  const [language, setLanguage] = useState({lang: LSManager.getVarElseSet("language", "enUs")});
  const rays = useRef();
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
      if (Value.nodeName = "BUTTON")
        Value.className = getLangColor(Value.value)
  }

  const getLangColor = (NewLanguage) => {
    if (NewLanguage == language.lang)
      return "switchText On"
    return "switchText";
  }

  return (
    <div className="flexRow" style={{position: "relative", overflow: "hidden", height: "100vh", width: "100vw", backgroundColor: "var(--background)"}}>
      <div> {/* background */}
        <div ref={rays}>
          <div className="ray rayHoriz"></div>
          <div className="ray rayVert"></div>
        </div>
      </div>
      <div className="flexColumn" style={{position: "relative", width: "fit-content", height: "100%", marginLeft: "0px", padding: "20px", backgroundColor: "rgba(0,0,0,0.3"}}>
        <div className="flexColumn">
          <h1 style={{whiteSpace: "nowrap", marginTop: "50px"}}>Esbjörn Lyster Golawski</h1>
          <h3>{Lang.title[language.lang]}</h3>
        </div>
        <Navbar/>
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
              <p style={{height: "100%", fontSize: "35px"}}>/</p>
              <button value="enUs" onClick={(Event) => changeLang("se", Event)} className={getLangColor("se")}>SWE</button>
            </div>
          </div>
        </div>
      </div>
      <div className="flexRow" style={{justifyContent: "center", width: "100%", height: "100%", backgroundColor: "rgba(255,0,0,0.2)"}}>
        <div className="flexColumn" style={{width: "80%", justifyContent: "center", alignItems: "center"}}>
          <BrowserRouter>
            <Routes>
              <Route path="/" />
              <Route path="/projects" />
              <Route path="/experience" />
              <Route path="/contact" element={<Contact Language={language}/>} />
              {/* <Route path="*" element={<NoMatch />} /> */}
            </Routes>  
          </BrowserRouter>
        </div>
      </div>
    </div>
  )
}

export default App
