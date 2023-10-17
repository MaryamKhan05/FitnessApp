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

  useEffect(() => {
    let workout = route.params?.updatedWorkoutArray;

    if (workout.some((item) => item.type === "upperBody")) {
      let upperBodyData = workout.filter((item) => item.type === "upperBody");
      checkUpperStorageHandler(upperBodyData);
    }
  }, []);

  const checkUpperStorageHandler = async (data) => {
    const groupId = await AsyncStorage.getItem("uGroup");

    if (groupId !== null) {
      console.log("Item exists:", groupId);
      let group;
      if (groupId == 1) {
        console.log(groupId, "group id is 1");
        group = data[0].groups[2];
        await AsyncStorage.setItem("uGroup", `${2}`);
      } else {
        console.log(groupId, "group id is 2");
        group = data[0].groups[1];
        await AsyncStorage.setItem("uGroup", `${1}`);
      }
    } else {
      console.log("Items don't exist", data[0].groups);
      const groupKeys = Object.keys(data[0].groups);

      for (let i = groupKeys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [groupKeys[i], groupKeys[j]] = [groupKeys[j], groupKeys[i]];
      }

      const randomGroupKey = groupKeys[0];
      console.log("Random group selected:", randomGroupKey);
      await AsyncStorage.setItem("uGroup", randomGroupKey);
    }
  };

  return <MainLyout heading="Workout"></MainLyout>;
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
