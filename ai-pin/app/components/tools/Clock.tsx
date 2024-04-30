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
        <div className='z-10 absolute top-[30px] right-[125px] bottom-0 flex items-center justify-end'>
            <Clock value={value} size={200} />
        </div>
    );
}