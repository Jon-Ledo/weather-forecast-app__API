// VARIABLES
let weatherInfoData = []
const value = document.querySelector('#city')
const btn = document.querySelector('button')
let city

// events
btn.addEventListener('click', () => {
  city = getUserInput()
  getData(city)
})

// functions
function getUserInput() {
  const input = value.value
  return input
}

function getData(city) {
  const urlInput = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=c5d74192f81b74ae39527badb8dc8534&units=metric`

  fetch(urlInput)
    .then((response) => response.json())
    .then((data) => {
      weatherInfoData.push(data)
      console.log(weatherInfoData)
      console.log(weatherInfoData[0].name)
    })
}
