import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Swiper from "react-native-swiper";
import colors from "../../assets/colors/colors";
import { ActiveButton, Slider } from "../components/INDEX";
import { useNavigation } from "@react-navigation/native";

const Onboarding = () => {
  const swiperRef = React.createRef();
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <View style={{ justifyContent: "center", height: "60%" }}>
        <Swiper
          ref={swiperRef}
          loop={false}
          index={0}
          onIndexChanged={(index) => setCurrentIndex(index)}
          activeDotColor={colors.primary}
          activeDotStyle={{
            height: 6,
            borderRadius: 76,
            width: 16,
            marginTop: "-20%",
          }}
          dotStyle={{
            height: 5,
            borderRadius: 76,
            width: 12,
            marginTop: "-20%",
          }}
          // dotColor="#001E6C"
        >
          <Slider
            text="It's all about"
            text1="working Out"
            image={require("../../assets/ferioLabs/onb1.png")}
          />
          <Slider
            text="Get & Stay"
            text1="Fit"
            image={require("../../assets/ferioLabs/onb2.png")}
          />
          <Slider
            text="Shuffle your,"
            text1="Flow"
            text2="Stay on the"
            text3=" Go."
            image={require("../../assets/ferioLabs/onb3.png")}
          />
        </Swiper>
      </View>
      {currentIndex == 2 && (
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{ position: "absolute", bottom: hp(10) }}
        >
          <ActiveButton title="Let's Go" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Onboarding;
