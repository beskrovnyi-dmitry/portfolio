import React from "react";
import "./current-weather.css";

const CurrentWeather = ({ data, DESC }) => {
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="weather-description">{DESC[data.weather[0].description]}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`}
        />
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(data.main.temp)}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Деталi</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Вiдчувається як</span>
            <span className="parameter-value">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Вiтер</span>
            <span className="parameter-value">{data.wind.speed} м/с</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Вологiсть</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Тиск</span>
            <span className="parameter-value">{data.main.pressure} гПа</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
