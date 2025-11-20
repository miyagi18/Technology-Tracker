import React, { useState } from 'react';
import TechnologyCard from './TechnologyCard';
import QuickActions from '../QuickActions';
import './HomePage.css';

function HomePage({ technologies, onMarkAllCompleted, onResetAll, onImport, onStatusChange }) {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredByStatus = filter === 'all' 
    ? technologies 
    : technologies.filter(t => t.status === filter);

  const filteredTechnologies = filteredByStatus.filter(tech =>
    tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tech.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-page">
      <QuickActions 
        onMarkAllCompleted={onMarkAllCompleted}
        onResetAll={onResetAll}
        technologies={technologies}
        onImport={onImport} 
      />

      <div className="controls-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Поиск технологий..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filters">
          <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>Все</button>
          <button onClick={() => setFilter('not-started')} className={filter === 'not-started' ? 'active' : ''}>Не начато</button>
          <button onClick={() => setFilter('in-progress')} className={filter === 'in-progress' ? 'active' : ''}>В процессе</button>
          <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Готово</button>
        </div>
      </div>

      <div className="tech-list-grid">
        {filteredTechnologies.length > 0 ? (
          filteredTechnologies.map(tech => (
            <TechnologyCard 
              key={tech.id} 
              technology={tech} 
              onStatusChange={onStatusChange}
            />
          ))
        ) : (
          <p className="empty-state">Технологии не найдены</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;