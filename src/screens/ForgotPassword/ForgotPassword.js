import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import RegLayout from "../../layouts/RegistrationLayout";
import ForgotLayout from "../../layouts/ForgotPasswordLayout";
import Styles from "../Styles";
import { ActiveButton } from "../../components/INDEX";
import { handleResetPassword } from "../../firebase/firebase";
import { heightPercentageToDP } from "react-native-responsive-screen";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  return (
    <RegLayout>
      <View style={{ justifyContent: "flex-end", flex: 1 }}>
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
                left: heightPercentageToDP(2),
              }}
            >
              Email
            </Text>
            <TextInput
              style={[Styles.forgotInput, { alignSelf: "center" }]}
              placeholder="example@email.com"
              onChangeText={(text) => setEmail(text)}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => handleResetPassword(email)}>
              <ActiveButton title={"Reset"} />
            </TouchableOpacity>
          </View>
        </ForgotLayout>
      </View>
    </RegLayout>
  );
};

const styles = StyleSheet.create({});

export default ForgotPassword;
