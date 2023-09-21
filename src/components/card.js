import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../assets/colors/colors";

const Card = (props) => {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        width:'90%',
        borderRadius:10,
        margin:10,
        paddingHorizontal:15
      }}
    >
      {props.children}
    </View>
  );
};

export default Card;
