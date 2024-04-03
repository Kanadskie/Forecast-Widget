export default class Data {

    constructor(api_key) {
        this.api_key = api_key
    }

    request() {

        let url = `https://api.openweathermap.org/data/2.5/weather?lat=55.96&lon=37.52013&appid=${this.api_key}`

        const fetchResult = 
        fetch(url)

        .then(resp => resp.json())

        .then(data => {

          this.getDataFromApi(data)

        })

        .catch((error) => { 

        console.error(error)

        })

    }

    getDataFromApi(data) {

        return data

    }

}

let forecast = new Data('57a46d8aac3424769850d0ae522ab995')

