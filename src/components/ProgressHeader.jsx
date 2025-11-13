import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
    const TotalCount = technologies.length;
    const CompletedCount = technologies.filter(tech => tech.status === 'completed').length;
    const PercentProgress = TotalCount > 0 ? Math.round((CompletedCount / TotalCount) * 100) : 0;

    const getProcessColor = () => {
        if (PercentProgress >= 80) return '#4caf50';
        if (PercentProgress >= 50) return '#ff9800';
        return '#f44336';
    };

    return (
        <div className="progress-header">
            <h2>Прогресс изучения</h2>
            <div className="stats-container">
                <div className="stat-item">
                    <span className="stat-number">{TotalCount}</span>
                    <span className="stat-label">Всего технологий</span>
                </div>
            </div>

            <div className="stats-container">
                <div className="stat-item">
                    <span className="stat-number">{CompletedCount}</span>
                    <span className="stat-label">Изучено</span>
                </div>
            </div>

            <div className="stats-container">
                <div className="stat-item">
                    <span className="stat-number">{PercentProgress}%</span>
                    <span className="stat-label">Выполнено</span>
                </div>
            </div>
            <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{
                    width: `${PercentProgress}%`,
                    backgroundColor: getProcessColor()
                }}></div>
            </div>
        </div>
    );
}
export default ProgressHeader;
