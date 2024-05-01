import React from 'react';
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from 'react-icons/wi';

interface WeatherDataItem {
    time: string;
    temperature: number;
}

const getWeatherIcon = (temperature: number) => {
    // mock icons for now
    if (temperature >= 25) {
        return <WiDaySunny className="weather-icon text-yellow-500 text-2xl" />;
    } else if (temperature >= 10) {
        return <WiCloudy className="weather-icon text-yellow-500 text-2xl" />;
    } else if (temperature >= 0) {
        return <WiRain className="weather-icon text-yellow-500 text-2xl" />;
    } else {
        return <WiSnow className="weather-icon text-yellow-500 text-2xl" />;
    }
};

const formatTime = (time: string) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedTime = `${formattedHours}:${formattedMinutes}${ampm}`;
    return formattedTime;
};

interface WeatherDataProps {
    data: WeatherDataItem[];
}

export const WeatherData: React.FC<WeatherDataProps> = ({ data }) => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    // Find the index of the current hour in the data array
    const currentIndex = data.findIndex((item) => {
        const itemTime = new Date(item.time);
        return itemTime.getHours() === currentHour;
    });

    // Slice the data array starting from the current index
    const slicedData = data.slice(currentIndex);

    return (
        <div className="weather-data absolute top-0 left-0 right-0 bottom-0 flex items-center justify-end">
            <div className="text-yellow-500 text-shadow-yellow-500 text-xl text-center mx-5">
                <div className="overflow-x-clip whitespace-nowrap flex items-center p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 max-w-[283px]">
                    {slicedData.map((item, index) => (
                        <div key={index} className="flex flex-col items-center mr-4">
                            <div className="text-sm font-bold text-white">{formatTime(item.time)}</div>
                            <div className="text-lg font-bold text-white">{getWeatherIcon(item.temperature)}</div>
                            <div className="text-sm font-bold text-white">{item.temperature}°C</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};