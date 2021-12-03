import React, { useContext } from 'react'
import Context from '../../state-mgmt/context';
import './WeatherDisplay.scss'
import WeatherDisplayData from './WeatherDisplayData/WeatherDisplayData'

function WeatherDisplay() {
    const context = useContext(Context)

    const weekday = [ "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]

    const getWeeklyAverage = () => {
        let allTemperatures = [];
        context.temperatures?.forEach((v, k) => allTemperatures.push(...v));
        return calcArrayAvg(allTemperatures)
    }

    const renderForecastWeather = () => {
        let dataEntries = [];
        let i = 0;
        context.temperatures?.forEach((v, k) => dataEntries.push(
                (
                    <WeatherDisplayData 
                        key={i++} 
                        temperature={calcArrayAvg(v)}
                        upperText={weekday[new Date(k).getDay()]}
                    />
                )
            )
        )
        return dataEntries;
    }

    const calcArrayAvg = (array) => {
        return Math.round(array.reduce((a, b) => a + b, 0) / array.length)
    }

    return (
        <React.Fragment>
            { !context.noCityFoundError ?
                <div className="weatherData">
                    <WeatherDisplayData 
                        displayFormatBig={true}
                        temperature={getWeeklyAverage()}
                        upperText="MAY 4 - 10 2020"
                    />
                    <div className="forecastTemperatureData">{renderForecastWeather()}</div>
                </div>
            : 
                <div><div>No City Found 😢</div><div>Please, try again.</div></div> 
            }
        </React.Fragment>
    )
}

export default WeatherDisplay
