import React from 'react';

function QuickActions({ onMarkAllDone, onResetAll, onPickRandom }) {
  return (
    <div className="quick-actions">
      <button onClick={onMarkAllDone}>Отметить все как выполненные</button>
      <button onClick={onResetAll}>Сбросить все статусы</button>
      <button onClick={onPickRandom}>Случайный выбор следующей</button>
    </div>
  );
}

export default QuickActions;
