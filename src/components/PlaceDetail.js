import React from "react";
import {
  Modal,
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
export default function PlaceDetail(props) {
  return (
    <Modal
      animationType="slide"
      onRequestClose={() => {
        alert("Modal closed");
      }}
      visible={props.visible}
    >
      <View>
        {props.selectedPlace ? (
          <View>
            <View style={styles.placeText}>
              <Image
                source={props.selectedPlace.image}
                style={styles.placeImage}
              />
              <Text style={styles.paragraph}>{props.selectedPlace.value}</Text>
            </View>

            <View>
              <TouchableOpacity
                onPress={key => {
                  props.onItemDelete(props.selectedPlace.key);
                }}
              >
                <View style={styles.deleteButton}>
                  <Icon size={30} name="trash-alt" color="red" />
                </View>
              </TouchableOpacity>

              <Button title="Close" onPress={props.onClose} />
            </View>
          </View>
        ) : null}
      </View>
    </Modal>
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
  placeText: {
    flexDirection: "column",
    alignItems: "center"
  },
  placeImage: {
    height: 100,
    width: 200,
    marginTop: 5,
    resizeMode: "contain"
    //textAlign: "center"
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "bold"
  },
  deleteButton: {
    alignItems: "center"
  }
});
