import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";

const ActiveButton = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.primary,
        borderRadius: 5,
        width: 335,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
        alignSelf: "center",
      }}
      onPress={() => navigation.navigate(props.onPress)}
    >
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "PoppinsMedium",
    color: colors.white,
  },
});

export default ActiveButton;
