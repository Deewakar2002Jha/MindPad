import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useUser, Show } from '@clerk/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Docs from './pages/Docs';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';

function App() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="container" style={{ textAlign: 'center', marginTop: '5rem' }}>Loading application...</div>;
  }

  const isAdmin = user?.publicMetadata?.role === 'admin' || localStorage.getItem('admin_token');

  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar isAdmin={isAdmin} />
      <main>
        <Routes>
          <Route path="/" element={isAdmin ? <Navigate to="/admin" /> : <Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/login/*" element={<Login />} />
          <Route path="/register/*" element={<Register />} />
          <Route path="/dashboard" element={
            <div className="container">
              <Show when="signed-in">
                {isAdmin ? <Navigate to="/admin" /> : <Dashboard />}
              </Show>
              <Show when="signed-out">
                <Navigate to="/login" />
              </Show>
            </div>
          } />
          <Route path="/admin" element={
            <div className="container">
              {isAdmin 
                ? <AdminPanel /> 
                : <Navigate to="/admin-login" />}
            </div>
          } />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
