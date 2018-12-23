import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
export default class PickImage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={this.props.pickedImage} style={styles.previewImage} />

        <View style={styles.button}>
          <Button title="Pick Image" onPress={this.props.onPress} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    margin: 10,
    width: "50%"
  },
  previewImage: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: 250,
    height: 150,
    resizeMode: "contain"
  }
});
