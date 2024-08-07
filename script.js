// PROMENNE
let docDegrees = document.querySelector('.degrees')
let docIcon = document.querySelector('.weather-img')
let docCity = document.querySelector('.city-name')
let docWind = document.querySelector('.wind')
let docHumidity = document.querySelector('.humidity')
let docCountry = document.querySelector('.country-name')
let errorMessage = document.querySelector('.error')

// PRVOTNI NASTAVENI
const apiKey = '4cdbf4dae2e1412a5e2e68e3032ca713'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric'
let iconUrl = 'https://openweathermap.org/img/wn/'

async function firstWeather(){
    let response = await fetch(apiUrl + `&appid=${apiKey}&q=gallarate`)
    let data = await response.json()

    // Ikona pocasi
    let icon = data.weather[0].icon
    docIcon.src = iconUrl + `${icon}@4x.png`

    // Teplota
    let degrees = Math.round(data.main.temp) + '°C'
    docDegrees.textContent = degrees

    // Vitr a vzdusna vlhkost
    let wind = data.wind.speed + ' km/h'
    let humidity = data.main.humidity + '%'
    docWind.innerHTML = `${wind}<br>Wind speed`
    docHumidity.innerHTML = `${humidity}<br>Humidity` 
}
firstWeather()



// PRIPOJENI K OPENWEATHER + FUNKCE
async function checkWeather(city){
    try {
        const response = await fetch(apiUrl + `&appid=${apiKey}&q=${city}`)
        let data = await response.json()
        let object = {
            city: data.name,
            country: data.sys.country,
            temp: Math.round(data.main.temp) + '°C',
            tempFeelsLike: Math.round(data.main.feels_like) + '°C',
            icon: data.weather[0].icon,
            humidity: data.main.humidity + '%',
            wind: data.wind.speed + ' km/h'
        }

        // VLOZENI DAT DO STRANKY
        errorMessage.style.display = 'none'
        docIcon.src = iconUrl + `${object.icon}@4x.png`
        docDegrees.textContent = object.temp
        docCity.textContent = object.city
        docCountry.textContent = object.country
        docWind.innerHTML = `${object.wind}<br>Wind speed`
        docHumidity.innerHTML = `${object.humidity}<br>Humidity`
    } catch(error) {
        console.error('Error', error)
        console.log('bacha')
        errorMessage.style.display = 'flex'
    }   
}


// PRIDANI EVENT LISTENERU K FORMULARI
let form = document.querySelector('.find-city-form')

form.addEventListener('submit', function(event){
    event.preventDefault()
    city = event.target.elements.textInput.value
    checkWeather(city)
    event.target.elements.textInput.value = ''
})