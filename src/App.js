import React, { useState } from 'react';
// Импортируем наши новые хуки и компоненты
import useTechnologies from './useTechnologies';
import ProgressBar from './components/ProgressBar';
import TechnologyCard from './components/TechnologyCard'; 
import QuickActions from './QuickActions'; // И этот

// Убираем импорты Statistics, ProgressHeader и старый TechnologyNotes,
// так как они больше не нужны или перемещены

function App() {
  // Вся сложная логика теперь спрятана в хуке!
  const { 
    technologies, 
    updateStatus, 
    updateNotes, 
    progress, 
    markAllCompleted, 
    resetAll 
  } = useTechnologies();

  // Логику фильтрации и поиска оставляем в App.js, так как это логика Отображения (View)
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Фильтрация по статусу
  const filteredByStatus =
    filter === 'all'
      ? technologies
      : technologies.filter(t => t.status === filter);

  // Поиск по названию и описанию
  const filteredTechnologies = filteredByStatus.filter(tech =>
    tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tech.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <header className="app-header">
        <h1>Трекер изучения технологий</h1>
        {/* Используем наш новый ProgressBar */}
        <ProgressBar 
          progress={progress}
          label="Общий прогресс"
          color="#4CAF50"
          height={20}
        />
      </header>

      {/* Используем QuickActions из "Самостоятельной работы" */}
      <QuickActions 
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAll}
        technologies={technologies} // для экспорта
      />

      {/* Оставляем фильтры и поиск */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск технологий..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span>Найдено: {filteredTechnologies.length}</span>
      </div>

      <div className="filters">
        <button onClick={() => setFilter('all')}>Все</button>
        <button onClick={() => setFilter('not-started')}>Не начатые</button>
        <button onClick={() => setFilter('in-progress')}>В процессе</button>
        <button onClick={() => setFilter('completed')}>Выполненные</button>
      </div>
      
      {/* Старый Statistics и ProgressHeader больше не нужны */}

      <main className="app-main">
        <div className="tech-list">
          {filteredTechnologies.map(tech => (
            // TechnologyCard теперь сам отвечает за заметки
            <TechnologyCard
              key={tech.id}
              technology={tech}
              onStatusChange={updateStatus} // Передаем функцию из хука
              onNotesChange={updateNotes}    // Передаем функцию из хука
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;