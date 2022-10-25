// VARIABLES
const value = document.querySelector('#city')
const btn = document.querySelector('button')
const historyComponent = document.getElementById('historyComponent')
let city
const today = moment()
const currentCalendarDay = today.format('dddd MMMM Do YYYY')

// EVENTS
// default load info for Toronto
window.addEventListener('DOMContentLoaded', () => {
  getData('Toronto')
  createSearchHistoryBtn('toronto')
})

btn.addEventListener('click', () => {
  city = getUserInput()
  getData(city)
})

// FUNCTIONS
function getUserInput() {
  const input = value.value.toLowerCase()

  createSearchHistoryBtn(input)
  return input
}

// search history func
function createSearchHistoryBtn(input) {
  // create a button
  const btn = document.createElement('button')
  btn.classList.add('history-btn')
  btn.setAttribute('type', 'submit')
  btn.setAttribute('id', input)
  btn.textContent = input
  btn.addEventListener('click', (e) => {
    getData(e.target.id)
  })

  // create array to manipulate btns
  const historyBtns = Array.from(historyComponent.children)

  if (historyBtns.length === 0) {
    historyComponent.appendChild(btn)
  }

  // filter to make sure no duplicate btns are made
  const check = historyBtns.filter((btn) => {
    return btn.id === input
  })

  if (check.length === 0) {
    historyComponent.appendChild(btn)
  }
}

function getData(city) {
  const urlInput = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=c5d74192f81b74ae39527badb8dc8534&units=metric`

  const forecastUrlInput = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c5d74192f81b74ae39527badb8dc8534&units=metric`

  // get the same day forecast
  fetch(urlInput)
    .then((response) => response.json())
    .then((data) => {
      const weatherInfoData = [data]

      displayIcon(weatherInfoData)
      displayText(weatherInfoData)
    })

  // Get the 5 day forecast
  fetch(forecastUrlInput)
    .then((response) => response.json())
    .then((forecastData) => {
      const forecastArrayData = forecastData.list

      const forecastArrayToDisplay = []
      forecastArrayData.forEach((fc) => {
        if (fc.dt_txt.includes('15:00:00')) {
          forecastArrayToDisplay.push(fc)
        }
      })

      displayForecastInfo(forecastArrayToDisplay)
      displayForecastIcons(forecastArrayToDisplay)
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
}

// change for 5 day forecast
function displayForecastIcons(filteredWeatherArray) {
  const forecastIcons = document.querySelectorAll('div.card i')

  forecastIcons.forEach((forecastIcon, index) => {
    const weatherArrayInfo = filteredWeatherArray[index].weather[0]
    const icon = weatherArrayInfo.icon
    const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`

    forecastIcon.innerHTML = `<img src="${iconURL}" alt="weather icon for ${weatherArrayInfo.description}" />`
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

  weatherArray.forEach((weatherArrayInfo, index) => {
    // starting point number for purposes of moment.js methods
    const startingPoint = moment().day()

    forecastCards[index].children[0].textContent = `${moment()
      .day(startingPoint + (index + 1))
      .format('dddd MMMM Do YYYY')}`

    forecastCards[index].children[1].textContent = `Min: ${Math.floor(
      weatherArrayInfo.main.temp_min
    )}℃`
    forecastCards[index].children[2].textContent = `Max: ${Math.floor(
      weatherArrayInfo.main.temp_max
    )}℃`
    forecastCards[
      index
    ].children[3].textContent = `Wind: ${weatherArrayInfo.wind.speed}MPH`
    forecastCards[
      index
    ].children[4].textContent = `Humidity: ${weatherArrayInfo.main.humidity}%`
  })
}
