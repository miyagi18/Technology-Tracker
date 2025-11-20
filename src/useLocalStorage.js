import { useState, useEffect } from "react";

function getSavedValue(key, initialValue)
{
    const saved = localStorage.getItem(key);
    if (saved)
    {
        return JSON.parse(saved);
    }

    if (initialValue instanceof Function)
    {
        return initialValue();
    }
    return initialValue;
}

function useLocalStorage(key, initialValue)
{
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}

export default useLocalStorage;