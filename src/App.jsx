import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { PublicRoute } from './components/PublicRoute';
import { Home } from './pages/Home';
import { PostDetail } from './pages/PostDetail';
import { CreatePost } from './pages/CreatePost';
import { Login } from './pages/Login';
import { Register } from './pages/Register';



function App() {
  return(
      <Router>
          <AuthProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/login" element={
                  <PublicRoute>
                <Login />
                </PublicRoute>
                } />
                <Route path="/register" element={
                  <PublicRoute>
                <Register />
                </PublicRoute>
                } />
              </Routes>
              <Footer />
            </AuthProvider>
      </Router>
  );
}

export default App;