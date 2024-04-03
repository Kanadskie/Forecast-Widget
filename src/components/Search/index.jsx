import style from './styles.module.css'

import { Icon } from '../Icon'

export const Search = (props) => {

    const {findWeatherByCityName, myLocation, btnStatus, onChange, onKeyUp} = props
    
    return (

        <div className={style.search}>

            <div className={style.search_block}>

                <input className={style.search_block_input} autoComplete='off' id='input' onChange={onChange} onKeyUp={onKeyUp} type='search' placeholder="Type city"></input>
                
                <button className={`${style.btn} ${style.btn_search}`} title="You can make your request only if you have typed city name" disabled={btnStatus} id='btnSearch' onClick={findWeatherByCityName} type='submit'><Icon name={'search'} className={style.btn_icon} /></button>
            
            </div>

            <button className={`${style.btn} ${style.btn_location}`} id='btnGeo' onClick={myLocation} type='submit'>My Location</button>

        </div>

    )

}
