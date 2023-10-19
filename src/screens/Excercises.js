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

  let exerciseArray = [];

  useEffect(() => {
    async function getCategory() {
      let workout = route.params?.updatedWorkoutArray;
      if (workout.some((item) => item.type === "upperBody")) {
        console.log("yes type upper exists");
        let upperBodyData = workout.filter((item) => item.type === "upperBody");
      await  checkUpperStorageHandler(upperBodyData);
      }
      if (workout.some((item) => item.type === "lowerBody")) {
        console.log("yes type lower exists");
        let lowerBodyData = workout.filter((item) => item.type === "lowerBody");
      await  checkLowerStorageHandler(lowerBodyData);
      }
      if (workout.some((item) => item.type === "core")) {
        console.log("yes type core exists");
        let coreData = workout.filter((item) => item.type === "core");
       await checkCoreStorageHandler(coreData);
      }
    }
    getCategory();
    console.log("exercise array starts", exerciseArray, "exercise aray ends");
  }, []);

  //upper storage check
  const checkUpperStorageHandler = async (data) => {
    setUpperData(data);
    const groupId = await AsyncStorage.getItem("uGroup");

    if (groupId !== null) {
      console.log("upper Item exists:", groupId);
      let group;
      if (groupId == 1) {
        console.log(groupId, "group id is 1");
        group = data[0].groups[2].ex;
        await AsyncStorage.setItem("uGroup", `${2}`);
        upperMainFunction(group, data);
      } else {
        console.log(groupId, "group id is 2");
        group = data[0].groups[1].ex;
        await AsyncStorage.setItem("uGroup", `${1}`);
        upperMainFunction(group, data);
      }
    } else {
      console.log("upper Items don't exist", data[0].groups);
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
  const upperMainFunction = async (group, data) => {
    let equipment = await AsyncStorage.getItem("Equipments");
    console.log(equipment, "---<<<");
    let newArray = Object.values(data[0]?.exercises).filter((exercise) =>
      group.includes(exercise.id)
    );
    console.log(newArray.length, "<<<<<<<=====new array");
    const finalArray = newArray?.filter(
      (exercise) =>
        exercise.equipmentRequired?.some((equipmentType) =>
          equipment.includes(equipmentType)
        ) ||
        exercise.equipmentOptions?.some((equipmentType) =>
          equipment.includes(equipmentType)
        )
    );
    console.log(finalArray.length, "<----final array");
    exerciseArray = [...exerciseArray, ...finalArray];
  };

  //lower storage check
  const checkLowerStorageHandler = async (data) => {
    setLowerData(data);
    const groupId = await AsyncStorage.getItem("lGroup");

    if (groupId !== null) {
      console.log(" lower Item exists:", groupId);
      let group;
      if (groupId == 1) {
        console.log(groupId, " lower group id is 1");
        group = data[0].groups[2].ex;
        await AsyncStorage.setItem("lGroup", `${2}`);
        lowerMainFunction(group);
      } else {
        console.log(groupId, "lower group id is 2");
        group = data[0].groups[1].ex;
        await AsyncStorage.setItem("lGroup", `${1}`);
        lowerMainFunction(group);
      }
    } else {
      console.log("lower Items don't exist", data[0].groups);
      const groupKeys = Object.keys(data[0].groups);

      for (let i = groupKeys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [groupKeys[i], groupKeys[j]] = [groupKeys[j], groupKeys[i]];
      }

      const randomGroupKey = groupKeys[0];
      console.log("lower Random group selected:", randomGroupKey);
      await AsyncStorage.setItem("lGroup", randomGroupKey);
    }
  };

  const lowerMainFunction = async (group) => {
    let equipment = await AsyncStorage.getItem("Equipments");
    let newArray = Object.values(lowerData[0]?.exercises).filter((exercise) =>
      group.includes(exercise.id)
    );
    console.log(newArray.length, "<<<<<<<=====lower new array");
    const finalArray = newArray?.filter(
      (exercise) =>
        exercise.equipmentRequired?.some((equipmentType) =>
          equipment.includes(equipmentType)
        ) ||
        exercise.equipmentOptions?.some((equipmentType) =>
          equipment.includes(equipmentType)
        )
    );
    console.log(finalArray.length, "<----lower final array");
    exerciseArray = [...exerciseArray, ...finalArray];
  };

  //core storage check
  const checkCoreStorageHandler = async (data) => {
    setUpperData(data);
    const groupId = await AsyncStorage.getItem("cGroup");

    if (groupId !== null) {
      console.log("core Item exists:", groupId);
      let group;
      if (groupId == 1) {
        console.log(groupId, "core group id is 1");
        group = data[0].groups[2].ex;
        await AsyncStorage.setItem("cGroup", `${2}`);
        coreMainFunction(group);
      } else {
        console.log(groupId, "core group id is 2");
        group = data[0].groups[1].ex;
        await AsyncStorage.setItem("cGroup", `${1}`);
        coreMainFunction(group);
      }
    } else {
      console.log("core Items don't exist", data[0].groups);
      const groupKeys = Object.keys(data[0].groups);

      for (let i = groupKeys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [groupKeys[i], groupKeys[j]] = [groupKeys[j], groupKeys[i]];
      }

      const randomGroupKey = groupKeys[0];
      console.log("core Random group selected:", randomGroupKey);
      await AsyncStorage.setItem("cGroup", randomGroupKey);
    }
  };
  const coreMainFunction = async (group) => {
    let equipment = await AsyncStorage.getItem("Equipments");

    console.log(equipment);
    let newArray = Object.values(coreData[0]?.exercises).filter((exercise) =>
      group.includes(exercise.id)
    );
    console.log(newArray.length, "<<<<<<<=====core new array");
    const finalArray = newArray?.filter(
      (exercise) =>
        exercise.equipmentRequired?.some((equipmentType) =>
          equipment.includes(equipmentType)
        ) ||
        exercise.equipmentOptions?.some((equipmentType) =>
          equipment.includes(equipmentType)
        )
    );
    console.log(finalArray.length, "<----core final array");
    exerciseArray = [...exerciseArray, ...finalArray];
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
