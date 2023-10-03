import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Slider = (props) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={props.image}
        style={{ height: 200, width: 293 }}
        resizeMode="contain"
      />
      <View style={{ flexDirection: "row" }}>
        <Text style={[styles.text, { fontFamily: "PoppinsMedium" }]}>
          {props.text}
        </Text>
        <Text style={[styles.text, { fontFamily: "PoppinsBold" }]}>
          {" "}
          {props.text1}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        {props?.text2 ? (
          <Text
            style={[
              { color: "#001E6C", fontSize: 18, fontFamily: "PoppinsMedium" },
            ]}
          >
            {" "}
            {props.text2}
          </Text>
        ) : null}
        {props?.text3 ? (
          <Text
            style={[
              { color: "#001E6C", fontSize: 18, fontFamily: "PoppinsBold" },
            ]}
          >
            {" "}
            {props.text3}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#001E6C",
    fontSize: 18,
    marginTop: "20%",
  },
});

export default Slider;
