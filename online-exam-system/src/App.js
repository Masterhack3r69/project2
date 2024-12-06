import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import QuizPage from './pages/QuizPage';
import AdminDashboard from './components/admin/Dashboard';
import TeacherDashboard from './components/teacher/Dashboard';
import DashboardLayout from './components/shared/DashboardLayout';
import './css/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quizzes" element={<QuizPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={
            <DashboardLayout role="admin" title="Admin Dashboard">
              <AdminDashboard />
            </DashboardLayout>
          } />
          
          {/* Teacher Routes */}
          <Route path="/teacher/dashboard" element={
            <DashboardLayout role="teacher" title="Teacher Dashboard">
              <TeacherDashboard />
            </DashboardLayout>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
