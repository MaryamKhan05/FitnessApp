import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageComponent,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

import colors from "../../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileCard = (props) => {
  const navigation = useNavigation();
  const deleteEquipmentHandler = async () => {
    try {
      const d = await AsyncStorage.removeItem("Equipments");
      // console.log("equipments deleted!");
    } catch (e) {
      console.log("error deleting equipments", e);
    }
  };

  const handleSignout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => [
        props.text=="Logout"? handleSignout:null ,
        props.onPress == "Equiments" ? deleteEquipmentHandler() : null,
        navigation.navigate(props.onPress),
      ]}
    >
      <View style={{ width: "15%", alignItems: "center" }}>
        {props.children}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            width: "80%",
            fontFamily: "PoppinsRegular",
            fontSize: 14,
            color: "#4E2B4B",
            textAlign: "left",
            alignSelf: "center",
          }}
        >
          {props.text}
        </Text>
        <View style={{}}>
          <Entypo name="chevron-right" size={20} color="#B1B1B1" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.09,
    shadowRadius: 4,
    elevation: 3,
    width: "90%",
    borderRadius: 10,
    margin: 5,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ProfileCard;
