import style from './styles.module.css'

export const Switcher = (props) => {

    const {forecastNow, forecastFiveDays} = props

    return (

        <div className={style.switcher}>

            <div className={style.switcher_block}>

                <div className={style.switcher_block_btns}>

                    <button className={`${style.switcher_block_btns_item} ${style.switcher_block_btns_item__one} ${style.switcher_block_btns_item__active}`} onClick={forecastNow}>Now</button>
                    
                    <button className={`${style.switcher_block_btns_item} ${style.switcher_block_btns_item__five}`} onClick={forecastFiveDays}>5 Days </button>

                </div>

            </div>
    
      </div>
    
    )
}