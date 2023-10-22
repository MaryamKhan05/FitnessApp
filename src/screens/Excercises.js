import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import MainLyout from "../layouts/MainLayout";
import Card from "../components/card";
import ActiveButton from "../components/activeButton";
import colors from "../../assets/colors/colors";
import Divider from "../components/divider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import workout from "../workoutList";
import { useNavigation, useRoute } from "@react-navigation/native";

const Exercises = () => {
  const route = useRoute();
  const [upperData, setUpperData] = useState();
  const [lowerData, setLowerData] = useState();
  const [coreData, setCoreData] = useState();
  const [workoutData, setWorkoutData] = useState();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [equipment, setEquipment] = useState();
  const [exercise, setExercise] = useState();
  const [exName, setExName] = useState();
  const [gif, setGif] = useState();
  let exerciseArray = [];
  useEffect(() => {
    if (route.params && equipment) {
      shuffleHandler();
    }
  }, [route.params, equipment]);

  useEffect(() => {
    getEquipment();
  }, []);

  const shuffleHandler = () => {
    //shuffle the array
    let array = route.params?.updatedWorkoutArray;
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    // select one exercise randomly
    let randomExercise = array[currentExerciseIndex];

    if (randomExercise?.variations?.available == true)
      console.log("variations available");
    if (
      randomExercise?.equipmentRequired?.some((item) =>
        equipment.includes(item)
      ) ||
      randomExercise?.equipmentOptions?.some((item) => equipment.includes(item))
    ) {
      console.log("helloe");
      const variations = randomExercise?.variations;
      const numberOfVariations = Object.keys(variations).length;
      console.log(numberOfVariations);
      let randomIndex = Math.floor(Math.random() * numberOfVariations);
      console.log(randomIndex, "random i");
      if (randomIndex !== 0) {
        const variationIds = Object.keys(variations);
        const selectedVariationId = variationIds[randomIndex];
        setExercise(variations[selectedVariationId]);
        setExName(variations[selectedVariationId].name);
        setGif(variations[selectedVariationId].asset);
        // setCurrentExerciseIndex(currentExerciseIndex + 1);
        console.log(
          "selectedVariationIdlllllljjjjjssshhs",
          selectedVariationId
        );
      } else {
        console.log("randomIndex is 0");
        setExercise(randomExercise);
        setExName(randomExercise.name);
        setGif(randomExercise.asset);
        console.log(randomExercise?.name);
      }
      // setLoading(false);
    } else {
      setExercise(randomExercise);
      setExName(randomExercise?.name);
      // setCurrentExerciseIndex(currentExerciseIndex + 1);
      setGif(randomExercise?.asset);

      // setLoading(false);
    }
  };
  const getEquipment = async () => {
    let equipment = await AsyncStorage.getItem("Equipments");
    setEquipment(equipment);
  };
  return (
    <MainLyout heading="Workout">
      <View>
        <Text style={{ fontSize: 24, fontWeight: "600" }}>
          {exercise?.name}
        </Text>
      </View>
      <Image
        source={gif}
        style={{ height: 120, width: 120, padding: 10, margin: 20 }}
      />

      <TouchableOpacity
        style={{ backgroundColor: colors.primary, padding: 10 }}
        onPress={shuffleHandler}
      >
        <Text style={{ color: "white" }}>Next</Text>
      </TouchableOpacity>
    </MainLyout>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: "#F5FAFF",
    justifyContent: "space-evenly",
    padding: 10,
    width: 320,
    margin: 5,
    borderRadius: 10,
  },
  number: {
    width: "20%",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "PoppinsSemi",
    color: colors.primary,
  },
  text: {
    fontSize: 18,
    fontFamily: "PoppinsRegular",
  },
  time: {
    fontSize: 26,
    fontFamily: "PoppinsSemi",
    margin: 5,
    width: "70%",
    // textAlign:'center'
  },
});

export default Exercises;
