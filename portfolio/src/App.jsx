import { useState, useEffect, useRef, useInsertionEffect } from 'react';
import { BrowserRouter, Route, Routes } from  'react-router-dom'
import './App.scss';
import Navbar from './routes/nav';
import Contact from './routes/contact';
import LSManager from './logic/LSManager';
import { BsLightbulb, BsLightbulbOff } from 'react-icons/bs'

function App() {
  const [lightMode, setLightMode] = useState(LSManager.getVarElseSet("lightMode", "1"));
  const rays = useRef();
  const changeLightMode = () => {
    if (lightMode == "1")
      setLightMode(LSManager.setVar("lightMode", "0"));
    else
      setLightMode(LSManager.setVar("lightMode", "1"));
  }

  const createShiningRays = () => {
    // const button = document.querySelector('button');
    // button.addEventListener('mouseenter', event => {
    //   const buttonRect = event.target.getBoundingClientRect();
    //   rayHorizontal.style.top = `${buttonRect.top + buttonRect.height / 2}px`;
    //   rayVertical.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
    // });
  
    // button.addEventListener('mouseleave', () => {
    //   rayHorizontal.style.top = '50%';
    //   rayVertical.style.left = '50%';
    // });
  };
  
  createShiningRays();

  return (
    <div className="flexRow" style={{position: "relative", overflow: "hidden", height: "100vh", width: "100vw", backgroundColor: "var(--background)"}}>
      <div> {/* background */}
        <div ref={rays}>
          <div className="ray rayHoriz"></div>
          <div className="ray rayVert"></div>
        </div>
      </div>
      <div className="flexColumn" style={{position: "relative", width: "fit-content", height: "100%", marginLeft: "%", padding: "20px", backgroundColor: "rgba(0,0,0,0.3"}}>
        <div className="flexColumn" style={{}}>
          <h1 style={{whiteSpace: "nowrap", marginTop: "50px"}}>Esbjörn Lyster Golawski</h1>
          <h3>Fullstack developer</h3>
        </div>
        {/* <Navbar/> */}
        <div className="flexColumn" style={{height: "100%", justifyContent: "end"}}>
          <div className="flexRow" style={{justifyContent: "space-evenly"}}>
            {lightMode == "1" ? (
              <button onClick={changeLightMode}><BsLightbulbOff size="20px"/></button>
              ) : (
                <button onClick={changeLightMode}><BsLightbulb size="20px"/></button>
                )
                
            }
          </div>
        </div>
      </div>
      <div className="flexRow" style={{justifyContent: "center", width: "100%", height: "100%", backgroundColor: "rgba(255,0,0,0.2)"}}>
        <div className="flexColumn" style={{width: "80%", justifyContent: "center"}}>
          <BrowserRouter>
            <Routes>
              <Route path="/" />
              <Route path="/projects" />
              <Route path="/experience" />
              <Route path="/contact" element={<Contact/>} />
              {/* <Route path="*" element={<NoMatch />} /> */}
            </Routes>  
          </BrowserRouter>
        </div>
      </div>
    </div>
  )
}

export default App
