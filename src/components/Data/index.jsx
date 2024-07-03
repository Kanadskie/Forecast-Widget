import style from './styles.module.css'

import switcher_style from '../../components/Switcher/styles.module.css'

import { useState, useEffect } from 'react'

import { Search } from '../Search'

import { Error } from '../Error'

import { Switcher } from '../Switcher'

import { Position } from '../Position'

import { WeatherDataForNow } from '../WeatherDataForNow'

import { WeatherDataForFiveDays } from '../WeatherDataForFiveDays'


const key = process.env.REACT_APP_WEATHER_API_KEY


export const Data = () => {

    let [currentCoords, setCurrentCoords] = useState({latitude: 52.374, longitude: 4.889})

    let [currentData, setCurrentData] = useState(null)

    let [currentForecast, setCurrentForecast] = useState(null)

    let [currentCity, setCurrentCity] = useState('')

    let [currentCityData, setCurrentCityData] = useState(null)

    let [currentError, setError] = useState(null)

    let [typeOfSearch, setTypeOfSearch] = useState('')

    let [showForecastForNow, setShowForecastForNow] = useState(true)

    let [showForecastForFiveDays, setShowForecastForFiveDays] = useState(false)

    let [showError, setShowError] = useState(false)

    let [btnDisabled, setBtnDisabled] = useState(true)

    useEffect(() => {

        try {

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currentCoords.latitude}&lon=${currentCoords.longitude}&appid=${key}`)
            .then(res => res.json())
            .then(data => setCurrentData(data))

            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${currentCoords.latitude}&lon=${currentCoords.longitude}&appid=${key}`)
            .then(res => res.json())
            .then(data => setCurrentForecast(data))

        } catch (err) {

            setShowError(true)

            setError(`Ooops..! Something went wrong. Possibly due to network failure. Please try again later...`)
            
        }

    }, [currentCoords])

    useEffect(() => {

        try {

            fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${currentCity},&appid=${key}`)
            .then(res => res.json())
            .then(data => setCurrentCityData(data))

        } catch (err) {

            setShowError(true)

            setError(`Ooops..! Something went wrong. Possibly due to network failure. Please try again later...`)

        }

    }, [currentCity])


    const GetGeo = () => {

        function success(position) {

            setCurrentCoords(currentCoords = {latitude: position.coords.latitude, longitude: position.coords.longitude})

            setShowError(false)

            setTypeOfSearch('geolocation')
            
        }

        function error() {

            setShowError(true)

            setTypeOfSearch('')

            setError('To show weather in your geolocation your browser or device need to allow this, please do it and after try again...')

        }
        
        navigator.geolocation.getCurrentPosition(success, error)

    }

    const GetWeatherByCity = () => {        

        if (!currentCityData.hasOwnProperty(0)) {

            setShowError(true)

            setError('You typed wrong name of the city, please correct it and try again...')

        } else {

            setShowError(false)

            setCurrentCoords(currentCoords = {latitude: currentCityData[0].lat, longitude: currentCityData[0].lon})

            setBtnDisabled(true)

            document.getElementById('input').value = ''

            setTypeOfSearch('')

        }
    }
        
    const GetWeatherForNow = () => {

        setShowForecastForNow(true)

        setShowForecastForFiveDays(false)

        let btnNow = document.querySelector('[class*="switcher_block_btns_item__one"]')

        let btnFive = document.querySelector('[class*="switcher_block_btns_item__five"]')

        btnNow.classList.add(`${switcher_style.switcher_block_btns_item__active}`)

        btnFive.classList.remove(`${switcher_style.switcher_block_btns_item__active}`)
        
    }

    const GetWeatherForFiveDays = () => {

        setShowForecastForNow(false)

        setShowForecastForFiveDays(true)

        let btnNow = document.querySelector('[class*="switcher_block_btns_item__one"]')

        let btnFive = document.querySelector('[class*="switcher_block_btns_item__five"]')

        btnNow.classList.remove(`${switcher_style.switcher_block_btns_item__active}`)

        btnFive.classList.add(`${switcher_style.switcher_block_btns_item__active}`)
        
    }

    const AllowToSend = (e) => {

        setShowError(false)

        setCurrentCity(e.target.value)

        if (e.target.value !== '') {

            setBtnDisabled(false)

        } else {

            setBtnDisabled(true)

        }

    }

    const KeyBoardListener = (e) => {

        if (e.code === "Enter") {

            GetWeatherByCity()

        }

    }

    const ConvertTemp = (temp) => {

        let result = Math.round(temp - 273.15)

        return result

    }

    const ConvertDate = (date) => {

        return new Date(date * 1000).toUTCString().substring(0, 11)

    }

    const ConvertSunTime = (sun, timezone) => {

        return new Date((sun + timezone) * 1000).toUTCString().substring(17, 22)

    }

    return (

        <div className={style.weather}>

                {currentData && <Position

                    iconName = {typeOfSearch}
                    cityName = {('name' in currentData) && (currentData.name !== '') ? currentData.name : 'n/d'}
                    country = {('sys' in currentData) && ('country' in currentData.sys) && (currentData.sys.country !== '') ? currentData.sys.country : 'n/d'}
                    
                />}

                {currentData && <Switcher 
                
                    forecastNow = {GetWeatherForNow}
                    forecastFiveDays = {GetWeatherForFiveDays}

                />}

            <div className={style.now}>

                {currentData && showForecastForNow && <WeatherDataForNow

                    iconId = {('weather' in currentData) && ('icon' in currentData.weather[0]) && (currentData.weather[0].icon !== '') ? currentData.weather[0].icon : 'no_image'}
                    actual_temp = {('main' in currentData) && ('temp' in currentData.main) && (currentData.main.temp !== '')  ? (ConvertTemp(currentData.main.temp)) : 'n'}
                    weather_desc = {('weather' in currentData) && ('description' in currentData.weather[0]) && (currentData.weather[0].description !== '')  ? currentData.weather[0].description : 'n/d'}
                    date = {('dt' in currentData) && (currentData.dt !== '') ? (ConvertDate(currentData.dt)) : 'n/d'}
                    wind = {('wind' in currentData) && ('speed' in currentData.wind) && (currentData.wind.speed !== '') ? (Math.round(currentData.wind.speed)) : 'n/d'}
                    humidity = {('main' in currentData) && ('humidity' in currentData.main) && (currentData.main.humidity !== '') ? currentData.main.humidity : 'n/d'}
                    pressure = {('main' in currentData) && ('pressure' in currentData.main) && (currentData.main.pressure !== '') ? (Math.round((currentData.main.pressure)/1.33322)) : 'n/d'}
                    sunrise = {('sys' in currentData) && ('sunrise' in currentData.sys) && (currentData.sys.sunrise !== '' || (currentData.timezone !== '')) ? (ConvertSunTime(currentData.sys.sunrise, currentData.timezone)) : 'n/d'}
                    sunset = {('sys' in currentData) && ('sunset' in currentData.sys) && (currentData.sys.sunset !== '' || (currentData.timezone !== '')) ? (ConvertSunTime(currentData.sys.sunset, currentData.timezone)) : 'n/d'}

                />}
            
            </div>

            <div className={style.forecast}>

                {currentForecast && showForecastForFiveDays && <WeatherDataForFiveDays

                    iconId = {('list' in currentForecast) && ('weather' in currentForecast.list[7]) && ('icon' in currentForecast.list[7].weather[0]) && (currentForecast.list[7].weather[0].icon !== '') ? currentForecast.list[7].weather[0].icon : 'no_image'}
                    actual_temp = {('list' in currentForecast) && ('main' in currentForecast.list[7]) && ('temp' in currentForecast.list[7].main) && (currentForecast.list[7].main.temp !== '') ? (ConvertTemp(currentForecast.list[7].main.temp)) : 'n'}
                    weather_desc = {('list' in currentForecast) && ('weather' in currentForecast.list[7]) && ('description' in currentForecast.list[7].weather[0]) && (currentForecast.list[7].weather[0].description !== '') ? currentForecast.list[7].weather[0].description : 'n/d'}
                    date = {('list' in currentForecast) && ('dt' in currentForecast.list[7]) && (currentForecast.list[7].dt !== '') ? (ConvertDate(currentForecast.list[7].dt)) : 'n/d'}

                />}
                
                {currentForecast && showForecastForFiveDays && <WeatherDataForFiveDays

                    iconId = {('list' in currentForecast) && ('weather' in currentForecast.list[15]) && ('icon' in currentForecast.list[15].weather[0]) && (currentForecast.list[15].weather[0].icon !== '') ? currentForecast.list[15].weather[0].icon : 'no_image'}
                    actual_temp = {('list' in currentForecast) && ('main' in currentForecast.list[15]) && ('temp' in currentForecast.list[15].main) && (currentForecast.list[15].main.temp !== '') ? (ConvertTemp(currentForecast.list[15].main.temp)) : 'n'}
                    weather_desc = {('list' in currentForecast) && ('weather' in currentForecast.list[15]) && ('description' in currentForecast.list[15].weather[0]) && (currentForecast.list[15].weather[0].description !== '') ? currentForecast.list[15].weather[0].description : 'n/d'}
                    date = {('list' in currentForecast) && ('dt' in currentForecast.list[15]) && (currentForecast.list[15].dt !== '') ? (ConvertDate(currentForecast.list[15].dt)) : 'n/d'}

                />}

                {currentForecast && showForecastForFiveDays && <WeatherDataForFiveDays

                    iconId = {('list' in currentForecast) && ('weather' in currentForecast.list[23]) && ('icon' in currentForecast.list[23].weather[0]) && (currentForecast.list[23].weather[0].icon !== '') ? currentForecast.list[23].weather[0].icon : 'no_image'}
                    actual_temp = {('list' in currentForecast) && ('main' in currentForecast.list[23]) && ('temp' in currentForecast.list[23].main) && (currentForecast.list[23].main.temp !== '') ? (ConvertTemp(currentForecast.list[23].main.temp)) : 'n'}
                    weather_desc = {('list' in currentForecast) && ('weather' in currentForecast.list[23]) && ('description' in currentForecast.list[23].weather[0]) && (currentForecast.list[23].weather[0].description !== '') ? currentForecast.list[23].weather[0].description : 'n/d'}
                    date = {('list' in currentForecast) && ('dt' in currentForecast.list[23]) && (currentForecast.list[23].dt !== '') ? (ConvertDate(currentForecast.list[23].dt)) : 'n/d'}

                />}

                {currentForecast && showForecastForFiveDays && <WeatherDataForFiveDays

                    iconId = {('list' in currentForecast) && ('weather' in currentForecast.list[31]) && ('icon' in currentForecast.list[31].weather[0]) && (currentForecast.list[31].weather[0].icon !== '') ? currentForecast.list[31].weather[0].icon : 'no_image'}
                    actual_temp = {('list' in currentForecast) && ('main' in currentForecast.list[31]) && ('temp' in currentForecast.list[31].main) && (currentForecast.list[31].main.temp !== '') ? (ConvertTemp(currentForecast.list[31].main.temp)) : 'n'}
                    weather_desc = {('list' in currentForecast) && ('weather' in currentForecast.list[31]) && ('description' in currentForecast.list[31].weather[0]) && (currentForecast.list[31].weather[0].description !== '') ? currentForecast.list[31].weather[0].description : 'n/d'}
                    date = {('list' in currentForecast) && ('dt' in currentForecast.list[31]) && (currentForecast.list[31].dt !== '') ? (ConvertDate(currentForecast.list[31].dt)) : 'n/d'}

                />}

                {currentForecast && showForecastForFiveDays && <WeatherDataForFiveDays

                    iconId = {('list' in currentForecast) && ('weather' in currentForecast.list[39]) && ('icon' in currentForecast.list[39].weather[0]) && (currentForecast.list[39].weather[0].icon !== '') ? currentForecast.list[39].weather[0].icon : 'no_image'}
                    actual_temp = {('list' in currentForecast) && ('main' in currentForecast.list[39]) && ('temp' in currentForecast.list[39].main) && (currentForecast.list[5].main.temp !== '') ? (ConvertTemp(currentForecast.list[39].main.temp)) : 'n'}
                    weather_desc = {('list' in currentForecast) && ('weather' in currentForecast.list[39]) && ('description' in currentForecast.list[39].weather[0]) && (currentForecast.list[5].weather[0].description !== '') ? currentForecast.list[39].weather[0].description : 'n/d'}
                    date = {('list' in currentForecast) && ('dt' in currentForecast.list[39]) && (currentForecast.list[39].dt !== '') ? (ConvertDate(currentForecast.list[39].dt)) : 'n/d'}

                />}

            </div>

            {currentData && <Search
                findWeatherByCityName = {GetWeatherByCity}
                myLocation = {GetGeo}
                btnStatus = {btnDisabled}
                onChange = {AllowToSend}
                onKeyUp = {KeyBoardListener}
            />}
            
            {showError && <Error errorMsg = {currentError} />}
               
        </div>

    )

}