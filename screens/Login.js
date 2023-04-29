import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { Block, Button, Input, Text } from "../components";
import { theme } from "../constants";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const navigation = useNavigation();
  const handleLogin = () => {
    Keyboard.dismiss();
    let errors = [];
    if (!validateEmail(email)) {
      errors.push("email");
    }
    if (password.length < 6) {
      errors.push("password");
    }

    setErrors(errors);
    if (!errors.length) {
      navigation.navigate("Browse");
    }
  };
  const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);
  return (
    <KeyboardAvoidingView style={styles.login}>
      <Block white padding={[0, theme.sizes.base * 2]}>
        <Block middle>
          <Input
            label="Email"
            error={hasErrors("email")}
            defaultValue={email}
            style={[styles.input, hasErrors("email")]}
            onChangeText={onChangeEmail}
          />
          <Input
            secure
            label="Password"
            error={hasErrors("password")}
            style={[styles.input, hasErrors("password")]}
            defaultValue={password}
            onChangeText={onChangePassword}
          />
          <Button gradient onPress={handleLogin}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text bold white center>
                Login
              </Text>
            )}
          </Button>

          <Button onPress={() => navigation.navigate("Forgot")}>
            <Text
              gray
              caption
              center
              style={{ textDecorationLine: "underline" }}>
              Forgot your password?
            </Text>
          </Button>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
}

const validateEmail = (email) => {
  // Regular expression for email validation
  console.log(email);
  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  // Test the email against the regular expression and return the result
  console.log(emailRegex.test(email));
  return emailRegex.test(email);
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
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
