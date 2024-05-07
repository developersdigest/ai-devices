import { useEffect, useState } from 'react';
import Clock from 'react-clock';

export function ClockComponent() {
    const [value, setValue] = useState(new Date());


    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
            <Clock value={value} size={200} />
    );
}