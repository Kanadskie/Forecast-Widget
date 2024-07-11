import style from './styles.module.css'
import { Icon } from "../Icon"


export const WeatherDataForFiveDays = (props) => {

    const {actual_temp, weather_desc, date, iconId} = props

    return (

        <>

            <div className={style.weather_block}>

                <div className={style.weather_block_item}>

                    <div className={style.weather_block_item_date}>{date}</div>

                    <Icon iconId={iconId} className={style.weather_block_item_icon}/>

                    <div className={style.weather_block_item_temp}>{actual_temp}&#176;</div>

                    <div className={style.weather_block_item_desc}>{weather_desc}</div>

                </div>

            </div>

            <hr className={style.hr}></hr>

        </>

    )

}