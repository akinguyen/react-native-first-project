import React from "react";
import { TextInput, StyleSheet } from "react-native";
export default function DefaultInput(props) {
  return (
    <TextInput {...props} style={[styles.input, props.style, props.isValid]} />
  );
}
const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "grey",
    padding: 5,
    margin: 8
  }
});
