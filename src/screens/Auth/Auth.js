import React, { Component } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import startMainTabs from "../MainTabs/startMainTabs";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import {
  onLogin,
  onRegister,
  clearError
} from "../../store/actions/authActions";
import { connect } from "react-redux";
class Auth extends Component {
  state = {
    authMode: "Login",
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
    email: {
      value: "",
      valid: false,
      touched: false
    },
    password: {
      value: "",
      valid: false,
      touched: false
    },
    confirmPassword: {
      value: "",
      valid: false,
      touched: false
    },
    errors: {}
  };
  constructor() {
    super();
    Dimensions.addEventListener("change", this.getViewMode);
  }

  changeAuthMode() {
    this.props.clearError();
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "Sign up" ? "Login" : "Sign up",
        email: {
          value: "",
          valid: false,
          touched: false
        },
        password: {
          value: "",
          valid: prevState.authMode === "Login" ? false : true,
          touched: false
        },
        confirmPassword: {
          value: "",
          valid: prevState.authMode === "Login" ? false : true,
          touched: false
        }
      };
    });
  }
  loginHandler() {
    this.props.onLogin({
      email: this.state.email.value,
      password: this.state.password.value
    });
    //startMainTabs();
  }
  registerHandler() {
    this.props.onRegister({
      email: this.state.email.value,
      password: this.state.password.value
    });
  }
  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.getViewMode);
  }
  getViewMode = dim => {
    this.setState({
      viewMode: dim.window.height > 500 ? "potrait" : "landscape"
    });
  };
  inputHandler(key, userValue) {
    switch (key) {
      case "email":
        this.setState({
          email: {
            value: userValue,
            valid: validator.isEmail(userValue),
            touched: true
          }
        });
        break;
      case "password":
        this.setState(prevState => {
          return {
            password: {
              value: userValue,
              valid:
                prevState.authMode === "Login"
                  ? validator.isLength(userValue, { min: 6 }) &&
                    userValue === prevState.confirmPassword.value
                  : validator.isLength(userValue, { min: 6 }),
              touched: true
            },
            confirmPassword: {
              value: prevState.confirmPassword.value,
              valid:
                prevState.authMode === "Login"
                  ? validator.isLength(userValue, { min: 6 }) &&
                    userValue === prevState.confirmPassword.value
                  : true,
              touched: true
            }
          };
        });
        break;
      case "confirmPassword":
        this.setState(prevState => {
          return {
            confirmPassword: {
              value: userValue,
              valid:
                prevState.authMode === "Login"
                  ? validator.isLength(userValue, { min: 6 }) &&
                    userValue === prevState.password.value
                  : true,
              touched: true
            },
            password: {
              value: prevState.password.value,
              valid:
                prevState.authMode === "Login"
                  ? validator.isLength(userValue, { min: 6 }) &&
                    userValue === prevState.password.value
                  : true,
              touched: true
            }
          };
        });
        break;
      default:
        return;
    }
  }
  render() {
    let header =
      this.state.viewMode === "potrait" ? (
        <HeadingText>
          Please {this.state.authMode === "Login" ? "Sign up" : "Login"}
        </HeadingText>
      ) : null;

    let confirmPwd =
      this.state.authMode === "Sign up" ? null : (
        <DefaultInput
          style={
            this.state.viewMode !== "potrait"
              ? styles.inputLandScape
              : styles.input
          }
          placeholder="Confirm Password"
          value={this.state.confirmPassword.value}
          onChangeText={confirmPassword => {
            this.inputHandler("confirmPassword", confirmPassword);
          }}
          isValid={
            this.state.confirmPassword.valid ||
            !this.state.confirmPassword.touched
              ? null
              : styles.inValid
          }
          secureTextEntry
        />
      );
    if (this.props.user.loading) {
      return (
        <ImageBackground
          source={{
            uri: "https://i.imgur.com/u3CSHZF.jpg"
          }}
          style={styles.backgroundImage}
        >
          <View style={styles.button}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        </ImageBackground>
      );
    }
    return (
      <ImageBackground
        source={{
          uri: "https://i.imgur.com/u3CSHZF.jpg"
        }}
        style={styles.backgroundImage}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <MainText color="white">{header}</MainText>
          <CustomButton
            onPress={this.changeAuthMode.bind(this)}
            buttonColor="#29aaf4"
          >
            {`Switch to ${this.state.authMode}`}
          </CustomButton>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <DefaultInput
                style={styles.input}
                placeholder="Your E-mail Address"
                value={this.state.email.value}
                onChangeText={email => {
                  this.inputHandler("email", email);
                }}
                isValid={
                  !this.props.user.errors.email &&
                  (this.state.email.valid || !this.state.email.touched)
                    ? null
                    : styles.inValid
                }
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
              {this.props.user.errors.email ? (
                <MainText color="red" style={{ margin: 0 }}>
                  <HeadingText style={{ fontSize: 15 }}>
                    {this.props.user.errors.email}
                  </HeadingText>
                </MainText>
              ) : null}

              <View>
                <View
                  style={
                    this.state.viewMode !== "potrait"
                      ? styles.pwdContainerLandScape
                      : null
                  }
                >
                  <DefaultInput
                    style={
                      this.state.viewMode !== "potrait"
                        ? this.state.authMode === "Sign up"
                          ? styles.input
                          : styles.inputLandScape
                        : styles.input
                    }
                    placeholder="Password"
                    value={this.state.password.value}
                    onChangeText={password => {
                      this.inputHandler("password", password);
                    }}
                    isValid={
                      !this.props.user.errors.password &&
                      (this.state.password.valid ||
                        !this.state.password.touched)
                        ? null
                        : styles.inValid
                    }
                    secureTextEntry
                  />
                  {this.props.user.errors.password ? (
                    <MainText color="red" style={{ margin: 0 }}>
                      <HeadingText style={{ fontSize: 15 }}>
                        {this.props.user.errors.password}
                      </HeadingText>
                    </MainText>
                  ) : null}
                  {confirmPwd}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <CustomButton
            disabled={
              !this.state.email.valid ||
              !this.state.password.valid ||
              !this.state.confirmPassword.valid
            }
            buttonColor={
              !this.state.email.valid ||
              !this.state.password.valid ||
              !this.state.confirmPassword.valid
                ? "#dad2d2"
                : "#29aaf4"
            }
            onPress={
              this.state.authMode === "Login"
                ? this.registerHandler.bind(this)
                : this.loginHandler.bind(this)
            }
          >
            Submit
          </CustomButton>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}
const validator = require("validator");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    width: "80%"
  },
  textHeading: {},
  input: {
    backgroundColor: "#eee",
    borderColor: "#bbb"
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    flex: 1
  },
  pwdContainerLandScape: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  inputLandScape: {
    backgroundColor: "#eee",
    borderColor: "#bbb",
    width: "48.5%"
  },
  inValid: {
    borderColor: "red",
    backgroundColor: "#fd6969"
  },
  button: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});
const mapStateToProps = state => ({
  user: state.user
});
export default connect(
  mapStateToProps,
  { onLogin, onRegister, clearError }
)(Auth);
