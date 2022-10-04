// VARIABLES
let weatherInfoData = []
const value = document.querySelector('#city')
const btn = document.querySelector('button')
let city
const today = moment()
const currentCalendarDay = today.format('dddd MMMM Do YYYY')

// EVENTS
// default load info for Toronto
window.addEventListener('DOMContentLoaded', () => {
  getData('Toronto')
})

btn.addEventListener('click', () => {
  city = getUserInput()
  getData(city)
})

// functions
function getUserInput() {
  const removeOldData = weatherInfoData.pop()
  const input = value.value
  return input
}

function getData(city) {
  const urlInput = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=c5d74192f81b74ae39527badb8dc8534&units=metric`

  fetch(urlInput)
    .then((response) => response.json())
    .then((data) => {
      weatherInfoData.push(data)
      displayIcon(weatherInfoData)
      displayText(weatherInfoData)
      displayForecastInfo(weatherInfoData)
    })
}

function displayIcon(weatherArray) {
  const weatherArrayInfo = weatherArray[0].weather[0]
  const icon = weatherArrayInfo.icon
  const description = weatherArrayInfo.description
  const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`
  const iconEl = document.querySelector('#icon')

  // change main display
  iconEl.innerHTML = `<img src="${iconURL}" alt="weather icon for ${description}" />`

  // change for 5 day forecast
  const forecastIcons = document.querySelectorAll('div.card i')
  forecastIcons.forEach((forecastIcon) => {
    forecastIcon.innerHTML = `<img src="${iconURL}" alt="weather icon for ${description}" />`
  })
}

function displayText(weatherArray) {
  const weatherArrayInfo = weatherArray[0]
  const cityName = document.querySelector('#cityName')
  const currentDate = document.querySelector('#currentDate')
  const currentTemp = document.querySelector('#currentTemp')
  const cardDescription = document.querySelector('#cardDesc')
  const humidity = document.querySelector('#humidity')
  const winds = document.querySelector('#winds')
  const tempFeelsLike = document.querySelector('#tempFeelsLike')

  cityName.textContent = weatherArrayInfo.name
  currentDate.textContent = currentCalendarDay
  currentTemp.textContent = `${Math.floor(weatherArrayInfo.main.temp)}℃`
  cardDescription.textContent = weatherArrayInfo.weather[0].description

  humidity.textContent = `${weatherArrayInfo.main.humidity}%`
  winds.textContent = `${weatherArrayInfo.wind.speed}MPH`
  tempFeelsLike.textContent = `${Math.floor(weatherArrayInfo.main.feels_like)}℃`
}

function displayForecastInfo(weatherArray) {
  const forecastCards = document.querySelectorAll('section.mt-5 div.card-body')

  const weatherArrayInfo = weatherArray[0]

  // starting point number for purposes of moment.js methods
  const startingPoint = moment().day()

  forecastCards.forEach((card, index) => {
    card.children[0].textContent = `${moment()
      .day(startingPoint + (index + 1))
      .format('dddd MMMM Do YYYY')}`
    card.children[1].textContent = `Min: ${Math.floor(
      weatherArrayInfo.main.temp_min
    )}℃`
    card.children[2].textContent = `Max: ${Math.floor(
      weatherArrayInfo.main.temp_max
    )}℃`
    card.children[3].textContent = `Wind: ${weatherArrayInfo.wind.speed}MPH`
    card.children[4].textContent = `Humidity: ${weatherArrayInfo.main.humidity}%`
  })
}
