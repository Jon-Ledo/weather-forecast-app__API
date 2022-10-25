# Weather Forecast Dashboard (with API

## Links

- Live Site URL: [live site](https://jon-ledo.github.io/weather-forecast-app__API/)
- Repo: [repo](https://github.com/Jon-Ledo/weather-forecast-app__API)
- [openweathermap API, current day data](https://openweathermap.org/current)
- [openweathermap API, forecast data](https://openweathermap.org/forecast5)

## Preview

![preview of weather dashboard](./Assets/weatherAPI-preview.JPG)

## Tech Used

- HTML
- CSS
- Bootstrap
- JavaScript
- 3rd party API's
  - openweathermap API (1day forecast): [link](https://openweathermap.org/current)
  - openweathermap API (5day forecast): [link](https://openweathermap.org/forecast5)
  - momentJS: [link](https://momentjs.com/)

## Description

Single page site that makes requests to the openweathermap API based on a user's input. After typing in and submitting the name of a city, (ex. 'Toronto') the API is called and JavaScript is used to dynamically update the DOM with the data being fetched. The information being used:
- City Name
- Current & forecasted dates
- Current weather
- winds
- humidity
- Temperature feels like (min and max)
- weather icons

The information in the top half of the page represents the current date weather information, and the lower half features 5 cards with all the same relevant information, but with the next 5 days. 

MomentJS is imported to easily modify the date formats being used in the project. 

## Issues
Currently, the free APIs used here are not offering the uv index data, so there is a preset number and colour assigned for the time being. There is a function at the end of the app.js to resemble a sort of skeleton, of how I would approach changing the color to the uv index text. 
