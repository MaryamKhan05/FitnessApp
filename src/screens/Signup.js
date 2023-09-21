import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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

const Signup = () => {
  const size = 20,
    color = "#B2B6B7";
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  return (
    <RegLayout>
      <Text style={Styles.regTopText}>Signup</Text>
      <TextInput
        placeholder="Name"
        style={Styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />
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
      <TextInput
        placeholder="Confirm Password"
        style={Styles.input}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <View style={styles.purpleTextContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="checkbox-outline"
            size={size}
            color={color}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Terms")}>
            <Text style={styles.purpleText}>Terms of Services</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons
            name="checkbox-blank-outline"
            size={size}
            color={color}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Terms")}>
            <Text style={styles.purpleText}>Release of Liability</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={Styles.buttonTop}>
        <ActiveButton title="Sign Up" />
        <Divider />
        <RegNav
          heading="Already have an account?"
          text="Sign In"
          onPress="Signin"
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
  purpleText: {
    color: "#A3BDFC",
    textDecorationLine: "underline",
    margin: 3,
  },
  purpleTextContainer: {
    margin: 10,
  },
});

export default Signup;
