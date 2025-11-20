import React from 'react';
import './TechnologyCard.css';
// Мы импортируем TechnologyNotes, чтобы встроить его ВНУТРЬ карточки
import TechnologyNotes from '../TechnologyNotes'; 

function TechnologyCard({ technology, onStatusChange, onNotesChange }) {
  // Теперь мы получаем один объект technology
  
  const getStatusText = () => {
    switch (technology.status) {
      case 'completed': return 'Изучено ✅';
      case 'in-progress': return 'В процессе ⏳';
      case 'not-started': return 'Не начато ❌';
      default: return 'Не начато ❌';
    }
  };
  
  const handleStatusClick = (e) => {
    // Останавливаем всплытие, если клик был по кнопке или заметкам
    if (e.target.closest('button, textarea')) {
      return;
    }

    // Вызываем логику смены статуса
    changeStatus();
  };

  const handleButtonClick = (e) => {
    e.stopPropagation(); // Важно, чтобы клик по кнопке не триггерил handleStatusClick
    changeStatus();
  };

  // Выносим логику смены статуса в отдельную функцию
  const changeStatus = () => {
    const statusOrder = ['not-started', 'in-progress', 'completed'];
    const currentIndex = statusOrder.indexOf(technology.status);
    
    if (currentIndex === -1) {
      console.error('Unknown status:', technology.status);
      return;
    }
    
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    const newStatus = statusOrder[nextIndex];
    
    // Используем функцию из хука
    onStatusChange(technology.id, newStatus);
  };

  return (
    <div 
      className={`technology-card status-${technology.status}`}
      onClick={handleStatusClick} // Клик по всей карточке меняет статус
    >
      <section className="card-title">
        <h3>{technology.title}</h3>
      </section>
      
      <section className="card-description">
        <p>{technology.description}</p>
      </section>
      
      <section className="card-status">
        <p>Статус: {getStatusText()}</p>
        <button className="status-btn" onClick={handleButtonClick}>
          🔄 Сменить статус
        </button>
      </section>
      
      {/* Встраиваем заметки прямо в карточку!
        Мы передаем ей нужные пропсы из объекта technology
        и функцию onNotesChange из хука.
      */}
      <TechnologyNotes
        notes={technology.notes}
        techId={technology.id}
        onNotesChange={onNotesChange} 
      />
    </div>
  );
}

export default TechnologyCard;