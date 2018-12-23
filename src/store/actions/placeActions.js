import {
  ADD_ITEM,
  DELETE_ITEM,
  SELECT_ITEM,
  UPDATE_PLACES,
  DESELECT_ITEM,
  LOADING,
  UNLOADING
} from "../actions/actionTypes";
import axios from "axios";
export const placeSubmit = item => dispatch => {
  dispatch({
    type: LOADING
  });
  var newItem = {
    text: item.value,
    image: item.image.uri,
    email: item.email
  };
  axios
    .post(
      "https://cryptic-cove-20459.herokuapp.com/api/places?api_key=meyeu2000",
      newItem
    )
    .then(res => {
      dispatch({
        type: UNLOADING
      });
      dispatch({
        type: ADD_ITEM,
        item: res.data
      });
    })
    .catch(err => {
      console.log("Failed");
      console.log(err);
    });
};
export const placeDelete = id => dispatch => {
  axios
    .delete(
      `https://cryptic-cove-20459.herokuapp.com/api/places/${id}?api_key=meyeu2000`
    )
    .then(res => {
      dispatch({
        type: DELETE_ITEM,
        id: id
      });
    })
    .catch(err => console.log(err));
};

export const placeSelect = key => dispatch => {
  dispatch({
    type: SELECT_ITEM,
    key: key
  });
};
export const placeClose = () => dispatch => {
  dispatch({ type: DESELECT_ITEM });
};
export const getPlacesList = () => dispatch => {
  dispatch({
    type: LOADING
  });
  axios
    .get(
      "https://cryptic-cove-20459.herokuapp.com/api/places?api_key=meyeu2000"
    )
    .then(res => {
      dispatch({
        type: UNLOADING
      });
      dispatch({
        type: UPDATE_PLACES,
        places: res.data
      });
    })
    .catch(err => console.log(err));
};
