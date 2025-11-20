import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useTechnologies from './useTechnologies'; // Хук должен быть в src/
import ProgressBar from './components/ProgressBar';
import HomePage from './components/HomePage';
import TechnologyPage from './components/TechnologyPage';

function App() {
  const { 
    technologies, 
    updateStatus, 
    updateNotes,    // <--- Эту функцию мы передаем вниз
    updateDeadline,     
    importTechnologies, 
    progress, 
    markAllCompleted, 
    resetAll 
  } = useTechnologies();

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>Трекер изучения технологий</h1>
          <ProgressBar 
            progress={progress}
            label="Общий прогресс"
            color="#4CAF50"
            height={20}
          />
        </header>

        <main className="app-main">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  technologies={technologies}
                  onMarkAllCompleted={markAllCompleted}
                  onResetAll={resetAll}
                  onImport={importTechnologies}
                  onStatusChange={updateStatus}
                />
              } 
            />
            
            <Route 
              path="/tech/:id" 
              element={
                <TechnologyPage 
                  technologies={technologies}
                  onStatusChange={updateStatus}
                  onNotesChange={updateNotes}       // <--- Важно: передаем updateNotes как onNotesChange
                  onDeadlineChange={updateDeadline}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;