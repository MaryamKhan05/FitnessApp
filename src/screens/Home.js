import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Styles from "./Styles";
import { ActiveButton, Card } from "../components/INDEX";
import colors from "../../assets/colors/colors";
import MainLyout from "../layouts/MainLayout";
const Home = () => {
  const [upper, setUpper] = useState(false);
  const [core, setCore] = useState(false);
  const [lower, setLower] = useState(false);
  const size = 20;
  const color = "green";
  return (
    <MainLyout heading="Today's Workout">
      <Text
        style={[
          Styles.blackText,
          { color: colors.primary, marginVertical: 10 },
        ]}
      >
        Select Below
      </Text>

      <TouchableOpacity style={styles.card} onPress={() => setUpper(!upper)}>
        {upper ? (
          <View style={styles.iconContainer}>
            <AntDesign
              name="checkcircleo"
              size={size}
              color={color}
              style={styles.icon}
            />
          </View>
        ) : null}
        <View style={Styles.homeRow}>
          <Text style={Styles.homeText}>Upper Body</Text>
          <Image
            source={require("../../assets/ferioLabs/Corebody.png")}
            style={Styles.homeImage}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => setCore(!core)}>
        {core ? (
          <View style={styles.iconContainer}>
            <AntDesign
              name="checkcircleo"
              size={size}
              color={color}
              style={styles.icon}
            />
          </View>
        ) : null}
        <View style={Styles.homeRow}>
          <Text style={Styles.homeText}>Core</Text>
          <Image
            source={require("../../assets/ferioLabs/upperbody.png")}
            style={Styles.homeImage}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => setLower(!lower)}>
        {lower ? (
          <View style={styles.iconContainer}>
            <AntDesign
              name="checkcircleo"
              size={size}
              color={color}
              style={styles.icon}
            />
          </View>
        ) : null}
        <View style={Styles.homeRow}>
          <Text style={Styles.homeText}>Lower Body</Text>
          <Image
            source={require("../../assets/ferioLabs/lowerbody.png")}
            style={Styles.homeImage}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>

      <View style={{ marginTop: "10%" }}>
        <ActiveButton title="Get Started" onPress="Exercises" />
      </View>
    </MainLyout>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: 20,
    shadowColor: "#B2B2B2",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 15,
  },
  iconContainer: {
    shadowColor: "#B2B2B2",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    position: "absolute",
    alignSelf: "flex-end",
    top: -7,
    right: -7,
    backgroundColor: "white",
    borderRadius: 50,
  },
});

export default Home;
