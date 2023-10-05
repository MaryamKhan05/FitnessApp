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
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Login = () => {
  const navigation = useNavigation();
  return (
    <RegLayout>
      <View
        style={{
         justifyContent:'flex-start', height:hp(50)
        }}
      >
        <Text style={Styles.regTopText}>Let's Get Started</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
          <ActiveButton title="Sign In" onPress={"Signin"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <BorderButton heading="Sign Up" onPress={"Signup"} />
        </TouchableOpacity>
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

export default Login;
