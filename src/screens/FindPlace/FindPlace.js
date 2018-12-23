import React, { Component } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import PlaceList from "../../components/PlaceList";
import { getPlacesList } from "../../store/actions/placeActions";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
class FindPlace extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: "#d48bef"
  };
  state = {
    placeLoaded: false,
    fadeAnim: new Animated.Value(1),
    fadeInAnim: new Animated.Value(0)
  };
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  onNavigatorEvent(event) {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawToggle") {
        this.props.navigator.toggleDrawer({
          side: "left",
          animated: true
        });
      }
    }
  }
  placeSelect(id) {
    const selectedPlace = this.props.places.places.find(p => {
      return p._id === id;
    });
    this.props.navigator.push({
      screen: "awesome.SelectedPlaceScreen",
      title: selectedPlace.text,
      passProps: { selectedPlace },
      animated: true,
      animationType: "fade"
    });
  }
  findPlaces() {
    Animated.timing(
      // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 0, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make it take a while
        useNativeDriver: true
      }
    ).start(() => {
      this.setState({ placeLoaded: true });
    });
  }
  placesListFadeIn() {
    Animated.timing(this.state.fadeInAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }

  componentDidMount() {
    this.props.getPlacesList();
  }
  render() {
    if (!this.state.placeLoaded) {
      if (this.props.places.loading) {
        return (
          <View style={styles.button}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      }
      return (
        <Animated.View
          style={{
            ...styles.button,
            opacity: this.state.fadeAnim,
            transform: [
              {
                scale: this.state.fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [12, 1]
                })
              }
            ]
          }}
        >
          <View style={styles.button}>
            <CustomButton
              onPress={() => {
                this.findPlaces();
              }}
              textColor="orange"
              borderColor="orange"
            >
              Find Places
            </CustomButton>
          </View>
        </Animated.View>
      );
    }

    if (this.props.places.loading) {
      return (
        <View style={styles.button}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    this.placesListFadeIn();
    if (this.props.places.places.length === 0) {
      return (
        <Animated.View
          style={{
            ...styles.button,
            opacity: this.state.fadeInAnim
          }}
        >
          <MainText style={{ textAlign: "center" }} color="black">
            <HeadingText>Go to Share to add more images !!!</HeadingText>
          </MainText>
        </Animated.View>
      );
    }
    return (
      <Animated.View
        style={{
          opacity: this.state.fadeInAnim
        }}
      >
        <PlaceList
          places={this.props.places.places}
          onItemSelect={id => {
            this.placeSelect(id);
          }}
        />
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});
const mapStateToProps = state => ({
  places: state.places
});

export default connect(
  mapStateToProps,
  { getPlacesList }
)(FindPlace);
