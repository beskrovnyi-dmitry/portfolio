export const geoApiOptions = {
  method: "GET",
  params: {location: 'UA', limit: '1'},
  headers: {
    "X-RapidAPI-Key": "3e2cddf3c5msh84e39770d502dc4p113e1ejsna8366d24aa11",// enter your rapid api key here
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = "0c9221ea03787b7572c6747f2bc461c3"; // enter your key from openweather API
