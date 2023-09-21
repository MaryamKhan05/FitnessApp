import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Slider = (props) => {
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", height: "50%" }}
    >
      <Image
        source={props.image}
        style={{ height: 266, width: 293 }}
        resizeMode="contain"
      />
      <Text>{props.text}</Text>
      {props?.text2 ? <Text>{props.text2}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Slider;
