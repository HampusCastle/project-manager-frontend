import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import ProjectDetailPage from './pages/ProjectDetailPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import ProfilePage from './pages/ProfilePage'
import CreateProject from './components/CreateProject';
import Footer from './components/Footer';
import UserList from './components/UserList';
import ProtectedRoute from './components/ProtectedRoute'; 
import { ToastContainer } from 'react-toastify';
import {toastConfig}  from './services/toastConfig'; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/home" element={<Navigate to="/dashboard" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/project/:projectId" element={<ProjectDetailPage />} />

          <Route
            path="/user-list"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
      <ToastContainer {...toastConfig} />
    </Router>
  );
};

export default App;