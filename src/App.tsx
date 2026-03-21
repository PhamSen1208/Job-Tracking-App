import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import AddJob from './pages/AddJob'
import Board from './pages/Board'
import JobDetail from './pages/JobDetail'
import EditJob from './pages/EditJob'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import HomeLayout from './layouts/HomeLayout'
import DashBoardLayout from './layouts/DashBoardLayout'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Schedule from './pages/Schedule'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position='top-center' autoClose={2000}></ToastContainer>
      <Routes>
        <Route element = {<HomeLayout/>}>
          <Route path="/" element = {<Landing/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element = {<DashBoardLayout/>}>
          <Route 
            path="dashboard" 
            element = {
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="jobs" 
            element={
              <ProtectedRoute>
                <Jobs />
              </ProtectedRoute>
            } 
          />

          <Route
            path="add-job"
            element={
              <ProtectedRoute>
                <AddJob />
              </ProtectedRoute>
            } 
          />

          <Route
            path="board"
            element={
              <ProtectedRoute>
                <Board />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="jobs/:id" 
            element={
              <ProtectedRoute>
                <JobDetail />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="jobs/edit/:id" 
            element={
              <ProtectedRoute>
                <EditJob />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="schedule" 
            element={
              <ProtectedRoute>
                <Schedule />
              </ProtectedRoute>
            } 
          />
            
          <Route 
            path="profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>

  )
}

export default App
