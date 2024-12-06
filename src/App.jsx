import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/Auth/Auth';
import 'animate.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/style/main.css';
import HomePage from './components/pages/HomePage';
import CardPage from './components/pages/CardPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/card/:id" element={<CardPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
