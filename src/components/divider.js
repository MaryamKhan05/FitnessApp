import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Divider = (props) => {
  return (
    <View
      style={{
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : "white",
        width: "80%",
        alignSelf: "center",
        marginVertical: "4%",
        height: 1,
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default Divider;
