import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import MainLyout from "../layouts/MainLayout";
import colors from "../../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../FirebaseConfig";
const PersonalInfo = () => {
  const navigation = useNavigation();
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    getNameHandler();
    getMailHandler();
  }, []);
  const getNameHandler = async () => {
    try {
      let n = await AsyncStorage.getItem("Name");
      setName(n);
    } catch (e) {
      console.log("Error getting name from the storage", e);
    }
  };
  const getMailHandler = async () => {
    try {
      let n = await AsyncStorage.getItem("Email");
      setEmail(n);
    } catch (e) {
      console.log("Error getting email from the storage", e);
    }
  };
  return (
    <MainLyout heading="Personal Information">
      <View style={styles.card}>
        <TouchableOpacity
          style={{
            backgroundColor: "#eaf6fc",
            padding: 5,
            borderRadius: 50,
            position: "absolute",
            top: 30,
            zIndex: 1,
            right: 20,
          }}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <MaterialCommunityIcons
            name="pencil"
            size={20}
            color={colors.primary}
          />
        </TouchableOpacity>
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
            style={{ height: 70, width: 70, alignSelf: "center" }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontFamily: "PoppinsBold" }}>{name}</Text>
        <View style={styles.divider} />
        <View
          style={{
            flexDirection: "row",
            width: "90%",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={styles.text}>Username:</Text>
          <Text style={[styles.text, styles.details]}>{name}</Text>
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
          <Text style={[styles.text, styles.details]}>
            {auth.currentUser.email}
          </Text>
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

export default PersonalInfo;
