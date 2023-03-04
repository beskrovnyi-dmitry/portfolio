import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "./forecast.css";

const WEEK_DAYS = ['Понеділок', 'Вівторок', 'Середа', 'Четверг', 'П\'ятниця', 'Субота', 'Неділя'];

const Forecast = ({ data, DESC }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));
  
  return (
    <>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">{DESC[item.weather[0].description]}</label>
                  <label className="min-max">{Math.round(item.main.temp_max)}°C /{Math.round(item.main.temp_min)}°C</label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Тиск:</label>
                  <label>{item.main.pressure} гПА</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Вологість:</label>
                  <label>{item.main.humidity} %</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Хмарність:</label>
                  <label>{item.clouds.all} %</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Вітер:</label>
                  <label>{item.wind.speed} м/с</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Висота над рівнем моря: </label>
                  <label>{ item.main.sea_level} м</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Вiдчувається як:</label>
                  <label>{item.main.feels_like}°C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
