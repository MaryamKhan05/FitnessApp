import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Divider = (props) => {
  return (
    <View
      style={{
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : "white",
        width: props.width ? props.width : "80%",
        alignSelf: "center",
        marginVertical: hp(1),
        height: 1,
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default Divider;
