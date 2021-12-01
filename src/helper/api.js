
import * as axios from 'axios';

export default class Api {
    constructor() {
        //These vars would normally be put in some kind of environment file, we'll keep them here due to simplicity
        this.API_URL = 'https://api.openweathermap.org'
        this.API_KEY = '840e238bf99ae29eafac959f4e79baa4'

        this.client = null;
    }

    //We weould normally use this approach to put client data into headers, mainly for auth purposes
    init = () => {
        const headers = {
          Accept: "application/json",
        };
    
        this.client = axios.create({
          baseURL: this.API_URL,
          timeout: 31000,
          headers: headers,
        });
    
        return this.client;
      };

    /**
     * Get 5 day forecast for a input city
     * Instructions: https://openweathermap.org/forecast5
     * @param params  
     * {
     *      q: Comma separated - City, CountryCode
     *      appid: API key
     *      mode: Response format
     *      cnt: No. of timestamps
     *      units: Units of measurement
     *      lang: Language
     * }
     * @returns 
     */
    getCityWeather = (city) => {
        return this.init().get(`${this.API_URL}/data/2.5/forecast`, 
        { params: {
            q: city,
            units: 'metric',
            appid: this.API_KEY
        }})
    }
}