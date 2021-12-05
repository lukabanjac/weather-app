import React, { useContext } from 'react'
import Util from '../../helper/util';
import Context from '../../state-mgmt/context';
import './WeatherDisplay.scss'
import WeatherDisplayData from './WeatherDisplayData/WeatherDisplayData'

function WeatherDisplay() {
    const util = new Util();

    const context = useContext(Context);

    const weekday = [ "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

    const renderForecastWeather = () => {
        const allTemperatures = [];
        const dataEntries = [];

        const weatherGraphContainer = document.getElementById('weatherGraph');
        if(weatherGraphContainer){weatherGraphContainer.innerHTML = ""}

        var dataToDisplay = context.temperaturesByHour.map(t => {
            return { date: new Date(t[0]), value: t[1]}
        });

        util.renderWeatherGraph(dataToDisplay);

        let i = 0;
        context.temperaturesByDay?.forEach((v, k) => {
            allTemperatures.push(...v)

            dataEntries.push(
                (
                    <WeatherDisplayData 
                        key={i++} 
                        temperature={util.calcArrayAvg(v)}
                        upperText={weekday[new Date(k).getDay()]}
                    />
                )
            )
        })
        console.log(allTemperatures)
        return dataEntries;
    }

    const getDateFromTo = () => {
        if(context.temperaturesByDay) {
            //This beautiful one-liner sausage bellow takes map keys which are date strings, spreads them in array, convert string array to date array and descent sorts them
            const datesArray = [...context.temperaturesByDay.keys()].map(dateStr => new Date(dateStr)).sort((f ,s) => f.getTime() - s.getTime());
            const firstDate = datesArray[0]; // soonest out of 5 dates
            const secondDate = datesArray[datesArray.length - 1]; // latest out of 5 dates

            const isSameYearAndMonth = firstDate.getFullYear() === secondDate.getFullYear() && firstDate.getMonth() === secondDate.getMonth();
            if (isSameYearAndMonth) { //check if it is possible to print in shorter format: example DEC 1-4 20201 or DEC 1 2021 - DEC 4 2021
                return `${formatDateToString(firstDate, secondDate)}`;
            } else {
                return `${formatDateToString(firstDate)} - ${formatDateToString(secondDate)}`;
            }
        }
    }

    /**
     * Print date in format MONTH dd yyyy, example: DEC 1 2021, or a span of days by adding second date, for example: DEC 1-4 2021
     * @param {Date} date date to be parsed
     * @param {Date} secondDate add a '- DAY' after a first day
     * @returns 
     */
    const formatDateToString = (date, secondDate = null) => {
        return `${date.toLocaleString('default', { month: 'short' }).toUpperCase()} ${date.getDate() + 1} ${secondDate !== null && ` - ${secondDate.getDate()}`} ${date.getFullYear()}`;
    }

    return (
        <React.Fragment>
            { context.loaded &&
                <React.Fragment>
                    {
                        !context.noCityFoundError ?
                            <div className="weatherData">
                                <WeatherDisplayData 
                                    displayFormatBig={true}
                                    temperature={context.weeklyAverage}
                                    upperText={getDateFromTo()}
                                />
                                <div className="forecastTemperatureData">{renderForecastWeather()}</div>
                                <div id="weatherGraph"></div>
                            </div>
                        :
                            <div className="NoCityFoundErrorMessage">
                                <div>No City Found 😢</div>
                                <div>Please, try again.</div>
                                <div>Make shure you got your spelling right!</div>
                            </div> 
                    }
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default WeatherDisplay
