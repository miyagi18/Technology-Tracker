import React, { useState } from 'react';
// Импортируем наш новый компонент Modal
import Modal from './components/Modal'; 
// Мы переименуем ваш QuickActions.js в QuickActions.jsx,
// так как он теперь содержит JSX и Cостояние (State)

function QuickActions({ onMarkAllCompleted, onResetAll, technologies }) {
  // Состояние для модального окна экспорта
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportData, setExportData] = useState('');

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      technologies: technologies
    };
    // Форматируем JSON для красивого отображения
    const dataStr = JSON.stringify(data, null, 2);
    
    // Сохраняем данные в состояние, чтобы показать их в модалке
    setExportData(dataStr);
    console.log('Данные для экспорта:', dataStr);
    setShowExportModal(true);
  };

  // Логика для скачивания файла (бонус)
  const downloadJson = () => {
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'technologies_export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportModal(false);
  };

  return (
    <div className="quick-actions">
      <h3>Быстрые действия</h3>
      <div className="action-buttons">
        {/* Используем классы из вашего примера */}
        <button onClick={onMarkAllCompleted} className="btn btn-success">
          Отметить все как выполненные
        </button>
        <button onClick={onResetAll} className="btn btn-warning">
          Сбросить все (статусы и заметки)
        </button>
        <button onClick={handleExport} className="btn btn-info">
          Экспорт данных
        </button>
      </div>

      {/* А вот и наше новое модальное окно! */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Экспорт данных"
      >
        <p>Данные успешно подготовлены для экспорта!</p>
        <textarea
          readOnly
          value={exportData}
          style={{ width: '100%', height: '150px', fontSize: '12px', marginTop: '10px' }}
        />
        <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button className="btn" onClick={() => setShowExportModal(false)}>
            Закрыть
          </button>
          <button className="btn btn-success" onClick={downloadJson}>
            Скачать .json
          </button>
        </div>
      </Modal>
    </div>
  );
}

// Не забудьте переименовать файл в QuickActions.jsx
export default QuickActions;