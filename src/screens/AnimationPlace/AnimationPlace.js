import React, { Component } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Easing,
  Dimensions
} from "react-native";

export default class AnimationPlace extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: "#d48bef"
  };
  state = {
    movingBox: new Animated.Value(0),
    windowWidth: Dimensions.get("window").width
  };
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    Dimensions.addEventListener("change", this.getViewMode);
  }
  componentWillUnmount() {
    console.log("Unmount");
    Dimensions.removeEventListener("change", this.getViewMode);
  }
  getViewMode = dim => {
    this.setState({
      windowWidth: dim.window.width
    });
  };
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

  movingBox() {
    this.state.movingBox.setValue(0);
    Animated.timing(this.state.movingBox, {
      toValue: 1,
      easing: Easing.linear,
      duration: 2000
    }).start(() => {
      this.movingBox();
    });
  }

  componentDidMount() {
    this.movingBox();
  }
  render() {
    return (
      <View>
        <Animated.View
          style={{
            marginLeft: this.state.movingBox.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0, this.state.windowWidth - 100, 0]
            })
          }}
        >
          <View style={styles.box} />
        </Animated.View>
        <View style={styles.container}>
          <Animated.Image
            style={{
              ...styles.ball,
              transform: [
                {
                  rotate: this.state.movingBox.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"]
                  })
                }
              ]
            }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: "red"
  },
  ball: {
    width: 50,
    height: 50,
    backgroundColor: "black",
    alignItems: "center",
    flex: 1
  },
  container: {
    marginTop: 20,
    alignItems: "center",
    flex: 1
  }
});
