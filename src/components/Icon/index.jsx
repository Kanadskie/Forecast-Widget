import { ReactComponent as IconSearch } from '../../icons/search.svg'
import { ReactComponent as IconWarning } from '../../icons/warning.svg'
import { ReactComponent as IconGeolocation } from '../../icons/geolocation.svg'
import { ReactComponent as IconNoImage} from '../../icons/no_image.svg'

import { ReactComponent as IconWind } from '../../icons/wind.svg'
import { ReactComponent as IconHumidity } from '../../icons/humidity.svg'
import { ReactComponent as IconPressure } from '../../icons/pressure.svg'
import { ReactComponent as IconSunRise} from '../../icons/sunrise.svg'
import { ReactComponent as IconSunSet } from '../../icons/sunset.svg'

import { ReactComponent as IconDayClearSky } from '../../icons/weather/types/d_clear_sky.svg'
import { ReactComponent as IconNightClearSky } from '../../icons/weather/types/n_clear_sky.svg'
import { ReactComponent as IconDayFewClouds } from '../../icons/weather/types/d_few_clouds.svg'
import { ReactComponent as IconNightFewClouds } from '../../icons/weather/types/n_few_clouds.svg'
import { ReactComponent as IconScatteredClouds } from '../../icons/weather/types/scattered_clouds.svg'
import { ReactComponent as IconBrokenClouds } from '../../icons/weather/types/broken_clouds.svg'
import { ReactComponent as IconShowerRain } from '../../icons/weather/types/shower_rain.svg'
import { ReactComponent as IconDayRain } from '../../icons/weather/types/d_rain.svg'
import { ReactComponent as IconNightRain } from '../../icons/weather/types/n_rain.svg'
import { ReactComponent as IconThunderstorm} from '../../icons/weather/types/thunderstorm.svg'
import { ReactComponent as IconSnow } from '../../icons/weather/types/snow.svg'
import { ReactComponent as IconMist} from '../../icons/weather/types/mist.svg'


export const Icon = (props) => {

    const {name, className, iconId} = props

    if (name === 'search') {

        return <IconSearch className={className} />

    }

    if (name === 'warning') {

        return <IconWarning className={className} />

    }

    if (name === 'geolocation') {

        return <IconGeolocation className={className} />

    }

    if (iconId === 'no_image') {

        return <IconNoImage className={className} />

    }

    if (name === 'wind') {

        return <IconWind className={className} />

    }

    if (name === 'humidity') {

        return <IconHumidity className={className} />

    }

    if (name === 'pressure') {

        return <IconPressure className={className} />

    }

    if (name === 'sunrise') {

        return <IconSunRise className={className} />

    }

    if (name === 'sunset') {

        return <IconSunSet className={className} />

    }

    if (iconId === '01d') {

        return <IconDayClearSky className={className} />

    }

    if (iconId === '01n') {

        return <IconNightClearSky className={className} />

    }

    if (iconId === '02d') {

        return <IconDayFewClouds className={className} />

    }

    if (iconId === '02n') {

        return <IconNightFewClouds className={className} />

    }

    if (iconId === '03d' || iconId === '03n') {

        return <IconScatteredClouds className={className} />

    }

    if (iconId === '04d' || iconId === '04n') {

        return <IconBrokenClouds className={className} />

    }

    if (iconId === '09d' || iconId === '09n') {

        return <IconShowerRain className={className} />

    }

    if (iconId === '10d') {

        return <IconDayRain className={className} />

    }

    if (iconId === '10n') {

        return <IconNightRain className={className} />

    }

    if (iconId === '11d' || iconId === '11n') {

        return <IconThunderstorm className={className} />

    }

    if (iconId === '13d' || iconId === '13n') {

        return <IconSnow className={className} />

    }

    if (iconId === '50d' || iconId === '50n') {

        return <IconMist className={className} />

    }
    
}

