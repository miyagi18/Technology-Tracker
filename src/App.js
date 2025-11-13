import React, { useState, useEffect } from 'react';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './QuickActions';
import TechnologyNotes from './TechnologyNotes';

const getInitialTechnologies = () => {
  const saved = localStorage.getItem('techTrackerData');

  if (saved)
  {
    console.log('Данные загружены из localStorage');
    return JSON.parse(saved);
  }

  return [
     { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'not-started', notes: '' },
    { id: 2, title: 'Vue Directives', description: 'Работа с директивами и шаблонами', status: 'in-progress', notes: '' },
    { id: 3, title: 'Angular Routing', description: 'Создание маршрутов и навигации', status: 'completed', notes: '' },
  ];
};


function App() {
  const [technologies, setTechnologies] = useState(getInitialTechnologies);

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Загружаем данные из localStorage
  useEffect(() => {
    localStorage.setItem('techTrackerData', JSON.stringify(technologies));
    console.log('Данные сохранены в localStorage');
  }, [technologies]);

  // Сохраняем данные в localStorage
  useEffect(() => {
    localStorage.setItem('techTrackerData', JSON.stringify(technologies));
    console.log('Данные сохранены в localStorage');
  }, [technologies]);

  const handleStatusChange = (id, newStatus) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === id ? {...tech, status: newStatus } : tech
      )
    );
  };

  const handleMarkAllDone = () => {
    setTechnologies(prev => prev.map(t => ({ ...t, status: 'completed' })));
  };

  const handleResetAll = () => {
    setTechnologies(prev => prev.map(t => ({ ...t, status: 'not-started' })));
  };

  const handlePickRandom = () => {
    const notDone = technologies.filter(t => t.status !== 'completed');
    if (notDone.length === 0) return;
    const randomTech = notDone[Math.floor(Math.random() * notDone.length)];
    alert(`Следующая технология: ${randomTech.title}`);
  };

  const updateTechnologyNotes = (techId, newNotes) => {
    setTechnologies(prevTech =>
      prevTech.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

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
      <h1>Трекер изучения технологий</h1>

      <QuickActions
        onMarkAllDone={handleMarkAllDone}
        onResetAll={handleResetAll}
        onPickRandom={handlePickRandom}
      />

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

      <ProgressHeader technologies={technologies}/>

      <div className="tech-list">
        {filteredTechnologies.map(tech => (
          <div key={tech.id} className="tech-container">
            <TechnologyCard tech={{ id: tech.id, name: tech.title, status: tech.status }} onStatusChange={handleStatusChange} />
            <p>{tech.description}</p>
            <TechnologyNotes
              notes={tech.notes}
              techId={tech.id}
              onNotesChange={updateTechnologyNotes}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
