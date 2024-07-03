import style from './styles.module.css'

import { Icon } from "../Icon"


export const Position = (props) => {

    const {cityName, country, iconName} = props

    const StringCutter = (str, n) => {

        if (str.length > n) {
            let strOne = str.substring(0, n)
            let strTwo = str.substring(n, str.length + 1)
            let result = `${strOne}-\n${strTwo}`
            return result

        } else {

            return str

        }
    
    }

    return (

        <div className={style.geo_block}>

            <Icon name={iconName} className={style.geo_block_icon}/>
            
            <div className={style.geo_block_location}>{StringCutter(`${cityName}`, 15)}, {country}</div>

        </div>

    )

}