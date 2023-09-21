import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import RegLayout from "../../layouts/RegistrationLayout";
import ForgotLayout from "../../layouts/ForgotPasswordLayout";
import Styles from "../Styles";

const Confirmation = () => {
  return (
    <RegLayout>
      <View style={{ justifyContent: "flex-end", flex: 1 }}>
        <ForgotLayout
          heading="Password Reset"
          text="Your password has been successfully reset. Tap below to get in the flow."
          flow="TabNav"
          title="Continue"
          source={require("../../../assets/ferioLabs/tick.png")}
        >
          <View style={{ marginVertical: "10%" }}></View>
        </ForgotLayout>
      </View>
    </RegLayout>
  );
};

const styles = StyleSheet.create({});

export default Confirmation;
