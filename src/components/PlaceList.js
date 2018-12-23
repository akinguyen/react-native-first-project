import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import ListItem from "./ListItem";

export default function PlaceList(props) {
  return (
    <FlatList
      data={props.places}
      renderItem={info => (
        <ListItem
          itemID={info.item._id}
          placeName={info.item.text}
          placeImage={{ uri: info.item.image }}
          email={info.item.email}
          onItemPressed={() => props.onItemSelect(info.item._id)}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      style={styles.listContainer}
    />
  );
}
const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});
