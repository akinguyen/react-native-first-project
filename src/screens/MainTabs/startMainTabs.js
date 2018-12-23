import { Navigation } from "react-native-navigation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionic from "react-native-vector-icons/Ionicons";
import { AsyncStorage } from "react-native";
import axios from "axios";

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
const startTabs = dispatch => {
  AsyncStorage.getItem("jwtToken")
    .then(token => {
      console.log("Retrieve Token");

      Promise.all([
        FontAwesome.getImageSource("map", 30),
        FontAwesome.getImageSource("share-alt"),
        Ionic.getImageSource("md-menu", 30),
        FontAwesome.getImageSource("gamepad", 30)
      ]).then(source => {
        setAuthToken(token);
        dispatch({
          type: "USER_UNLOADING"
        });
        Navigation.startTabBasedApp({
          tabs: [
            {
              screen: "awesome.FindPlaceScreen",
              label: "Find Place",
              title: "Find Place",
              icon: source[0],
              navigatorButtons: {
                leftButtons: [
                  {
                    icon: source[2],
                    title: "Menu",
                    id: "sideDrawToggle"
                  }
                ]
              }
            },
            {
              screen: "awesome.SharePlaceScreen",
              label: "Share Place",
              title: "Share Place",
              icon: source[1],
              navigatorButtons: {
                leftButtons: [
                  {
                    icon: source[2],
                    title: "Menu",
                    id: "sideDrawToggle"
                  }
                ]
              }
            },
            {
              screen: "awesome.AnimationScreen",
              label: "Animation",
              title: "Animation",
              icon: source[3],
              navigatorButtons: {
                leftButtons: [
                  {
                    icon: source[2],
                    title: "Menu",
                    id: "sideDrawToggle"
                  }
                ]
              }
            }
          ],
          drawer: {
            left: {
              screen: "awesome.SideDrawerScreen",
              title: "Login"
            }
          },
          appStyle: {
            tabBarSelectedButtonColor: "#9b34c0"
          }
        });
      });
    })
    .catch(err => {
      console.log("Failed to retrieve data");
    });
};
export default startTabs;
