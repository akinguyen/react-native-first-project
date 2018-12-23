import React from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import DefaultInput from "./UI/DefaultInput/DefaultInput";
import CustomButton from "./UI/CustomButton/CustomButton";
export default function InputContainer(props) {
  return (
    <View style={styles.container}>
      <DefaultInput
        style={styles.input}
        value={props.text}
        placeholder="Place Name"
        onChangeText={props.onChangeText}
        isValid={props.isValid}
      />
      <View style={styles.button}>
        <CustomButton
          disabled={props.disabled}
          buttonColor={props.buttonColor}
          onPress={props.onPress}
        >
          Share the Place
        </CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%"
  },
  input: {
    width: "100%"
  },
  placeButton: {
    width: "20%"
  },
  button: {
    margin: 10
  }
});
