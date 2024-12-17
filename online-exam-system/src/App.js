import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './components/admin/Dashboard';
import TeacherDashboard from './components/teacher/Dashboard';
import DashboardLayout from './components/shared/DashboardLayout';
import UserManagement from './components/admin/UserManagement';
import CategoriesManagement from './components/admin/CategoriesManagement';
import Profile from './components/student/Profile';
import { AuthProvider } from './context/AuthContext';
import './css/App.css';
import ExamsManagement from './components/teacher/ExamsManagement';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Student Routes */}
            <Route path="/student/profile" element={
              <DashboardLayout role="student" title="Student Profile">
                <Profile />
              </DashboardLayout>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <DashboardLayout role="admin" title="Admin Dashboard">
                <AdminDashboard />
              </DashboardLayout>
            } />
            <Route path="/admin/users" element={
              <DashboardLayout role="admin" title="User Management">
                <UserManagement />
              </DashboardLayout>
            } />
            <Route path="/admin/categories" element={
              <DashboardLayout role="admin" title="Categories Management">
                <CategoriesManagement />
              </DashboardLayout>
            } />
            
            {/* Teacher Routes */}
            <Route path="/teacher/dashboard" element={
              <DashboardLayout role="teacher" title="Teacher Dashboard">
                <TeacherDashboard />
              </DashboardLayout>
            } />
            <Route path="/teacher/exams" element={
              <DashboardLayout role="teacher" title="Exams Management">
                <ExamsManagement />
              </DashboardLayout>
            } />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
