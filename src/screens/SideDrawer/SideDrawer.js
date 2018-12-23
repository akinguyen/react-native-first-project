import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableNativeFeedback
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { Navigation } from "react-native-navigation";
import { onLogOut } from "../../store/actions/authActions";
import { connect } from "react-redux";
class SideDrawer extends Component {
  render() {
    return (
      <View
        style={[
          styles.container,
          { width: Dimensions.get("window").width * 0.8 }
        ]}
      >
        <TouchableNativeFeedback
          onPress={() => {
            this.props.onLogOut();
            Navigation.startSingleScreenApp({
              screen: {
                screen: "awesome.AuthScreen",
                title: "Login"
              }
            });
          }}
        >
          <View style={styles.logout}>
            <Icon name="log-out" size={30} />
            <Text>Log out</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    backgroundColor: "white",
    flex: 1
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 6,
    marginTop: 8
  }
});
const mapStateToProps = state => ({
  user: state.user
});
export default connect(
  mapStateToProps,
  { onLogOut }
)(SideDrawer);
