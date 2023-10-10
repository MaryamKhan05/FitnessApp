import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Styles from "./Styles";
import { ActiveButton, Card } from "../components/INDEX";
import colors from "../../assets/colors/colors";
import MainLyout from "../layouts/MainLayout";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import workout from "../workoutList";
const Home = () => {
  const navigation = useNavigation();
  const [upper, setUpper] = useState(false);
  const [core, setCore] = useState(false);
  const [lower, setLower] = useState(false);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const size = 20;
  const color = "green";

  const handleNext = async () => {
    let updatedWorkoutArray = [];
    if (upper) {
      updatedWorkoutArray.push(workout.upperBody);
    }
    if (lower) {
      updatedWorkoutArray.push(workout.lowerBody);
    }
    if (core) {
      updatedWorkoutArray.push(workout.core);
    }
    setList(updatedWorkoutArray);
    try {
      await AsyncStorage.setItem("Categories", JSON.stringify(list));

      navigation.navigate("Exercises",{updatedWorkoutArray});
    } catch (e) {
      console.log("error saving category to storage", e);
    }
  };

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

      <TouchableOpacity style={{ marginTop: "5%" }} onPress={handleNext}>
        <ActiveButton title="Get Started" onPress="Exercises" />
      </TouchableOpacity>
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
    shadowOpacity: 0.4,
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
