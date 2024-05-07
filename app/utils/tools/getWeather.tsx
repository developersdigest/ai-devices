export async function getCurrentWeather(latitude: number, longitude: number): Promise<string> {
    const params = {
        latitude: String(latitude),
        longitude: String(longitude),
        hourly: "temperature_2m",
        format: "json",
    };

    const url = "https://api.open-meteo.com/v1/forecast";

    const response = await fetch(url + "?" + new URLSearchParams(params));
    const data = await response.json();

    const parsedData = JSON.parse(JSON.stringify(data));

    const weatherData = parsedData.hourly.time.map((time: string, index: number) => ({
        time,
        temperature: parsedData.hourly.temperature_2m[index],
    }));

    const formattedData = JSON.stringify(weatherData);

    return formattedData;
}