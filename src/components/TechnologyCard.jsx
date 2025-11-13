import React from 'react';
import './TechnologyCard.css';

function TechnologyCard({ tech, onStatusChange, id, title, description, status }) {
  // Поддержка двух вариантов передачи props:
  // 1. Через объект tech
  // 2. Через отдельные props (id, title, description, status)
  const technology = tech || { id, title, name: title, description, status };
  
  const getStatusText = () => {
    switch (technology.status) {
      case 'completed': return 'Изучено ✅';
      case 'in-progress': return 'В процессе ⏳';
      case 'not-started': return 'Не начато ❌';
      default: return 'Не начато ❌';
    }
  };
  
  const handleStatusChange = () => {
    console.log('Button clicked! ID:', technology.id, 'Current status:', technology.status);
    
    const statusOrder = ['not-started', 'in-progress', 'completed'];
    const currentIndex = statusOrder.indexOf(technology.status);
    
    if (currentIndex === -1) {
      console.error('Unknown status:', technology.status);
      return;
    }
    
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    const newStatus = statusOrder[nextIndex];
    
    console.log('Changing status from', technology.status, 'to', newStatus);
    onStatusChange(technology.id, newStatus);
  };

  return (
    <div 
      className={`technology-card status-${technology.status}`}
      onClick={handleStatusChange}
    >
      <section className="card-title">
        <h3>{technology.name || technology.title}</h3>
      </section>
      <section className="card-description">
        <p>{technology.description}</p>
      </section>
      <section className="card-status">
        <p>Статус: {getStatusText()}</p>
        <button className="status-btn" onClick={handleStatusChange}>
          🔄
        </button>
      </section>
    </div>
  );
}

export default TechnologyCard;