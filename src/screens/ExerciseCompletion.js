import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import colors from "../../assets/colors/colors";
import { ActiveButton } from "../components/INDEX";

const Completion = () => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Image
        source={require("../../assets/ferioLabs/completion.png")}
        style={{}}
        resizeMode="contain"
      />
      <TouchableOpacity style={{marginTop:hp(10)}}>
        <ActiveButton title="Try Advance" width={wp(70)} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Completion;
