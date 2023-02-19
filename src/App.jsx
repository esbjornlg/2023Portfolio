import { Routes, Route } from 'react-router-dom'
import MainSite from './routes/MainSite';
import TaskScheduler from './routes/TaskScheduler/App';
import './App.scss';
function App() {
  const MainSiteLinks = ["", "projects", "experience", "contact"];
  return (
    <Routes>
      <Route path="/projects/taskscheduler" element={<TaskScheduler/>} />
      <Route path="*" element={<MainSite Links={MainSiteLinks}/>} />
    </Routes>
  )
}

export default App
