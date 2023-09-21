import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Exercises = () => {
  return (
    <View>
      <Image
        source={require("../../assets/gifs/ArmExtension.gif")}
        style={{ height: 50, width: 50 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Exercises;
