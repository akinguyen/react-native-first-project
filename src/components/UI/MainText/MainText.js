import React from "react";
import { Text, StyleSheet } from "react-native";
export default function MainText(props) {
  return (
    <Text style={[styles.mainText, { color: props.color }, props.style]}>
      {props.children}
    </Text>
  );
}
const styles = StyleSheet.create({
  mainText: {
    color: "white",
    margin: 10
  }
});
