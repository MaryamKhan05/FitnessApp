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

const ForgotPassword = () => {
  return (
    <RegLayout>
      <View
        style={{ justifyContent: "flex-end", flex: 1 }}
      >
        <ForgotLayout
          heading="Forgot Password?"
          text="No worries, we'll send you reset instruction"
          flow="NewPassword"
          title="Reset Password"
          source={require("../../../assets/ferioLabs/key.png")}
        >
          <View style={{ marginVertical: "10%" }}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "PoppinsRegular",
                color: "#020A1E",
                marginVertical: 10,
              }}
            >
              Email
            </Text>
            <TextInput
              style={Styles.forgotInput}
              placeholder="maryam@gmail.com"
            />
          </View>
        </ForgotLayout>
      </View>
    </RegLayout>
  );
};

const styles = StyleSheet.create({});

export default ForgotPassword;
