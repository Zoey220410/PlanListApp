import axios from "axios";

const key = "c1fc1b795d54119cad71d910c54064ae";

export const getWeather = async (lat, lon) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
    const weatherResponse = await axios.get(url);

    const weatherData = weatherResponse.data;
    return weatherData;
  } catch (error) {
    console.error("Error:", error);
  }
};
