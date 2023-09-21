import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";

import { ActiveButton, BorderButton, Divider, RegNav } from "../components/INDEX";
import RegLayout from "../layouts/RegistrationLayout";
import colors from "../../assets/colors/colors";
import Styles from "./Styles";
import { useNavigation } from "@react-navigation/native";

const Signin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigation=useNavigation()
  return (
    <RegLayout>
      <Text style={Styles.regTopText}>Signin</Text>
      <TextInput
        placeholder="Email"
        style={Styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        style={Styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={()=>navigation.navigate("ForgotPassword")}>
        <Text style={[Styles.text, { textAlign: "right", marginRight: 10 }]}>
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <View style={Styles.buttonTop}>
        <ActiveButton title="Sign In" onPress="TabNav" />
        <Divider/>
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
