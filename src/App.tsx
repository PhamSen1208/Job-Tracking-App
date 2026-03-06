import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import JobDetail from './pages/JobDetail'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import HomeLayout from './layouts/HomeLayout'
import DashBoardLayout from './layouts/DashBoardLayout'

function App() {
  return (
    <Routes>
      <Route element = {<HomeLayout/>}>
        <Route path="/" element = {<Landing/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element = {<DashBoardLayout/>}>
        <Route path="dashboard" element = {<Dashboard/>} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/:id" element={<JobDetail />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}

export default App
