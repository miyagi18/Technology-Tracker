import useLocalStorage from './useLocalStorage';

const initialTechnologies = [
    {
        id: 1,
        title: 'React Components',
        description: 'Изучение базовых компонентов',
        status: 'not-started',
        notes: '',
        category: 'frontend'
    },
    {
        id: 2,
        title: 'Node.js Basics',
        description: 'Основы серверного JavaScript',
        status: 'not-started',
        notes: '',
        category: 'backend'
    },
    {
        id: 3,
        title: 'CSS Grid',
        description: 'Верстка сложных сеток',
        status: 'in-progress',
        notes: '',
        category: 'frontend'
    },
];

function useTechnologies() {
    const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);

    const updateStatus = (techId, newStatus) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, status: newStatus } : tech
            )
        );
    };

    const updateNotes = (techId, newNotes) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, notes: newNotes } : tech
            )
        );
    };

    const markAllCompleted = () => {
        setTechnologies(prev => prev.map(t => ({ ...t, status: 'completed' })));
    };

    const resetAll = () => {
        setTechnologies(prev => prev.map(t => ({ ...t, status: 'not-started', notes: '' })));
    };

    const calculateProgress = () => {
        if (technologies.length === 0) return 0;
        const completed = technologies.filter(tech => tech.status === 'completed').length;
        return Math.round((completed / technologies.length) * 100);
    };

    return {
        technologies,
        setTechnologies,
        updateStatus,
        updateNotes,
        markAllCompleted,
        resetAll,
        progress: calculateProgress()
    };
}

export default useTechnologies;