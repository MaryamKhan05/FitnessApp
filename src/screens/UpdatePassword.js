import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import MainLyout from "../layouts/MainLayout";
import colors from "../../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import Styles from "./Styles";
import ActiveButton from "../components/activeButton";
import { updatePass, updatePassword } from "../firebase/firebase";
const UpdatePassword = () => {
  const [pass, setPass] = useState();
  const [newPass, setNewPass] = useState();
  const [confirmPass, setConfirmPass] = useState();
  return (
    <MainLyout heading="Personal Information">
      <View style={styles.card}>
        <TextInput
          style={Styles.forgotInput}
          placeholder="Current Password"
          placeholderTextColor={"#666666"}
          onChangeText={(text) => setPass(text)}
          autoCapitalize="none"
        />

        <TextInput
          style={Styles.forgotInput}
          placeholder="New Password"
          placeholderTextColor={"#666666"}
          onChangeText={(text) => setNewPass(text)}
          autoCapitalize="none"
        />
        <TextInput
          style={Styles.forgotInput}
          placeholder="Confirm New Password"
          placeholderTextColor={"#666666"}
          onChangeText={(text) => setConfirmPass(text)}
          autoCapitalize="none"
        />

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity onPress={()=>updatePass(pass,newPass)}>
            <ActiveButton title="Save Changes" />
          </TouchableOpacity>
        </View>
      </View>
    </MainLyout>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    paddingVertical: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    borderRadius: 10,
    margin: 10,
    // paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
  },
  details: {
    width: "60%",
    // color: "#00000029",
    color: "#666666",
  },
  divider: {
    backgroundColor: "#00000029",
    width: "100%",
    marginBottom: 12,
    padding: 0.1,
    marginTop: 22,
  },
  input: {
    borderColor: "#E5E6E7",
    borderWidth: 1,
    borderRadius: 6,
    width: 297,
    padding: 10,
    color: "#666666",
    marginVertical: 5,
  },
});

export default UpdatePassword;
