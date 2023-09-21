import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import RegLayout from "../../layouts/RegistrationLayout";
import ForgotLayout from "../../layouts/ForgotPasswordLayout";
import Styles from "../Styles";

const NewPassword = () => {
  const [newpassword, setNewPassword] = useState("New Password");
  const [newEye, setNewEye] = useState(false);
  const [conEye, setconEye] = useState(false);
  const size = 20;
  const color = "#B2B2B2";
  return (
    <RegLayout>
      <View style={{ justifyContent: "flex-end", flex: 1 }}>
        <ForgotLayout
          heading="Choose New Password"
          text=""
          flow="Confirmation"
          title="Reset Password"
          source={require("../../../assets/ferioLabs/key.png")}
        >
          <View style={{ marginVertical: "10%" }}>
            {/* <TextInput
              style={[Styles.forgotInput,{marginBottom:15}]}
              placeholder="New Password"
            /> */}
            <View style={[Styles.forgotInput]}>
              <TextInput placeholder=" New Password" />
              <TouchableOpacity onPress={() => setNewEye(!newEye)}>
                {newEye ? (
                  <Feather name="eye" size={size} color={color} />
                ) : (
                  <Feather name="eye-off" size={size} color={color} />
                )}
              </TouchableOpacity>
            </View>
            <View style={[Styles.forgotInput]}>
              <TextInput placeholder="Confirm New Password" />
              <TouchableOpacity onPress={() => setconEye(!conEye)}>
                {conEye ? (
                  <Feather name="eye" size={size} color={color}style={Styles.eyeIcon} />
                ) : (
                  <Feather name="eye-off" size={size} color={color} style={Styles.eyeIcon}/>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ForgotLayout>
      </View>
    </RegLayout>
  );
};

const styles = StyleSheet.create({});

export default NewPassword;
