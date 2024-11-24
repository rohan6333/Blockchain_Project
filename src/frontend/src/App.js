// src/frontend/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';
import Navbar from './components/NavBar'; 

function App() {
  return (
    <Router>
      <Navbar /> {/* Optional: If you want a persistent Navbar */}
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
