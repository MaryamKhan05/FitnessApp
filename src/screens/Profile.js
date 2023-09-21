import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

import { Divider, ProfileCard } from "../components/INDEX";
import MainLyout from "../layouts/MainLayout";
import colors from "../../assets/colors/colors";
const size = 25;
const color = "#B1B1B1";
const Profile = () => {
  return (
    <MainLyout heading="My Profile">
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
          <Image
            source={require("../../assets/ferioLabs/Premium.png")}
            resizeMode="contain"
            style={{ height: 70, width: 70 }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontFamily: "PoppinsBold" }}>
          Maryam Khan
        </Text>
      </View>
      <ProfileCard text="Personal Information" onPress="ProfileInfo">
        {/* <View
          style={{
            backgroundColor: "pink",
            height: 30,
            width: 40,
            alignItems: "center",
          }}
        > */}
        <FontAwesome
          name="user"
          size={size}
          color={color}
          style={styles.icon}
        />
        {/* </View> */}
      </ProfileCard>
      <ProfileCard text="Update Password" onPress="">
        <Feather name="lock" size={size} color={color} style={styles.icon} />
      </ProfileCard>
      <ProfileCard text="Update Premium" onPress="">
        {/* <View
          style={{
            backgroundColor: "pink",
            height: 30,
            width: 40,
            alignItems: "center",
            justifyContent:'center'
          }}
        > */}
        <FontAwesome
          name="diamond"
          size={20}
          color={color}
          style={styles.icon}
        />
        {/* </View> */}
      </ProfileCard>
      <ProfileCard text="Update Equipment" onPress="">
        <MaterialCommunityIcons
          name="dumbbell"
          size={size}
          color={color}
          style={styles.icon}
          resizeMode="contain"
        />
      </ProfileCard>
      <ProfileCard text="Logout" onPress="">
        <MaterialIcons
          name="logout"
          size={size}
          color={color}
          style={styles.icon}
        />
      </ProfileCard>
      <Divider backgroundColor="#B2B2B2" />
      <ProfileCard text="Terms of Services" onPress="Terms">
        <MaterialCommunityIcons
          name="shield-account-outline"
          size={size}
          color={color}
          style={styles.icon}
        />
      </ProfileCard>
      <ProfileCard text="Release of Liability" onPress="Release">
        <MaterialCommunityIcons
          name="shield-account-outline"
          size={size}
          color={color}
          style={styles.icon}
        />
      </ProfileCard>
      <ProfileCard text="Rate Us" onPress="">
        <AntDesign name="staro" size={size} color={color} style={styles.icon} />
      </ProfileCard>
    </MainLyout>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 10,
  },
  card: {
    backgroundColor: colors.white,
    padding: 20,
    shadowColor: "#B2B2B2",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});

export default Profile;
