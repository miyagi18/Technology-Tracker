import useLocalStorage from './useLocalStorage';

// Начальные данные с новым полем deadline
const initialTechnologies = [
  { 
    id: 1, 
    title: 'React Components', 
    description: 'Изучение базовых компонентов', 
    status: 'not-started', 
    notes: '', 
    deadline: '' // <-- Новое поле
  },
  { 
    id: 2, 
    title: 'Node.js Basics', 
    description: 'Основы серверного JavaScript', 
    status: 'not-started', 
    notes: '', 
    deadline: '' 
  },
  { 
    id: 3, 
    title: 'CSS Grid', 
    description: 'Верстка сложных сеток', 
    status: 'in-progress', 
    notes: 'Повторить grid-template-areas', 
    deadline: '' 
  },
];

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);

  const updateStatus = (techId, newStatus) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === Number(techId) ? { ...tech, status: newStatus } : tech
      )
    );
  };

  const updateNotes = (techId, newNotes) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === Number(techId) ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  // --- НОВАЯ ФУНКЦИЯ: Обновление дедлайна ---
  const updateDeadline = (techId, newDate) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === Number(techId) ? { ...tech, deadline: newDate } : tech
      )
    );
  };

  // --- НОВАЯ ФУНКЦИЯ: Импорт данных ---
  const importTechnologies = (jsonData) => {
    // Проверка, что нам передали массив
    if (Array.isArray(jsonData)) {
      setTechnologies(jsonData);
      alert('Данные успешно импортированы!');
    } else {
      alert('Ошибка: Неверный формат данных. Ожидался массив технологий.');
    }
  };

  const markAllCompleted = () => {
    setTechnologies(prev => prev.map(t => ({ ...t, status: 'completed' })));
  };

  const resetAll = () => {
    // Сбрасываем также и дедлайны
    setTechnologies(prev => prev.map(t => ({ ...t, status: 'not-started', notes: '', deadline: '' })));
  };

  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    return Math.round((completed / technologies.length) * 100);
  };

  return {
    technologies,
    updateStatus,
    updateNotes,
    updateDeadline,     // <-- Экспортируем для использования в TechnologyPage
    importTechnologies, // <-- Экспортируем для использования в QuickActions/App
    markAllCompleted,
    resetAll,
    progress: calculateProgress()
  };
}

export default useTechnologies;