import {
  KeyboardAvoidingView,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { theme } from "../constants";
import { Block, Button, Input, Text } from "../components";
import { useNavigation } from "@react-navigation/native";

export default function Forgot() {
  const [email, onChangeEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);

  const navigation = useNavigation();
  const handleForgot = () => {
    const errors = [];

    Keyboard.dismiss();
    // this.setState({ loading: true });

    // check with backend API or with some static data
    // if (email !== VALID_EMAIL) {
    //   errors.push("email");
    // }

    setErrors(errors);

    if (!errors.length) {
      Alert.alert(
        "Password sent!",
        "Please check you email.",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Login");
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Error",
        "Please check you Email address.",
        [{ text: "Try again" }],
        { cancelable: false }
      );
    }
  };

  return (
    <KeyboardAvoidingView style={styles.forgot} behavior="padding">
      <Block padding={[0, theme.sizes.base * 2]}>
        <Block middle>
          <Input
            label="Email"
            error={hasErrors("email")}
            defaultValue={email}
            style={[styles.input, hasErrors("email")]}
            onChangeText={onChangeEmail}
          />
          <Button gradient onPress={handleForgot}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text bold white center>
                Forgot
              </Text>
            )}
          </Button>

          <Button onPress={() => navigation.navigate("Login")}>
            <Text
              gray
              caption
              center
              style={{ textDecorationLine: "underline" }}>
              Back to Login
            </Text>
          </Button>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  forgot: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
});
