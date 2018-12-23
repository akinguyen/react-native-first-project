import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// try out different Touchable classes
export default function ListItem(props) {
  return (
    <TouchableOpacity key={props.itemID} onPress={props.onItemPressed}>
      <View key={props.itemID} style={styles.listItem}>
        <Image
          key={props.itemID}
          resizeMode="contain"
          source={props.placeImage}
          style={styles.placeImage}
        />
        <Text>{props.placeName}</Text>
        <Text>{"  By: " + props.email}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    padding: 10,
    backgroundColor: "#eee",
    margin: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  placeImage: {
    marginRight: 8,
    height: 30,
    width: 100
  }
});
