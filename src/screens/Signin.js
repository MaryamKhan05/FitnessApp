import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";

import {
  ActiveButton,
  BorderButton,
  Divider,
  RegNav,
} from "../components/INDEX";
import RegLayout from "../layouts/RegistrationLayout";
import colors from "../../assets/colors/colors";
import Styles from "./Styles";
import { useNavigation } from "@react-navigation/native";
import Feather from 'react-native-vector-icons/Feather'

const Signin = () => {
  const size = 20;
  const color = "#B2B6B7";
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [conEye, setconEye] = useState(false);
  const navigation = useNavigation();
  return (
    <RegLayout>
      <Text style={Styles.regTopText}>Signin</Text>
      <TextInput
        placeholder="Email"
        style={Styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <View style={Styles.input}>
        <TextInput placeholder="Confirm Password" />
        <TouchableOpacity onPress={() => setconEye(!conEye)}>
          {conEye ? (
            <Feather
              name="eye"
              size={size}
              color={color}
              style={Styles.eyeIcon}
            />
          ) : (
            <Feather
              name="eye-off"
              size={size}
              color={color}
              style={Styles.eyeIcon}
            />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={[Styles.text, { textAlign: "right", marginRight: 15 }]}>
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <View style={Styles.buttonTop}>
        <ActiveButton title="Sign In" onPress="TabNav" />
        <Divider />
        <RegNav
          heading="Don't have an account?"
          text="Sign Up"
          onPress="Signup"
        />
      </View>
    </RegLayout>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: colors.white,
  },
});

export default Signin;
