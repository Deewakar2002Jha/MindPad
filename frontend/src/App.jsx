import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useUser, Show } from '@clerk/react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Home from './pages/Home';
// Note: We're replacing deprecated SignIn/SignUp components with standard routing 
// since the quickstart specifies using the buttons or built-in flows, but since you 
// asked for /login and /register routes, the best approach is to render the custom forms 
// or redirect to Clerk Hosted UI. However, if using full custom components is needed,
// Clerk still provides <SignIn routing="path" ... /> but we stick to the required buttons for simpler flow.
// Actually, to provide a complete replacement that matches the prompt, let's use the buttons directly on the home page or navbar, but keeping the /login /register pathways using Show is also valid.
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="container" style={{ textAlign: 'center', marginTop: '5rem' }}>Loading application...</div>;
  }

  const isAdmin = user?.publicMetadata?.role === 'admin';

  return (
    <BrowserRouter>
      <Navbar isAdmin={isAdmin} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/*" element={<Login />} />
          <Route path="/register/*" element={<Register />} />
          <Route path="/dashboard" element={
            <>
              <Show when="signed-in">
                <Dashboard />
              </Show>
              <Show when="signed-out">
                <Navigate to="/login" />
              </Show>
            </>
          } />
          <Route path="/admin" element={
            isAdmin 
              ? <AdminPanel /> 
              : <Navigate to={user ? "/dashboard" : "/login"} />
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
