import React from "react";
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
const EditProfile = () => {
  return (
    <MainLyout heading="Personal Information">
      <View style={styles.card}>
        <TouchableOpacity
          style={{
            height: 70,
            width: 70,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "grey",
            borderRadius: 50,
            marginBottom: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <ImageBackground
            source={require("../../assets/ferioLabs/Premium.png")}
            resizeMode="contain"
            style={{
              height: 70,
              width: 70,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather name="camera" size={30} color={"white"} />
          </ImageBackground>
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontFamily: "PoppinsBold" }}>
          Maryam Khan
        </Text>
        <View style={styles.divider} />
        <View
          style={{
            flexDirection: "row",
            width: "90%",
            justifyContent: "space-between",
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>Username:</Text>
          <TextInput
            style={Styles.profileInput}
            placeholder="Maryam"
            placeholderTextColor={"#666666"}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "90%",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={styles.text}>Email:</Text>
          <TextInput
            style={Styles.profileInput}
            placeholder="Maryam@gmail.com"
            placeholderTextColor={"#666666"}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <ActiveButton title="Save" />
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
});

export default EditProfile;
