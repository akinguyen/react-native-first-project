import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import AuthScreen from "./src/screens/Auth/Auth";
import SharePlace from "./src/screens/SharePlace/SharePlace";
import FindPlace from "./src/screens/FindPlace/FindPlace";
import store from "./src/storeConfig";
import SelectedPlace from "./src/screens/SelectedPlace/SelectedPlace";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";
import AnimationPlace from "./src/screens/AnimationPlace/AnimationPlace";

//Register Screens
Navigation.registerComponent(
  "awesome.AuthScreen",
  () => AuthScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "awesome.SharePlaceScreen",
  () => SharePlace,
  store,
  Provider
);
Navigation.registerComponent(
  "awesome.FindPlaceScreen",
  () => FindPlace,
  store,
  Provider
);
Navigation.registerComponent(
  "awesome.SelectedPlaceScreen",
  () => SelectedPlace,
  store,
  Provider
);
Navigation.registerComponent("awesome.AnimationScreen", () => AnimationPlace);
Navigation.registerComponent(
  "awesome.SideDrawerScreen",
  () => SideDrawer,
  store,
  Provider
);

//Start the App
Navigation.startSingleScreenApp({
  screen: {
    screen: "awesome.AuthScreen",
    title: "Login"
  }
});

/*import * as React from "react";
import { Text, View, StyleSheet, Touchable } from "react-native";
import InputContainer from "./src/components/InputContainer";
import PlaceList from "./src/components/PlaceList";
import PlaceDetail from "./src/components/PlaceDetail";
import { connect } from "react-redux";
import {
  placeSubmit,
  placeClose,
  placeDelete,
  placeSelect
} from "./src/store/actions/placeActions";

class App extends React.Component {
  constructor() {
    super();
    this.state = { text: "" };
  }
  placeInput = text => {
    this.setState({ text });
  };
  placeSubmit = () => {
    if (this.state.text.trim() === "") {
      return;
    }
    const item = {
      key: Math.random(),
      value: this.state.text,
      image: { uri: "https://facebook.github.io/react/logo-og.png" }
    };
    this.props.placeSubmit(item);
  };
  placeDelete = key => {
    this.props.placeDelete(key);
  };
  placeSelect = key => {
    this.props.placeSelect(key);
  };
  placeClose = () => {
    this.props.placeClose();
  };
  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail
          visible={this.props.places.selectedPlace !== null}
          onClose={this.placeClose}
          selectedPlace={this.props.places.selectedPlace}
          onItemDelete={this.placeDelete}
        />
        <Text style={styles.paragraph}>Input</Text>
        <InputContainer
          text={this.state.text}
          onPress={this.placeSubmit}
          onChangeText={this.placeInput}
        />
        
        <PlaceList
          places={this.props.places.places}
          onItemSelect={this.placeSelect}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});
const mapStateToProps = state => ({
  places: state.places
});
export default connect(
  mapStateToProps,
  { placeSubmit, placeClose, placeDelete, placeSelect }
)(App);*/
