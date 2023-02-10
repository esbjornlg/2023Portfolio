import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom'
import MainSite from './routes/MainSite';
import TaskScheduler from './routes/TaskScheduler/App';
import './App.scss';
function App() {
  return (
    <Routes>
      <Route path="/projects/taskscheduler" element={<TaskScheduler/>} />
      <Route path="*" element={<MainSite/>} />
    </Routes>
  )
}

export default App
