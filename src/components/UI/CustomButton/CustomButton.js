import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
export default function CustomButton(props) {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={props.position}
      onPress={props.onPress}
    >
      <View
        style={[
          styles.button,
          {
            backgroundColor: props.buttonColor,
            borderColor: props.borderColor
          }
        ]}
      >
        <Text
          style={[
            {
              color: props.textColor ? props.textColor : "white",
              fontWeight: "bold"
            }
          ]}
        >
          {props.children.toUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black"
  }
});
