import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import { PostDetail } from './components/PostDetail';
import { CreatePost } from './components/CreatePost';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Footer } from './components/Footer';


function App() {
  return(
<Router>
  <Navbar />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/post/:id" element={<PostDetail />} />
    <Route path="/create" element={<CreatePost />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
  <Footer />
</Router>
  );
}

export default App;