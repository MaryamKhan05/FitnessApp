import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { ActiveButton, BorderButton } from "../components/INDEX";
import RegLayout from "../layouts/RegistrationLayout";
import colors from "../../assets/colors/colors";
import Styles from "./Styles";

const Login = () => {
  return (
    <RegLayout>
      <Text style={Styles.regTopText}>Let's Get Started</Text>
      <ActiveButton title="Sign In" onPress={"Signin"} />
      <BorderButton heading="Sign Up" onPress={"Signup"} />
    </RegLayout>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: colors.white,
  },
});

export default Login;
