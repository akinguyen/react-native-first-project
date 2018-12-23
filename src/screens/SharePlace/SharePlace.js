import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";
const validator = require("validator");
import { connect } from "react-redux";
import InputContainer from "../../components/InputContainer";
import { placeSubmit } from "../../store/actions/placeActions";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import PickImage from "../../components/UI/PickImage/PickImage";
import ImagePicker from "react-native-image-picker";

class SharePlace extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: "#d48bef"
  };
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      text: {
        value: "",
        valid: false,
        touched: false
      },
      image: {
        value: {
          uri:
            "https://sanitationsolutions.net/wp-content/uploads/2015/05/empty-image.png"
        },
        valid: false,
        base64: ""
      }
    };
  }
  onNavigatorEvent(event) {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawToggle") {
        this.props.navigator.toggleDrawer({
          side: "left",
          animated: true
        });
      }
    }
  }
  pickImageHandler = () => {
    ImagePicker.showImagePicker(
      { title: "Pick an Image", maxWidth: 300, maxHeight: 200 },
      res => {
        if (res.didCancel) {
          console.log("User cancelled");
        } else if (res.error) {
          console.log("Errors", res.error);
        } else {
          this.setState({
            image: {
              value: { uri: "data:image/png;base64," + res.data },
              valid: true
            }
          });
        }
      }
    );
  };
  placeInput = text => {
    this.setState({
      text: { value: text, valid: !validator.isEmpty(text), touched: true }
    });
  };

  placeSubmit = () => {
    if (this.state.text.value.trim() === "") {
      return;
    }
    const item = {
      key: Math.random(),
      value: this.state.text.value,
      image: this.state.image.value,
      email: this.props.user.user.email
    };

    this.setState({
      text: {
        value: "",
        valid: false,
        touched: false
      },
      image: {
        value: {
          uri:
            "https://sanitationsolutions.net/wp-content/uploads/2015/05/empty-image.png"
        },
        valid: false,
        base64: ""
      }
    });
    this.props.placeSubmit(item);
    this.props.navigator.switchToTab({
      tabIndex: 0 // (optional) if missing, this screen's tab will become selected
    });
  };
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText color="black">
            <HeadingText>Share a place with us</HeadingText>
          </MainText>

          <PickImage
            pickedImage={this.state.image.value}
            onPress={() => {
              this.pickImageHandler();
            }}
          />

          <InputContainer
            text={this.state.text.value}
            onPress={() => {
              this.placeSubmit();
            }}
            onChangeText={this.placeInput}
            disabled={!this.state.text.valid || !this.state.image.valid}
            buttonColor={
              !this.state.text.valid || !this.state.image.valid
                ? "#dad2d2"
                : "#29aaf4"
            }
            isValid={
              this.state.text.valid || !this.state.text.touched
                ? null
                : styles.inValid
            }
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  button: {
    margin: 10
  },
  previewImage: {
    width: "100%",
    height: "100%"
  },
  inValid: {
    borderColor: "red",
    backgroundColor: "#fd6969"
  }
});
const mapStateToProps = state => ({
  places: state.places,
  user: state.user
});
export default connect(
  mapStateToProps,
  { placeSubmit }
)(SharePlace);
