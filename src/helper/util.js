import { logDOM } from "@testing-library/dom";

export default class Util {
    /**
     * Formats and filters out API return data
     * @param timestampsArr API return of weather info with 3 hour intervals for 5 days 
     *                          https://openweathermap.org/forecast5
     * 
     * @returns Map of with keys of date string, 
     *          and values of Array of temperatures for that day of a key
     */
    formatWeather = (timestampsArr) => {
        const dailyMap = new Map();
        timestampsArr.map(ts => {
            const date = ts.dt_txt.split(" ")[0];
            dailyMap.set(date, dailyMap.has(date) ? dailyMap.get(date).concat(ts.main.temp) : [ts.main.temp])
        })
        return dailyMap;
    }
}