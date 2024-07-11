import style from './styles.module.css'


export const Switcher = (props) => {

    const {forecastNow, forecastFiveDays, btn_now, btn_five} = props

    return (

        <div className={style.switcher}>

            <div className={style.switcher_block}>

                <div className={style.switcher_block_btns}>

                    <button className={`${btn_now}`} onClick={forecastNow}>Now</button>
                    
                    <button className={`${btn_five}`} onClick={forecastFiveDays}>5 Days </button>

                </div>

            </div>
    
      </div>
    
    )
}