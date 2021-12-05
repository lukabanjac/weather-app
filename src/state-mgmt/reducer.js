import { ERRORS, SET_TEMPERATURES_BY_DAY, LOADED, SET_WEEKLY_AVERAGE, SET_TEMPERATURES_BY_HOUR } from "./types"

const Reducer = (state, { type, payload }) => {
    switch (type) {

    case SET_TEMPERATURES_BY_DAY:
        return { ...state, temperaturesByDay: payload }

    case SET_TEMPERATURES_BY_HOUR:
        return { ...state, temperaturesByHour: payload }

    case SET_WEEKLY_AVERAGE:
        return { ...state, weeklyAverage: payload}

    case ERRORS.NO_CITY_FOUND:
        return { ...state, noCityFoundError: payload}

    case LOADED: 
        return { ...state, loaded: payload }

    default:
        return state
    }
}

export default Reducer
