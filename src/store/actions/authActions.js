import { TRY_AUTH } from "./actionTypes";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";
import startTabs from "../../screens/MainTabs/startMainTabs";

export const onRegister = user => dispatch => {
  dispatch({
    type: "USER_LOADING"
  });
  axios
    .post(
      "https://cryptic-cove-20459.herokuapp.com/api/users/register?api_key=meyeu2000",
      user
    )
    .then(newUser => {
      dispatch({
        type: "CLEAR_ERROR"
      });
      axios
        .post(
          "https://cryptic-cove-20459.herokuapp.com/api/users/login?api_key=meyeu2000",
          {
            email: user.email,
            password: user.password
          }
        )
        .then(res => {
          console.log("Login Success");
          const { token } = res.data;

          //Decode Token
          const decoded = jwt_decode(token);
          console.log(decoded);
          //console.log(token);
          //Save Token to Local Storage

          //storeData(token);

          AsyncStorage.setItem("jwtToken", token)
            .then(() => {
              console.log("Finishing Store Data");
              dispatch({
                type: "SET_CURRENT_USER",
                user: decoded
              });

              startTabs(dispatch);
            })
            .catch(err => {
              console.log("Failed to store data");
            });
        })
        .catch(err => {
          dispatch({
            type: "GET_ERRORS",
            errors: err.response.data
          });
          dispatch({
            type: "USER_UNLOADING"
          });
        });
    })
    .catch(err => {
      dispatch({
        type: "GET_ERRORS",
        errors: err.response.data
      });
      dispatch({
        type: "USER_UNLOADING"
      });
    });
};
export const onLogin = user => dispatch => {
  dispatch({
    type: "USER_LOADING"
  });
  axios
    .post(
      "https://cryptic-cove-20459.herokuapp.com/api/users/login?api_key=meyeu2000",
      user
    )
    .then(res => {
      dispatch({
        type: "CLEAR_ERROR"
      });
      const { token } = res.data;

      //Decode Token
      const decoded = jwt_decode(token);
      console.log(decoded);
      //console.log(token);
      //Save Token to Local Storage

      //storeData(token);

      AsyncStorage.setItem("jwtToken", token)
        .then(() => {
          console.log("Finishing Store Data");
          dispatch({
            type: "SET_CURRENT_USER",
            user: decoded
          });

          startTabs(dispatch);
        })
        .catch(err => {
          console.log("Failed to store data");
        });
    })
    .catch(err => {
      dispatch({
        type: "GET_ERRORS",
        errors: err.response.data
      });
      dispatch({
        type: "USER_UNLOADING"
      });
    });
};

export const onLogOut = () => dispatch => {
  dispatch({
    type: "LOG_OUT"
  });
};
export const clearError = () => dispatch => {
  dispatch({
    type: "CLEAR_ERROR"
  });
};
