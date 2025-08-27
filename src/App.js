import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import MDXFileViewer from './components/MDXFileViewer';
import './components/MDXFileViewer.css';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="App">
      <header className="App-header">
        <nav className="nav-tabs">
          <button 
            className={currentView === 'dashboard' ? 'active' : ''}
            onClick={() => setCurrentView('dashboard')}
          >
            📊 仪表板
          </button>
          <button 
            className={currentView === 'mdx' ? 'active' : ''}
            onClick={() => setCurrentView('mdx')}
          >
            📝 MDX 文档
          </button>
        </nav>
      </header>
      <main className="App-main">
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'mdx' && <MDXFileViewer />}
      </main>
    </div>
  );
}

export default App;
