import React from 'react';

// Стили можно вынести в CSS, но для простоты оставим их здесь
const barContainerStyles = {
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: '8px',
    overflow: 'hidden',
    margin: '10px 0',
};

const barFillStyles = {
    height: '20px',
    transition: 'width 0.4s ease-in-out',
    borderRadius: '8px 0 0 8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '12px',
};

function ProgressBar({
    progress = 0,
    label = "Прогресс",
    color = "#4CAF50",
    height = 20,
    animated = true // Этот проп пока не используется, но оставлен для будущего
}) {

    // Убедимся, что прогресс в границах 0-100
    const clampedProgress = Math.max(0, Math.min(100, progress));

    return (
        <div className="progress-bar-component">
            <label style={{ display: 'block', marginBottom: '5px' }}>
                {label}: {clampedProgress}%
            </label>
            <div style={{ ...barContainerStyles, height: `${height}px` }}>
            <div style={{
                ...barFillStyles,
                width: `${clampedProgress}%`,
            backgroundColor: color,
            height: `${height}px`
        }}>
            {clampedProgress > 10 && `${clampedProgress}%`}
        </div>
      </div >
    </div >
  );
}

export default ProgressBar;