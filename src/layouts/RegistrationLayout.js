import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Platform,
} from "react-native";
import { ActiveButton } from "../components/INDEX";
import colors from "../../assets/colors/colors";

import { StatusBar } from "expo-status-bar";

const RegLayout = (props) => {
  return (
    <ImageBackground
      source={require("../../assets/gym-with-dumbbells-floor.png")}
      style={{ flex: 1, zIndex: -1 }}
    >
      <View style={styles.overlay}>
       
          <View style={{ marginTop: "15%" }}>
            <Text style={styles.heading}>Workout</Text>
            <Text style={styles.flow}>Flow</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              flex: 1,
            }}
          >
            {props.children}
          </View>
      </View>
      <StatusBar style="light" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000099",
  },
  heading: {
    fontSize: 33,
    color: colors.white,
    fontFamily: "PoppinsBold",
    textAlign: "center",
  },
  flow: {
    fontSize: 33,
    color: colors.primary,
    fontFamily: "PoppinsBold",
    textAlign: "center",
  },
});

export default RegLayout;
