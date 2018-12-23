import React, { Component } from "react";
import { connect } from "react-redux";
import { placeDelete } from "../../store/actions/placeActions";
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

class SelectedPlace extends Component {
  constructor() {
    super();
    Dimensions.addEventListener("change", this.getViewMode);
  }
  state = {
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
  };
  static navigatorStyle = {
    navBarBackgroundColor: "#d48bef"
  };
  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.getViewMode);
  }
  getViewMode = dim => {
    this.setState({
      viewMode: dim.window.height > 500 ? "portrait" : "landscape"
    });
  };

  close() {
    this.props.navigator.pop({
      animated: true, // does the pop have transition animation or does it happen immediately (optional)
      animationType: "fade" // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
    });
  }
  onItemDelete(id) {
    this.props.placeDelete(id);
    this.props.navigator.pop({
      animated: true, // does the pop have transition animation or does it happen immediately (optional)
      animationType: "fade" // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
    });
  }
  render() {
    return (
      <View>
        {this.props.selectedPlace ? (
          <View>
            <View style={styles.placeText}>
              <Image
                source={{ uri: this.props.selectedPlace.image }}
                style={
                  this.state.viewMode === "portrait"
                    ? styles.placeImage
                    : styles.placeImageLandScape
                }
              />
              <Text style={styles.paragraph}>
                {this.props.selectedPlace.text}
              </Text>
              <Text style={styles.paragraph}>
                {this.props.selectedPlace.email}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.onItemDelete(this.props.selectedPlace._id);
              }}
            >
              <View style={styles.deleteButton}>
                <Icon size={30} name="trash-alt" color="red" />
              </View>
            </TouchableOpacity>
            <View>
              <Button
                title="Close"
                onPress={() => {
                  this.close();
                }}
              />
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  placeText: {
    flexDirection: "column",
    alignItems: "center"
  },
  placeImage: {
    height: 300,
    width: 500,
    marginTop: 5,
    resizeMode: "contain"
    //textAlign: "center"
  },
  paragraph: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  },
  deleteButton: {
    alignItems: "center",
    marginBottom: 5
  },
  placeImageLandScape: {
    width: 200,
    height: 100,
    marginTop: 5,
    resizeMode: "contain"
  }
});

export default connect(
  null,
  { placeDelete }
)(SelectedPlace);
