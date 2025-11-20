import React from 'react';

function TechnologyNotes({ notes, onNotesChange, techId }) {

  const handleChange = (e) => {
    // Проверка на безопасность: вызываем функцию только если она передана
    if (typeof onNotesChange === 'function') {
      onNotesChange(techId, e.target.value);
    } else {
      console.error('Ошибка: Функция onNotesChange не была передана в компонент TechnologyNotes');
    }
  };

  return (
    <div className="notes-section" style={{ marginTop: '20px' }}>
      <h3>Мои заметки</h3>
      <textarea
        value={notes || ''} // Защита от null/undefined
        onChange={handleChange}
        placeholder="Записывайте сюда важные мысли, ссылки или команды..."
        rows="6"
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontFamily: 'inherit',
          fontSize: '1rem',
          resize: 'vertical'
        }}
      />
      <div className="notes-hint" style={{ marginTop: '5px', fontSize: '0.9rem', color: '#666' }}>
        {notes && notes.length > 0
          ? `Сохранено символов: ${notes.length}`
          : 'Начните вводить текст, он сохранится автоматически'}
      </div>
    </div>
  );
}

export default TechnologyNotes;