import {
  ADD_ITEM,
  DELETE_ITEM,
  SELECT_ITEM,
  DESELECT_ITEM,
  UPDATE_PLACES,
  LOADING,
  UNLOADING
} from "../actions/actionTypes";
const initialState = { places: [], loading: true, selectedPlace: null };
const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      var placesCopy = state.places.slice();

      return { ...state, places: placesCopy.concat(action.item) };
    case DELETE_ITEM:
      var placesCopy = state.places.slice();

      return {
        ...state,
        places: placesCopy.filter((p, i) => {
          return p._id !== action.id;
        }),
        selectedPlace: null
      };
    case UPDATE_PLACES:
      return { ...state, places: [...action.places] };
    case SELECT_ITEM:
      return {
        ...state,
        selectedPlace: state.places.slice().find(p => {
          return p.key === action.key;
        })
      };
    case DESELECT_ITEM:
      return { ...state, selectedPlace: null };
    case LOADING:
      return { ...state, loading: true };
    case UNLOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default placeReducer;
