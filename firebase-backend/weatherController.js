import axios from "axios";

const key = "c1fc1b795d54119cad71d910c54064ae";

export const getWeather = async (lat, lon) => {
  try {
    console.log(lat);
    console.log(lon);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
    const weatherResponse = await axios.get(url);

    const weatherData = weatherResponse.data;
    return weatherData;
    const temperature = weatherData.current.temp_c;
    const condition = weatherData.current.condition.text;

    // 构造日程安排建议
    let scheduleAdvice = "";

    if (temperature > 25) {
      scheduleAdvice = "It's hot today. Consider scheduling indoor activities.";
    } else if (temperature < 10) {
      scheduleAdvice =
        "It's cold today. Consider scheduling outdoor activities.";
    } else {
      scheduleAdvice = "The weather is moderate. Enjoy your day!";
    }

    // 将日程安排建议发送回日历应用
    res.json({ advice: scheduleAdvice });
  } catch (error) {
    console.error("Error:", error);
  }
};
