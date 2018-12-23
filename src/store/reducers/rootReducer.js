import { combineReducers } from "redux";
import placeReducer from "./places";
import user from "./userReducer";
const reducer = combineReducers({ places: placeReducer, user });
export default reducer;
