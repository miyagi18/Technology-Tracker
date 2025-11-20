import React from 'react';
import { Link } from 'react-router-dom';
import './TechnologyCard.css';

function TechnologyCard({ technology, onStatusChange }) {
  
  const getStatusText = () => {
    switch (technology.status) {
      case 'completed': return '✅ Изучено';
      case 'in-progress': return '⏳ В процессе';
      default: return '❌ Не начато';
    }
  };
  
  const handleButtonClick = (e) => {
    e.preventDefault(); // Предотвращаем переход по ссылке при клике на кнопку
    
    const statusOrder = ['not-started', 'in-progress', 'completed'];
    const nextIndex = (statusOrder.indexOf(technology.status) + 1) % statusOrder.length;
    onStatusChange(technology.id, statusOrder[nextIndex]);
  };

  return (
    <Link to={`/tech/${technology.id}`} className="card-link">
      <div className={`technology-card status-${technology.status}`}>
        <div className="card-header">
          <h3>{technology.title}</h3>
          <span className="status-badge">{getStatusText()}</span>
        </div>
        
        <p className="card-description">{technology.description}</p>
        
        <div className="card-footer">
          {technology.deadline && (
            <div className="deadline-tag">📅 {technology.deadline}</div>
          )}
          <button className="status-change-btn" onClick={handleButtonClick}>
            Сменить статус
          </button>
        </div>
      </div>
    </Link>
  );
}

export default TechnologyCard;