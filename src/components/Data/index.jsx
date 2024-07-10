import style from './styles.module.css'
import style_switcher from '../../components/Switcher/styles.module.css'
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
    let [filtredForecast, setFiltredForecast] = useState(null)
    let [currentCity, setCurrentCity] = useState('')
    let [currentCityData, setCurrentCityData] = useState(null)
    let [currentError, setError] = useState(null)
    let [typeOfSearch, setTypeOfSearch] = useState('')
    let [showForecastForNow, setShowForecastForNow] = useState(true)
    let [showForecastForFiveDays, setShowForecastForFiveDays] = useState(false)
    let [showError, setShowError] = useState(false)
    let [btnDisabled, setBtnDisabled] = useState(true)
    let [nowBtnActive, setNowBtnActive] = useState(true)
    let [fiveBtnActive, setFiveBtnActive] = useState(false)


    useEffect(() => {

        let getUrl = (timeStampsNumber) => {

            let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${currentCoords.latitude}&lon=${currentCoords.longitude}&appid=${key}&cnt=${timeStampsNumber}`

            return url

        }

        fetchData(getUrl(1), setCurrentData)

        fetchData(getUrl(40), setCurrentForecast)

    }, [currentCoords])


    useEffect(() => {

        fetchData(`http://api.openweathermap.org/geo/1.0/direct?q=${currentCity},&appid=${key}`, setCurrentCityData)

        GetTimeStamps(currentForecast, setFiltredForecast, [7, 15, 23, 31, 39])

    }, [currentCity, currentForecast])


    async function fetchData(url, storage) {

        try {

            const response = await fetch(url)

            const data = await response.json()

            return storage(data)

        } catch(e) {

            console.error(e)

            setShowError(true)

            setError(`Ooops..! Something went wrong. Possibly due to network failure. Please try again later...`)

        }

    }

    const GetTimeStamps = (storage, filtredStorage, stampsNumbers) => {

        if (storage !== null) {

            filtredStorage(storage.list.filter((_, i) => stampsNumbers.includes(i)))
                
        }

    }

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
        
    const HandleNowClick = () => {

        setShowForecastForNow(true)

        setShowForecastForFiveDays(false)

        setNowBtnActive(true)

        setFiveBtnActive(false)
        
    }

    const HandleFiveDaysClick = () => {

        setShowForecastForNow(false)

        setShowForecastForFiveDays(true)

        setNowBtnActive(false)
        
        setFiveBtnActive(true)

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
                    cityName = {('city' in currentData) && (currentData.city.name !== '') ? currentData.city.name : 'n/d'}
                    country = {('city' in currentData) && ('country' in currentData.city) && (currentData.city.country !== '') ? currentData.city.country : 'n/d'}
                    
                />}

                {currentData && <Switcher 
                
                    forecastNow = {HandleNowClick}
                    forecastFiveDays = {HandleFiveDaysClick}
                    btn_now = {nowBtnActive ? `${style_switcher.switcher_block_btns__item} ${style_switcher.active}` : `${style_switcher.switcher_block_btns__item}`}
                    btn_five = {fiveBtnActive ? `${style_switcher.switcher_block_btns__item} ${style_switcher.active}` : `${style_switcher.switcher_block_btns__item}`}

                />}

            <div className={style.now}>

                {currentData && showForecastForNow && <WeatherDataForNow

                    iconId = {('list' in currentData) && ('icon' in currentData.list[0].weather[0]) && (currentData.list[0].weather[0].icon !== '') ? currentData.list[0].weather[0].icon : 'no_image'}
                    actual_temp = {('list' in currentData) && ('temp' in currentData.list[0].main) && (currentData.list[0].main !== '') ? (ConvertTemp(currentData.list[0].main.temp)) : 'n'}
                    weather_desc = {('list' in currentData) && ('description' in currentData.list[0].weather[0]) && (currentData.list[0].weather[0].description !== '')  ? currentData.list[0].weather[0].description : 'n/d'}
                    date = {('list' in currentData) && (currentData.list[0].dt !== '') ? (ConvertDate(currentData.list[0].dt)) : 'n/d'}
                    wind = {('list' in currentData) && ('speed' in currentData.list[0].wind) && (currentData.list[0].wind.speed !== '') ? (Math.round(currentData.list[0].wind.speed)) : 'n/d'}
                    humidity = {('list' in currentData) && ('humidity' in currentData.list[0].main) && (currentData.list[0].main.humidity !== '') ? currentData.list[0].main.humidity : 'n/d'}
                    pressure = {('list' in currentData) && ('pressure' in currentData.list[0].main) && (currentData.list[0].main.pressure !== '') ? (Math.round((currentData.list[0].main.pressure)/1.33322)) : 'n/d'}
                    sunrise = {('city' in currentData) && ('sunrise' in currentData.city) && (currentData.city.sunrise !== '' || (currentData.city.timezone !== '')) ? (ConvertSunTime(currentData.city.sunrise, currentData.city.timezone)) : 'n/d'}
                    sunset = {('city' in currentData) && ('sunset' in currentData.city) && (currentData.city.sunset !== '' || (currentData.city.timezone !== '')) ? (ConvertSunTime(currentData.city.sunset, currentData.city.timezone)) : 'n/d'}

                />}
            
            </div>

            <div className={style.forecast}>

                {currentForecast && showForecastForFiveDays && Array(5).fill(true).map((_, i) => <WeatherDataForFiveDays 
                
                    key = {i}
                    iconId = {(filtredForecast) && ('weather' in filtredForecast[i]) && ('icon' in filtredForecast[i].weather[0]) && (filtredForecast[i].weather[0].icon !== '') ? filtredForecast[i].weather[0].icon : 'no_image'}
                    actual_temp = {(filtredForecast) && ('main' in filtredForecast[i]) && ('temp' in filtredForecast[i].main) && (filtredForecast[i].main.temp !== '') ? (ConvertTemp(filtredForecast[i].main.temp)) : 'n'}
                    weather_desc = {(filtredForecast) && ('weather' in filtredForecast[i]) && ('description' in filtredForecast[i].weather[0]) && (filtredForecast[i].weather[0].description !== '') ? filtredForecast[i].weather[0].description : 'n/d'}
                    date = {(filtredForecast) && ('dt' in filtredForecast[i]) && (filtredForecast[i].dt !== '') ? (ConvertDate(filtredForecast[i].dt)) : 'n/d'}
                
                />) }

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