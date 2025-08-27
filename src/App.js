import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard.js';
import HomePage from './pages/HomePage.js';
import DocsPage from './pages/DocsPage.js';
import MDXDocPage from './pages/MDXDocPage.js';
import './components/MDXFileViewer.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="nav-tabs">
            <NavLink 
              to="/"
              className={({ isActive }) => isActive ? 'active' : ''}
              end
            >
              🏠 首页
            </NavLink>
            <NavLink 
              to="/dashboard"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              📊 仪表板
            </NavLink>
            <NavLink 
              to="/docs"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              📝 文档
            </NavLink>
          </nav>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/docs/:docId" element={<MDXDocPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
