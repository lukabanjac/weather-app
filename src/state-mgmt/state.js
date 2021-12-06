import React, { useReducer } from 'react'
import Api from '../helper/api';
import Util from '../helper/util';
import Context from './context'
import Reducer from './reducer'
import { ERRORS, SET_TEMPERATURES_BY_DAY, LOADED, SET_WEEKLY_AVERAGE, SET_TEMPERATURES_BY_HOUR } from './types'



const State = (props) => {
    const api = new Api();
    const util = new Util();
    
    let initialState = {
        weeklyAverage: NaN,
        loaded: false,
        temperaturesByDay: null,
        temperaturesByHour: null,
        noCityFoundError: false
    }

    const [state, dispatch] = useReducer(Reducer, initialState)

    const getTemperatures = async (city) => {
        dispatch({ type: LOADED, payload: false })
        try {
            let res =  await api.getCityWeather(city);

            //turn off noCityFoundError when user inputs a correct city 
            state.noCityFoundError && dispatch({ type: ERRORS.NO_CITY_FOUND, payload: false });
            
            let dataByDay = util.formatWeather(res.data.list); //get all temepratures for its day as map
            let dataByHour = res.data.list.map(t => [t.dt_txt, t.main.temp]);

            let allTemperatures = [];
            dataByDay.forEach((v) => allTemperatures.push(...v));
            const weeklyAverage = util.calcArrayAvg(allTemperatures);

            dispatch({ type: SET_TEMPERATURES_BY_DAY, payload: dataByDay })
            dispatch({ type: SET_TEMPERATURES_BY_HOUR, payload: dataByHour })
            dispatch({ type: SET_WEEKLY_AVERAGE, payload: weeklyAverage})
            dispatch({ type: LOADED, payload: true })
        } catch (error) {
            dispatch({ type: ERRORS.NO_CITY_FOUND, payload: true });
            dispatch({ type: LOADED, payload: true })

            console.error(error);
        }
    }

    return (
        <Context.Provider
            value={{
                weeklyAverage: state.weeklyAverage,
                loaded: state.loaded,
                temperaturesByDay: state.temperaturesByDay,
                temperaturesByHour: state.temperaturesByHour,
                noCityFoundError: state.noCityFoundError,
                getTemperatures
            }}
        >
            {props.children}
        </Context.Provider>
    )
}

export default State

