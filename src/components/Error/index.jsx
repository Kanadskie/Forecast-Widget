import style from './styles.module.css'

import { Icon } from '../Icon'

export const Error = (props) => {

    const {errorMsg} = props 

    return (

        <div className={style.error}>

            <Icon name={'warning'} className={style.error_icon} />

            <div className={style.error_msg}>{errorMsg}</div>

        </div>
    )
}