import React from 'react'
import PropTypes from 'prop-types'
import './WeatherDisplayData.scss'

/**
 * Component for displaying temperature number and date
 * Props
 *  upperText:
 *      String - MONTH DD YYYY - example: MAY 4 2020
 *      String - Name of the day- example: MONDAY
 *  temperature:
 *      Number - temperature in celsius
 *  displayFormatBig: 
 *      Boolean
 *         true - large text and date (used for avredge temperature)
 *         false - smaller text and date (used for forecast temperature)
 */
function WeatherDisplayData(props) {
    return (
        <div>
            <div className="temperatureUpperText">
                {props.upperText}
            </div>
            <div className="temperatureWrapper">
                <div className={props.displayFormatBig ? 'temperatureNumberBig' : 'temperatureNumberSmall'}>{props.temperature}</div>
                <div className={props.displayFormatBig ? 'celsiusSignBig' : 'celsiusSignSmall'}>°C</div>
            </div>
        </div>
    )
}

WeatherDisplayData.propTypes = {
    upperText: PropTypes.string,
    temperature: PropTypes.number,
    displayFormatBig: PropTypes.bool
}

WeatherDisplayData.defaultProps = {
    displayFormatBig: false
}

export default WeatherDisplayData
