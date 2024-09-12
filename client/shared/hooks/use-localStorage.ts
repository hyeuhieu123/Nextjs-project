import { useEffect, useState } from "react";

type SetValue<T> = T | ((prevValue: T) => T);

function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: SetValue<T>) => void] {
    const [value, setValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error reading localStorage key “' + key + '”:', error);
            return defaultValue;
        }
    });

    useEffect(() => {
        function handler(e: StorageEvent) {
            if (e.key === key) {
                const lsi = localStorage.getItem(key);
                setValue(lsi ? JSON.parse(lsi) : defaultValue);
            }
        }

        window.addEventListener("storage", handler);

        return () => {
            window.removeEventListener("storage", handler);
        };
    }, [key, defaultValue]);

    const setValueWrap = (value: SetValue<T>) => {
        try {
            setValue(prevValue => {
                const newValue = typeof value === "function" ? (value as (prevValue: T) => T)(prevValue) : value;
                localStorage.setItem(key, JSON.stringify(newValue));
                // Notify other windows of the change
                const event = new StorageEvent("storage", { key, newValue: JSON.stringify(newValue) });
                window.dispatchEvent(event);
                return newValue;
            });
        } catch (e) {
            console.error('Error setting localStorage key “' + key + '”:', e);
        }
    };

    return [value, setValueWrap];
}

export default useLocalStorage;
