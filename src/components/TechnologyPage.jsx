import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import TechnologyNotes from '../TechnologyNotes'; // Импорт из той же папки
import './TechnologyPage.css'; 

function TechnologyPage({ technologies, onStatusChange, onNotesChange, onDeadlineChange }) {
  const { id } = useParams(); 
  const navigate = useNavigate();

  // Находим технологию и превращаем ID из URL в число
  const technology = technologies.find(t => t.id === Number(id));

  if (!technology) {
    return (
      <div className="not-found" style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Технология не найдена</h2>
        <button onClick={() => navigate('/')} className="back-btn">На главную</button>
      </div>
    );
  }

  return (
    <div className="technology-details-page">
      <button onClick={() => navigate('/')} className="back-btn">← Назад к списку</button>

      <div className="details-header" style={{ 
        backgroundColor: technology.status === 'completed' ? '#e8f5e9' : '#fff',
        border: '1px solid #ddd' 
      }}>
        <h1>{technology.title}</h1>
        <p className="description">{technology.description}</p>
        
        <div className="controls-row" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
          {/* Статус */}
          <div className="control-group">
            <label>Статус:</label>
            <select 
              value={technology.status} 
              onChange={(e) => onStatusChange(technology.id, e.target.value)}
              style={{ marginLeft: '10px', padding: '5px' }}
            >
              <option value="not-started">Не начато</option>
              <option value="in-progress">В процессе</option>
              <option value="completed">Выполнено</option>
            </select>
          </div>

          {/* Дедлайн */}
          <div className="control-group">
            <label>Срок:</label>
            <input 
                type="date" 
                value={technology.deadline || ''} 
                onChange={(e) => onDeadlineChange(technology.id, e.target.value)}
                style={{ marginLeft: '10px', padding: '5px' }}
            />
          </div>
        </div>
      </div>

      <div className="details-body">
        {/* ПЕРЕДАЧА ФУНКЦИИ: Важно передать techId и onNotesChange */}
        <TechnologyNotes 
          notes={technology.notes} 
          techId={technology.id} 
          onNotesChange={onNotesChange}
        />
      </div>
    </div>
  );
}

export default TechnologyPage;