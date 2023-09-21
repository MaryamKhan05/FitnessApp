import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Styles from "../screens/Styles";
import { useNavigation } from "@react-navigation/native";

const RegNav = (props) => {
  const navigation=useNavigation()
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <Text style={Styles.text}>{props.heading} </Text>
      <TouchableOpacity onPress={()=>navigation.navigate(props.onPress)}>
        <Text style={Styles.blueText}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles=StyleSheet.create({})


export default RegNav