import React, { useState, useRef } from 'react';
import Modal from './components/Modal'; 

function QuickActions({ onMarkAllCompleted, onResetAll, technologies, onImport }) {
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportData, setExportData] = useState('');
  const fileInputRef = useRef(null); // Ссылка на скрытый input

  const handleExport = () => {
    // Экспортируем чистый массив технологий
    const dataStr = JSON.stringify(technologies, null, 2);
    setExportData(dataStr);
    setShowExportModal(true);
  };

  // Обработчик загрузки файла
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        // Если в файле есть поле technologies (от нашего экспорта) или это чистый массив
        const dataToImport = json.technologies || json; 
        onImport(dataToImport);
      } catch (error) {
        alert('Ошибка при чтении JSON файла');
      }
    };
    reader.readAsText(file);
    // Сбрасываем input, чтобы можно было загрузить тот же файл снова
    e.target.value = ''; 
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="quick-actions">
      <div className="action-buttons">
        <button onClick={onMarkAllCompleted} className="btn btn-success">
          ✅ Все выполнено
        </button>
        <button onClick={onResetAll} className="btn btn-warning">
          🔄 Сброс
        </button>
        <button onClick={handleExport} className="btn btn-info">
          📤 Экспорт
        </button>
        
        {/* Кнопка Импорта */}
        <button onClick={triggerFileInput} className="btn btn-primary">
          📥 Импорт JSON
        </button>
        
        {/* Скрытый инпут для файла */}
        <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            accept=".json"
            onChange={handleFileUpload}
        />
      </div>

      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Экспорт данных"
      >
        <p>Скопируйте этот JSON или сохраните в файл:</p>
        <textarea
          readOnly
          value={exportData}
          style={{ width: '100%', height: '150px', fontSize: '12px' }}
        />
        <button className="btn" onClick={() => setShowExportModal(false)}>Закрыть</button>
      </Modal>
    </div>
  );
}

export default QuickActions;