/* 
{
    "cod": "200",
    "message": 0,
    "cnt": 40,
    "list": [
        {
            "dt": 1638500400,
            "main": {
                "temp": 7.99,
                "feels_like": 5.05,
                "temp_min": 6.21,
                "temp_max": 7.99,
                "pressure": 1002,
                "sea_level": 1002,
                "grnd_level": 993,
                "humidity": 87,
                "temp_kf": 1.78
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 5.07,
                "deg": 328,
                "gust": 7.62
            },
            "visibility": 10000,
            "pop": 0.69,
            "rain": {
                "3h": 0.5
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-03 03:00:00"
        },
        {
            "dt": 1638511200,
            "main": {
                "temp": 7.21,
                "feels_like": 4.43,
                "temp_min": 5.65,
                "temp_max": 7.21,
                "pressure": 1004,
                "sea_level": 1004,
                "grnd_level": 997,
                "humidity": 88,
                "temp_kf": 1.56
            },
            "weather": [
                {
                    "id": 501,
                    "main": "Rain",
                    "description": "moderate rain",
                    "icon": "10n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 4.28,
                "deg": 307,
                "gust": 8.89
            },
            "visibility": 10000,
            "pop": 1,
            "rain": {
                "3h": 3.13
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-03 06:00:00"
        },
        {
            "dt": 1638522000,
            "main": {
                "temp": 7.1,
                "feels_like": 3.98,
                "temp_min": 6.65,
                "temp_max": 7.1,
                "pressure": 1007,
                "sea_level": 1007,
                "grnd_level": 1001,
                "humidity": 77,
                "temp_kf": 0.45
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 4.95,
                "deg": 328,
                "gust": 6.95
            },
            "visibility": 10000,
            "pop": 0.47,
            "rain": {
                "3h": 0.17
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2021-12-03 09:00:00"
        },
        {
            "dt": 1638532800,
            "main": {
                "temp": 6.67,
                "feels_like": 3.8,
                "temp_min": 6.67,
                "temp_max": 6.67,
                "pressure": 1012,
                "sea_level": 1012,
                "grnd_level": 1002,
                "humidity": 65,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 4.22,
                "deg": 335,
                "gust": 4.79
            },
            "visibility": 10000,
            "pop": 0.43,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2021-12-03 12:00:00"
        },
        {
            "dt": 1638543600,
            "main": {
                "temp": 5.92,
                "feels_like": 3.41,
                "temp_min": 5.92,
                "temp_max": 5.92,
                "pressure": 1014,
                "sea_level": 1014,
                "grnd_level": 1004,
                "humidity": 61,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 3.29,
                "deg": 343,
                "gust": 5.52
            },
            "visibility": 10000,
            "pop": 0.07,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-03 15:00:00"
        },
        {
            "dt": 1638554400,
            "main": {
                "temp": 4.92,
                "feels_like": 2.62,
                "temp_min": 4.92,
                "temp_max": 4.92,
                "pressure": 1016,
                "sea_level": 1016,
                "grnd_level": 1006,
                "humidity": 64,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 2.73,
                "deg": 344,
                "gust": 5
            },
            "visibility": 10000,
            "pop": 0.05,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-03 18:00:00"
        },
        {
            "dt": 1638565200,
            "main": {
                "temp": 4.2,
                "feels_like": 2.92,
                "temp_min": 4.2,
                "temp_max": 4.2,
                "pressure": 1017,
                "sea_level": 1017,
                "grnd_level": 1008,
                "humidity": 66,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 1.59,
                "deg": 344,
                "gust": 2.3
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-03 21:00:00"
        },
        {
            "dt": 1638576000,
            "main": {
                "temp": 4.09,
                "feels_like": 4.09,
                "temp_min": 4.09,
                "temp_max": 4.09,
                "pressure": 1017,
                "sea_level": 1017,
                "grnd_level": 1007,
                "humidity": 68,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 0.63,
                "deg": 13,
                "gust": 0.7
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-04 00:00:00"
        },
        {
            "dt": 1638586800,
            "main": {
                "temp": 2.85,
                "feels_like": 2.85,
                "temp_min": 2.85,
                "temp_max": 2.85,
                "pressure": 1016,
                "sea_level": 1016,
                "grnd_level": 1006,
                "humidity": 72,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "clouds": {
                "all": 48
            },
            "wind": {
                "speed": 1.04,
                "deg": 154,
                "gust": 1.18
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-04 03:00:00"
        },
        {
            "dt": 1638597600,
            "main": {
                "temp": 2.02,
                "feels_like": 2.02,
                "temp_min": 2.02,
                "temp_max": 2.02,
                "pressure": 1015,
                "sea_level": 1015,
                "grnd_level": 1005,
                "humidity": 77,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "clouds": {
                "all": 42
            },
            "wind": {
                "speed": 1.31,
                "deg": 140,
                "gust": 1.53
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-04 06:00:00"
        },
        {
            "dt": 1638608400,
            "main": {
                "temp": 4.45,
                "feels_like": 1.56,
                "temp_min": 4.45,
                "temp_max": 4.45,
                "pressure": 1014,
                "sea_level": 1014,
                "grnd_level": 1004,
                "humidity": 65,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "clouds": {
                "all": 36
            },
            "wind": {
                "speed": 3.4,
                "deg": 135,
                "gust": 5.91
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2021-12-04 09:00:00"
        },
        {
            "dt": 1638619200,
            "main": {
                "temp": 6.12,
                "feels_like": 2.94,
                "temp_min": 6.12,
                "temp_max": 6.12,
                "pressure": 1010,
                "sea_level": 1010,
                "grnd_level": 1001,
                "humidity": 59,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "clouds": {
                "all": 67
            },
            "wind": {
                "speed": 4.57,
                "deg": 148,
                "gust": 7.06
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2021-12-04 12:00:00"
        },
        {
            "dt": 1638630000,
            "main": {
                "temp": 4.99,
                "feels_like": 2.68,
                "temp_min": 4.99,
                "temp_max": 4.99,
                "pressure": 1009,
                "sea_level": 1009,
                "grnd_level": 999,
                "humidity": 75,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 2.75,
                "deg": 153,
                "gust": 5.93
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-04 15:00:00"
        },
        {
            "dt": 1638640800,
            "main": {
                "temp": 3.67,
                "feels_like": 2,
                "temp_min": 3.67,
                "temp_max": 3.67,
                "pressure": 1009,
                "sea_level": 1009,
                "grnd_level": 999,
                "humidity": 84,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 98
            },
            "wind": {
                "speed": 1.84,
                "deg": 170,
                "gust": 2.42
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-04 18:00:00"
        },
        {
            "dt": 1638651600,
            "main": {
                "temp": 3.97,
                "feels_like": 2.43,
                "temp_min": 3.97,
                "temp_max": 3.97,
                "pressure": 1008,
                "sea_level": 1008,
                "grnd_level": 999,
                "humidity": 85,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 1.77,
                "deg": 173,
                "gust": 2.55
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-04 21:00:00"
        },
        {
            "dt": 1638662400,
            "main": {
                "temp": 3.99,
                "feels_like": 2.3,
                "temp_min": 3.99,
                "temp_max": 3.99,
                "pressure": 1007,
                "sea_level": 1007,
                "grnd_level": 997,
                "humidity": 86,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 1.9,
                "deg": 181,
                "gust": 2.2
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-05 00:00:00"
        },
        {
            "dt": 1638673200,
            "main": {
                "temp": 4.77,
                "feels_like": 4.77,
                "temp_min": 4.77,
                "temp_max": 4.77,
                "pressure": 1007,
                "sea_level": 1007,
                "grnd_level": 997,
                "humidity": 87,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                }
            ],
            "clouds": {
                "all": 98
            },
            "wind": {
                "speed": 0.88,
                "deg": 89,
                "gust": 1
            },
            "visibility": 10000,
            "pop": 0.24,
            "rain": {
                "3h": 0.41
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-05 03:00:00"
        },
        {
            "dt": 1638684000,
            "main": {
                "temp": 4.87,
                "feels_like": 4.87,
                "temp_min": 4.87,
                "temp_max": 4.87,
                "pressure": 1007,
                "sea_level": 1007,
                "grnd_level": 997,
                "humidity": 91,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                }
            ],
            "clouds": {
                "all": 99
            },
            "wind": {
                "speed": 1.3,
                "deg": 135,
                "gust": 2.15
            },
            "visibility": 10000,
            "pop": 0.59,
            "rain": {
                "3h": 0.68
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-05 06:00:00"
        },
        {
            "dt": 1638694800,
            "main": {
                "temp": 6.25,
                "feels_like": 4.85,
                "temp_min": 6.25,
                "temp_max": 6.25,
                "pressure": 1006,
                "sea_level": 1006,
                "grnd_level": 997,
                "humidity": 81,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 1.97,
                "deg": 92,
                "gust": 3.02
            },
            "visibility": 10000,
            "pop": 0.09,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2021-12-05 09:00:00"
        },
        {
            "dt": 1638705600,
            "main": {
                "temp": 8.01,
                "feels_like": 6.31,
                "temp_min": 8.01,
                "temp_max": 8.01,
                "pressure": 1003,
                "sea_level": 1003,
                "grnd_level": 994,
                "humidity": 71,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 2.71,
                "deg": 67,
                "gust": 3.25
            },
            "visibility": 10000,
            "pop": 0.05,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2021-12-05 12:00:00"
        },
        {
            "dt": 1638716400,
            "main": {
                "temp": 6.49,
                "feels_like": 5.1,
                "temp_min": 6.49,
                "temp_max": 6.49,
                "pressure": 1003,
                "sea_level": 1003,
                "grnd_level": 994,
                "humidity": 90,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 2,
                "deg": 124,
                "gust": 4.22
            },
            "visibility": 9781,
            "pop": 0.95,
            "rain": {
                "3h": 2.94
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-05 15:00:00"
        },
        {
            "dt": 1638727200,
            "main": {
                "temp": 6.88,
                "feels_like": 5.18,
                "temp_min": 6.88,
                "temp_max": 6.88,
                "pressure": 1002,
                "sea_level": 1002,
                "grnd_level": 993,
                "humidity": 93,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 501,
                    "main": "Rain",
                    "description": "moderate rain",
                    "icon": "10n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 2.44,
                "deg": 103,
                "gust": 6.47
            },
            "visibility": 10000,
            "pop": 1,
            "rain": {
                "3h": 4.19
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-05 18:00:00"
        },
        {
            "dt": 1638738000,
            "main": {
                "temp": 5.89,
                "feels_like": 3.45,
                "temp_min": 5.89,
                "temp_max": 5.89,
                "pressure": 1003,
                "sea_level": 1003,
                "grnd_level": 994,
                "humidity": 91,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 3.18,
                "deg": 326,
                "gust": 6.01
            },
            "visibility": 10000,
            "pop": 0.71,
            "rain": {
                "3h": 1.15
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-05 21:00:00"
        },
        {
            "dt": 1638748800,
            "main": {
                "temp": 5.03,
                "feels_like": 2.3,
                "temp_min": 5.03,
                "temp_max": 5.03,
                "pressure": 1006,
                "sea_level": 1006,
                "grnd_level": 996,
                "humidity": 89,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 3.34,
                "deg": 300,
                "gust": 7.75
            },
            "visibility": 10000,
            "pop": 0.63,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-06 00:00:00"
        },
        {
            "dt": 1638759600,
            "main": {
                "temp": 4.91,
                "feels_like": 2.46,
                "temp_min": 4.91,
                "temp_max": 4.91,
                "pressure": 1007,
                "sea_level": 1007,
                "grnd_level": 998,
                "humidity": 83,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 2.91,
                "deg": 315,
                "gust": 6.35
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-06 03:00:00"
        },
        {
            "dt": 1638770400,
            "main": {
                "temp": 4.08,
                "feels_like": 1.58,
                "temp_min": 4.08,
                "temp_max": 4.08,
                "pressure": 1009,
                "sea_level": 1009,
                "grnd_level": 999,
                "humidity": 85,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 2.77,
                "deg": 332,
                "gust": 3.67
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-06 06:00:00"
        },
        {
            "dt": 1638781200,
            "main": {
                "temp": 4.1,
                "feels_like": 1.57,
                "temp_min": 4.1,
                "temp_max": 4.1,
                "pressure": 1010,
                "sea_level": 1010,
                "grnd_level": 1001,
                "humidity": 78,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 2.82,
                "deg": 358,
                "gust": 3.65
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2021-12-06 09:00:00"
        },
        {
            "dt": 1638792000,
            "main": {
                "temp": 4.68,
                "feels_like": 1.65,
                "temp_min": 4.68,
                "temp_max": 4.68,
                "pressure": 1010,
                "sea_level": 1010,
                "grnd_level": 1000,
                "humidity": 72,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 3.69,
                "deg": 2,
                "gust": 5.36
            },
            "visibility": 10000,
            "pop": 0.07,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2021-12-06 12:00:00"
        },
        {
            "dt": 1638802800,
            "main": {
                "temp": 4.59,
                "feels_like": 1.99,
                "temp_min": 4.59,
                "temp_max": 4.59,
                "pressure": 1011,
                "sea_level": 1011,
                "grnd_level": 1001,
                "humidity": 69,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 3.03,
                "deg": 345,
                "gust": 5.68
            },
            "visibility": 10000,
            "pop": 0.24,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-06 15:00:00"
        },
        {
            "dt": 1638813600,
            "main": {
                "temp": 3.39,
                "feels_like": 1.88,
                "temp_min": 3.39,
                "temp_max": 3.39,
                "pressure": 1013,
                "sea_level": 1013,
                "grnd_level": 1004,
                "humidity": 79,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 1.67,
                "deg": 322,
                "gust": 3.11
            },
            "visibility": 10000,
            "pop": 0.33,
            "rain": {
                "3h": 0.15
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-06 18:00:00"
        },
        {
            "dt": 1638824400,
            "main": {
                "temp": 3.55,
                "feels_like": 0.18,
                "temp_min": 3.55,
                "temp_max": 3.55,
                "pressure": 1014,
                "sea_level": 1014,
                "grnd_level": 1004,
                "humidity": 80,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 3.84,
                "deg": 335,
                "gust": 6.08
            },
            "visibility": 10000,
            "pop": 0.09,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-06 21:00:00"
        },
        {
            "dt": 1638835200,
            "main": {
                "temp": 2.8,
                "feels_like": -0.79,
                "temp_min": 2.8,
                "temp_max": 2.8,
                "pressure": 1015,
                "sea_level": 1015,
                "grnd_level": 1005,
                "humidity": 84,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 3.92,
                "deg": 329,
                "gust": 7.67
            },
            "visibility": 10000,
            "pop": 0.05,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-07 00:00:00"
        },
        {
            "dt": 1638846000,
            "main": {
                "temp": 2.03,
                "feels_like": -1.97,
                "temp_min": 2.03,
                "temp_max": 2.03,
                "pressure": 1016,
                "sea_level": 1016,
                "grnd_level": 1006,
                "humidity": 83,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 4.28,
                "deg": 317,
                "gust": 8.52
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-07 03:00:00"
        },
        {
            "dt": 1638856800,
            "main": {
                "temp": 0.67,
                "feels_like": -3.17,
                "temp_min": 0.67,
                "temp_max": 0.67,
                "pressure": 1018,
                "sea_level": 1018,
                "grnd_level": 1008,
                "humidity": 84,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 83
            },
            "wind": {
                "speed": 3.59,
                "deg": 305,
                "gust": 7.35
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-07 06:00:00"
        },
        {
            "dt": 1638867600,
            "main": {
                "temp": 2.16,
                "feels_like": -1.52,
                "temp_min": 2.16,
                "temp_max": 2.16,
                "pressure": 1019,
                "sea_level": 1019,
                "grnd_level": 1009,
                "humidity": 71,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                }
            ],
            "clouds": {
                "all": 23
            },
            "wind": {
                "speed": 3.83,
                "deg": 305,
                "gust": 5.46
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2021-12-07 09:00:00"
        },
        {
            "dt": 1638878400,
            "main": {
                "temp": 4.08,
                "feels_like": 0.88,
                "temp_min": 4.08,
                "temp_max": 4.08,
                "pressure": 1018,
                "sea_level": 1018,
                "grnd_level": 1008,
                "humidity": 59,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                }
            ],
            "clouds": {
                "all": 16
            },
            "wind": {
                "speed": 3.76,
                "deg": 305,
                "gust": 4.84
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2021-12-07 12:00:00"
        },
        {
            "dt": 1638889200,
            "main": {
                "temp": 2.96,
                "feels_like": 1.17,
                "temp_min": 2.96,
                "temp_max": 2.96,
                "pressure": 1018,
                "sea_level": 1018,
                "grnd_level": 1008,
                "humidity": 64,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 6
            },
            "wind": {
                "speed": 1.85,
                "deg": 303,
                "gust": 2.56
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-07 15:00:00"
        },
        {
            "dt": 1638900000,
            "main": {
                "temp": 1.85,
                "feels_like": 0.31,
                "temp_min": 1.85,
                "temp_max": 1.85,
                "pressure": 1019,
                "sea_level": 1019,
                "grnd_level": 1009,
                "humidity": 70,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "clouds": {
                "all": 35
            },
            "wind": {
                "speed": 1.53,
                "deg": 248,
                "gust": 2.09
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-07 18:00:00"
        },
        {
            "dt": 1638910800,
            "main": {
                "temp": 1.08,
                "feels_like": -0.87,
                "temp_min": 1.08,
                "temp_max": 1.08,
                "pressure": 1018,
                "sea_level": 1018,
                "grnd_level": 1008,
                "humidity": 74,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 8
            },
            "wind": {
                "speed": 1.74,
                "deg": 177,
                "gust": 2.03
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-07 21:00:00"
        },
        {
            "dt": 1638921600,
            "main": {
                "temp": 0.43,
                "feels_like": -2.25,
                "temp_min": 0.43,
                "temp_max": 0.43,
                "pressure": 1017,
                "sea_level": 1017,
                "grnd_level": 1007,
                "humidity": 80,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 10
            },
            "wind": {
                "speed": 2.25,
                "deg": 148,
                "gust": 4.29
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-12-08 00:00:00"
        }
    ],
    "city": {
        "id": 3194360,
        "name": "Novi Sad",
        "coord": {
            "lat": 45.2517,
            "lon": 19.8369
        },
        "country": "RS",
        "population": 215400,
        "timezone": 3600,
        "sunrise": 1638511316,
        "sunset": 1638543564
    }
}
 */
