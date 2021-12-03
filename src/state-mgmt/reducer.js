import { ERRORS, GET_TEMPERATURES } from "./types"

const Reducer = (state, { type, payload }) => {
    switch (type) {

    case GET_TEMPERATURES:
        return { ...state, temperatures: payload }

    case ERRORS.NO_CITY_FOUND:
        return { ...state, noCityFoundError: payload}

    default:
        return state
    }
}

export default Reducer
