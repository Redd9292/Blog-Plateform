import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import { PostDetail } from './components/PostDetail';
import { CreatePost } from './components/CreatePost';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Footer } from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { PublicRoute } from './components/PublicRoute';


function App() {
  return(
      <Router>
          <AuthProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/create" element={<CreatePost />} />
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