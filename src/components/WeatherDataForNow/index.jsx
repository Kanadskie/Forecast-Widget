import style from './styles.module.css'
import { Icon } from "../Icon"


export const WeatherDataForNow = (props) => {

    const {actual_temp, weather_desc, date, iconId, wind, humidity, pressure, sunrise, sunset} = props

    return (

        <div className={style.weather_block}>

            <Icon iconId={iconId} className={style.weather_block_icon}/>

            <div className={style.weather_block_temp}>{actual_temp}&#176;</div>

            <div className={style.weather_block_desc}>{weather_desc}</div>

            <div className={style.weather_block_date}>

                <div className={style.weather_block_date_now}>{date}</div>
            
                <div className={style.weather_block_date_sun}> 

                    <div className={style.weather_block_date_sun_type}> 
                        
                        <Icon name={'sunrise'} className={style.weather_block_date_sun_type_icon}/>{sunrise}
                    
                    </div>

                    <div className={style.weather_block_date_sun_type}> 

                        <Icon name={'sunset'} className={style.weather_block_date_sun_type_icon}/>{sunset}
                        
                    </div>

                </div>
            
            </div>

            <div className={style.weather_block_indicators}>
                
                <div className={style.weather_block_indicators_type}>
                    
                    <Icon name={'wind'} className={style.weather_block_indicators_type_icon}/>{wind} m/s
                
                </div>
                
                <div className={style.weather_block_indicators_type}>
                    
                    <Icon name={'humidity'} className={style.weather_block_indicators_type_icon}/>{humidity}&#37;
                
                </div>

                <div className={style.weather_block_indicators_type}> 
                    
                    <Icon name={'pressure'} className={style.weather_block_indicators_type_icon}/>{pressure} mm Hg
                
                </div>

            </div>

        </div>

    )

}