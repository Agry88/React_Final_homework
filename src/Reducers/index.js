import CardsReducer from "./Cards";
import FilterReducer from "./Filter";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    Cards:CardsReducer,
    Filter:FilterReducer,
})

export default allReducers;