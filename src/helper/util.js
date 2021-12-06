import * as d3 from 'd3'
export default class Util {

    /**
     * Formats and filters out API return data
     * @param {*} timestampsArr API return of weather info with 3 hour intervals for 5 days 
     *                          https://openweathermap.org/forecast5
     * 
     * @returns Map of with keys of date string, 
     *          and values of Array of temperatures for that day of a key
     */
    formatWeather = (timestampsArr) => {
        const dailyMap = new Map();
        timestampsArr.forEach(ts => {
            const date = ts.dt_txt.split(" ")[0];
            dailyMap.set(date, dailyMap.has(date) ? dailyMap.get(date).concat(ts.main.temp) : [ts.main.temp])
        })
        return dailyMap;
    }

    /**
     * @param {Array<Number>} array of numbers
     * @returns average of all numbers in given array
     */
    calcArrayAvg = (array) => {
        return Math.round(array.reduce((a, b) => a + b, 0) / array.length)
    }

    /**
     * Render a graph showing temperatures in function of time
     * @param {*} dataToDisplay array of objects {date: Date, calue: Number}
     */
    renderWeatherGraph = (dataToDisplay) => {
        let margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

        let svg = d3.select("#weatherGraph")
                    .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                        .attr("transform",
                            "translate(" + margin.left + "," + margin.top + ")");

        let x = d3.scaleTime()
                .domain(d3.extent(dataToDisplay, function(d) { return d.date; }))
                .range([ 0, width ]);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

        const minY = d3.min(dataToDisplay.map(t => t.value));
        const maxY = d3.max(dataToDisplay.map(t => t.value));
        let y = d3.scaleLinear()
            .domain([ minY < -10 ? minY : -10, maxY > 20 ? maxY : 20])
            .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y));

        svg.append("path")
            .datum(dataToDisplay)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return x(d.date) })
                .y(function(d) { return y(d.value) })
            )
    }
}