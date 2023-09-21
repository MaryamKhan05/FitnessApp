import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Swiper from "react-native-swiper";
import colors from "../../assets/colors/colors";
import { Slider } from "../components/INDEX";

const Onboarding = () => {
  const swiperRef = React.createRef();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Swiper
        ref={swiperRef}
        loop={false}
        index={0}
        onIndexChanged={(index) => setCurrentIndex(index)}
        activeDotColor={colors.primary}
        activeDotStyle={{ padding: 5, borderRadius: 50, width: 20 }}
      >
        <Slider
          text="It's all about working Out"
          image={require("../../assets/ferioLabs/onb1.png")}
        />{" "}
        <Slider
          text="Get & Stay Fit"
          image={require("../../assets/ferioLabs/onb2.png")}
        />
        <Slider
          text="Shuffle your Flow,"
          text2="Stay on the Go."
          image={require("../../assets/ferioLabs/onb3.png")}
        />
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Onboarding;
