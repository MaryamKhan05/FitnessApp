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
    let e = await AsyncStorage.getItem("Equipments");
    let equipment = JSON.parse(e);

    console.log(equipment, "this is the equipent");
    if (upper) {
      // updatedWorkoutArray.push(workout.upperBody);

      const groupId = await AsyncStorage.getItem("uGroup");
      let bodyWeightEx = Object.values(workout.upperBody?.exercises).filter(
        (exercise) =>
          Array.isArray(exercise.equipmentRequired) &&
          exercise.equipmentRequired.includes("")
      );
      updatedWorkoutArray = [...updatedWorkoutArray, ...bodyWeightEx];
      console.log("hellw");
      // if (equipment.length === 0) {
      //   console.log("hellwjjjj");
      //   return;
      // }
      if (groupId !== null) {
        console.log("upper Item exists:", groupId);
        let group;
        if (groupId == 1) {
          console.log(groupId, "group id is 1");
          // console.log(workout.upperBody, "...");
          group = workout.upperBody?.groups[2].ex;
          await AsyncStorage.setItem("uGroup", `${2}`);
          let newArray = Object.values(workout.upperBody?.exercises).filter(
            (exercise) => group.includes(exercise.id)
          );
          // console.log(newArray, "<<<<<<<=====new array");
          const finalArray = newArray?.filter((exercise) =>
            exercise.equipmentRequired?.some((equipmentType) =>
              equipment.includes(equipmentType)
            )
          );
          // console.log(finalArray, "<----final array");
          updatedWorkoutArray = [...updatedWorkoutArray, ...finalArray];
        } else {
          console.log(groupId, "group id is 2");
          group = workout.upperBody?.groups[1].ex;
          await AsyncStorage.setItem("uGroup", `${1}`);
          let newArray = Object.values(workout.upperBody?.exercises).filter(
            (exercise) => group.includes(exercise.id)
          );
          // console.log(newArray, "<<<<<<<=====new array");
          const finalArray = newArray?.filter((exercise) =>
            exercise.equipmentRequired?.some((equipmentType) =>
              equipment.includes(equipmentType)
            )
          );
          // console.log(finalArray, "<----final array");
          updatedWorkoutArray = [...updatedWorkoutArray, ...finalArray];
        }
      } else {
        console.log("upper Items don't exist", workout.upperBody?.groups);
        const groupKeys = Object.keys(workout.upperBody?.groups);

        for (let i = groupKeys.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [groupKeys[i], groupKeys[j]] = [groupKeys[j], groupKeys[i]];
        }

        const randomGroupKey = groupKeys[0];
        console.log("Random group selected:", randomGroupKey);
        await AsyncStorage.setItem("uGroup", randomGroupKey);
        let group;
        if (randomGroupKey == 1) {
          group = workout.lowerBody?.groups[1].ex;
          await AsyncStorage.setItem("lGroup", `${1}`);

          let newArray = Object.values(workout.lowerBody?.exercises).filter(
            (exercise) => group.includes(exercise.id)
          );
          // console.log(
          //   "===================new array ",
          //   newArray,
          //   "===================new array "
          // );
          const finalArray = newArray?.filter((exercise) =>
            exercise.equipmentRequired?.some((equipmentType) =>
              equipment.includes(equipmentType)
            )
          );
          updatedWorkoutArray = [...updatedWorkoutArray, ...finalArray];
        } else {
          group = workout.lowerBody?.groups[2].ex;
          await AsyncStorage.setItem("lGroup", `${2}`);
          let newArray = Object.values(workout.lowerBody?.exercises).filter(
            (exercise) => group.includes(exercise.id)
          );
          const finalArray = newArray?.filter((exercise) =>
            exercise.equipmentRequired?.some((equipmentType) =>
              equipment.includes(equipmentType)
            )
          );
          updatedWorkoutArray = [...updatedWorkoutArray, ...finalArray];
        }
      }
    }

    if (lower) {
      const groupId = await AsyncStorage.getItem("lGroup");
      let bodyWeightEx = Object.values(workout.lowerBody?.exercises).filter(
        (exercise) =>
          Array.isArray(exercise.equipmentRequired) &&
          exercise.equipmentRequired.includes("")
      );
      updatedWorkoutArray = [...updatedWorkoutArray, ...bodyWeightEx];
      if (groupId !== null) {
        console.log("lower Item exists:", groupId);
        let group;
        if (groupId == 1) {
          console.log(groupId, "groupId");
          group = workout.lowerBody?.groups[2].ex;
          await AsyncStorage.setItem("lGroup", `${2}`);
          let newArray = Object.values(workout.lowerBody?.exercises).filter(
            (exercise) => group.includes(exercise.id)
          );
          const finalArray = newArray?.filter((exercise) =>
            exercise.equipmentRequired?.some((equipmentType) =>
              equipment.includes(equipmentType)
            )
          );
          updatedWorkoutArray = [...updatedWorkoutArray, ...finalArray];
        } else {
          console.log("grop id iw 2");
          group = workout.lowerBody?.groups[1].ex;
          await AsyncStorage.setItem("lGroup", `${1}`);
          let newArray = Object.values(workout.lowerBody?.exercises).filter(
            (exercise) => group.includes(exercise.id)
          );
          const finalArray = newArray?.filter(
            (exercise) =>
              exercise.equipmentRequired?.some((equipmentType) =>
                equipment.includes(equipmentType)
              ) ||
              exercise.equipmentOptions?.some((equipmentType) =>
                equipment.includes(equipmentType)
              )
          );
          updatedWorkoutArray = [...updatedWorkoutArray, ...finalArray];
        }
      } else {
        console.log("lower Items don't exist");
        const groupKeys = Object.keys(workout.lowerBody?.groups);

        for (let i = groupKeys.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [groupKeys[i], groupKeys[j]] = [groupKeys[j], groupKeys[i]];
        }

        const randomGroupKey = groupKeys[0];
        console.log("Random group selected:", randomGroupKey);
        await AsyncStorage.setItem("lGroup", randomGroupKey);
        let group;
        if (randomGroupKey == 1) {
          group = workout.lowerBody?.groups[1].ex;
          await AsyncStorage.setItem("lGroup", `${1}`);
          let newArray = Object.values(workout.lowerBody?.exercises).filter(
            (exercise) => group.includes(exercise.id)
          );
          const finalArray = newArray?.filter((exercise) =>
            exercise.equipmentRequired?.some((equipmentType) =>
              equipment.includes(equipmentType)
            )
          );
          updatedWorkoutArray = [...updatedWorkoutArray, ...finalArray];
        } else {
          group = workout.lowerBody?.groups[2].ex;
          await AsyncStorage.setItem("lGroup", `${2}`);
          let newArray = Object.values(workout.lowerBody?.exercises).filter(
            (exercise) => group.includes(exercise.id)
          );
          const finalArray = newArray?.filter((exercise) =>
            exercise.equipmentRequired?.some((equipmentType) =>
              equipment.includes(equipmentType)
            )
          );
          updatedWorkoutArray = [...updatedWorkoutArray, ...finalArray];
        }
      }
    }
    if (core) {
      const groupId = await AsyncStorage.getItem("cGroup");
      let bodyWeightEx = Object.values(workout.core?.exercises).filter(
        (exercise) =>
          Array.isArray(exercise.equipmentRequired) &&
          exercise.equipmentRequired.includes("")
      );
      updatedWorkoutArray = [...updatedWorkoutArray, ...bodyWeightEx];
      if (groupId !== null) {
        console.log("lower Item exists:", groupId);
        let group;
        if (groupId == 1) {
          console.log(groupId, "groupId");
          group = workout.core?.groups[2].ex;
          await AsyncStorage.setItem("cGroup", `${2}`);
          let newArray = Object.values(workout.core?.exercises).filter(
            (exercise) => group.includes(exercise.id)
          );
          const finalArray = newArray?.filter((exercise) =>
            exercise.equipmentRequired?.some((equipmentType) =>
              equipment.includes(equipmentType)
            )
          );
          updatedWorkoutArray = [...updatedWorkoutArray, ...finalArray];
        } else {
          console.log("group id is 2 core");
          group = workout.core?.groups[1].ex;
          await AsyncStorage.setItem("cGroup", `${1}`);
          let newArray = Object.values(workout.core?.exercises).filter(
            (exercise) => group.includes(exercise.id)
          );
          const finalArray = newArray?.filter((exercise) =>
            exercise.equipmentRequired?.some((equipmentType) =>
              equipment.includes(equipmentType)
            )
          );
          updatedWorkoutArray = [...updatedWorkoutArray, ...finalArray];
        }
      } else {
        console.log("upper Items don't exist");
        const groupKeys = Object.keys(workout.core?.groups);

        for (let i = groupKeys.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [groupKeys[i], groupKeys[j]] = [groupKeys[j], groupKeys[i]];
        }

        const randomGroupKey = groupKeys[0];
        console.log("Random group selected:", randomGroupKey);
        await AsyncStorage.setItem("cGroup", randomGroupKey);

        let group;
        if (randomGroupKey == 1) {
          group = workout.lowerBody?.groups[1].ex;
          await AsyncStorage.setItem("lGroup", `${1}`);
          let newArray = Object.values(workout.lowerBody?.exercises).filter(
            (exercise) => group.includes(exercise.id)
          );
          const finalArray = newArray?.filter((exercise) =>
            exercise.equipmentRequired?.some((equipmentType) =>
              equipment.includes(equipmentType)
            )
          );
          updatedWorkoutArray = [...updatedWorkoutArray, ...finalArray];
        } else {
          group = workout.lowerBody?.groups[2].ex;
          await AsyncStorage.setItem("lGroup", `${2}`);
          let newArray = Object.values(workout.lowerBody?.exercises).filter(
            (exercise) => group.includes(exercise.id)
          );
          const finalArray = newArray?.filter((exercise) =>
            exercise.equipmentRequired?.some((equipmentType) =>
              equipment.includes(equipmentType)
            )
          );
          updatedWorkoutArray = [...updatedWorkoutArray, ...finalArray];
        }
      }
    }

    if (!upper && !lower && !core) {
      console.log(equipment);

      let upperGroup = await AsyncStorage.getItem("uGroup");
      let lowerGroup = await AsyncStorage.getItem("lGroup");
      let coreGroup = await AsyncStorage.getItem("cGroup");
      let upperbodyWeightEx = Object.values(
        workout.upperBody?.exercises
      ).filter(
        (exercise) =>
          Array.isArray(exercise.equipmentRequired) &&
          exercise.equipmentRequired.includes("")
      );
      updatedWorkoutArray = [...updatedWorkoutArray, ...upperbodyWeightEx];

      let lowerbodyWeightEx = Object.values(
        workout.lowerBody?.exercises
      ).filter(
        (exercise) =>
          Array.isArray(exercise.equipmentRequired) &&
          exercise.equipmentRequired.includes("")
      );
      updatedWorkoutArray = [...updatedWorkoutArray, ...lowerbodyWeightEx];
      let coreWeightEx = Object.values(workout.core?.exercises).filter(
        (exercise) =>
          Array.isArray(exercise.equipmentRequired) &&
          exercise.equipmentRequired.includes("")
      );
      updatedWorkoutArray = [...updatedWorkoutArray, ...coreWeightEx];
      if (upperGroup !== null) {
        console.log("upper Item exists:", upperGroup);
        let group;
        if (upperGroup == 1) {
          console.log(upperGroup, "group id is 1");
          console.log(workout.upperBody, "...");
          group = workout.upperBody?.groups[2].ex;
          await AsyncStorage.setItem("uGroup", `${2}`);
          let newArray = Object.values(workout.upperBody?.exercises).filter(
            (exercise) => group.includes(exercise.id)
          );
          // console.log(newArray.length, "<<<<<<<=====new array");
          const finalArray = newArray?.filter((exercise) =>
            exercise.equipmentRequired?.some((equipmentType) =>
              equipment.includes(equipmentType)
            )
          );
          // console.log(finalArray.length, "<----final array");
          updatedWorkoutArray = [...updatedWorkoutArray, ...finalArray];
        } else {
          // console.log(groupId, "group id is 2");
          group = workout.upperBody?.groups[1].ex;
          await AsyncStorage.setItem("uGroup", `${1}`);
          let newArray = Object.values(workout.upperBody?.exercises).filter(
            (exercise) => group.includes(exercise.id)
          );
          console.log(newArray.length, "<<<<<<<=====new array");
          const finalArray = newArray?.filter((exercise) =>
            exercise.equipmentRequired?.some((equipmentType) =>
              equipment.includes(equipmentType)
            )
          );
          console.log(finalArray.length, "<----final array");
          updatedWorkoutArray = [...updatedWorkoutArray, ...finalArray];
        }
      } else {
        console.log("upper Items don't exist", workout.upperBody?.groups);
        const groupKeys = Object.keys(workout.upperBody?.groups);

        for (let i = groupKeys.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [groupKeys[i], groupKeys[j]] = [groupKeys[j], groupKeys[i]];
        }

        const randomGroupKey = groupKeys[0];
        console.log("Random group selected:", randomGroupKey);
        await AsyncStorage.setItem("uGroup", randomGroupKey);
        let group;
        if (randomGroupKey == 1) {
          group = workout.lowerBody?.groups[1].ex;
          await AsyncStorage.setItem("lGroup", `${1}`);

          let newArray = Object.values(workout.lowerBody?.exercises).filter(
            (exercise) => group.includes(exercise.id)
          );
          const finalArray = newArray?.filter((exercise) =>
            exercise.equipmentRequired?.some((equipmentType) =>
              equipment.includes(equipmentType)
            )
          );
          updatedWorkoutArray = [...updatedWorkoutArray, ...finalArray];
        } else {
          group = workout.lowerBody?.groups[2].ex;
          await AsyncStorage.setItem("lGroup", `${2}`);
          let newArray = Object.values(workout.lowerBody?.exercises).filter(
            (exercise) => group.includes(exercise.id)
          );
          const finalArray = newArray?.filter((exercise) =>
            exercise.equipmentRequired?.some((equipmentType) =>
              equipment.includes(equipmentType)
            )
          );
          updatedWorkoutArray = [...updatedWorkoutArray, ...finalArray];
        }
      }

      if (lowerGroup !== null) {
        console.log("lower Item exists:", lowerGroup);
        let group;
        if (lowerGroup == 1) {
          group = workout.lowerBody?.groups[2].ex;
          await AsyncStorage.setItem("lGroup", `${2}`);
          let equipment = await AsyncStorage.getItem("Equipments");
          let newArray = Object.values(workout.lowerBody?.exercises).filter(
            (exercise) => group.includes(exercise.id)
          );
          const finalArray = newArray?.filter((exercise) =>
            exercise.equipmentRequired?.some((equipmentType) =>
              equipment.includes(equipmentType)
            )
          );
          updatedWorkoutArray = [...updatedWorkoutArray, ...finalArray];
        } else {
          group = workout.lowerBody?.groups[1].ex;
          await AsyncStorage.setItem("lGroup", `${1}`);
          let equipment = await AsyncStorage.getItem("Equipments");
          let newArray = Object.values(workout.lowerBody?.exercises).filter(
            (exercise) => group.includes(exercise.id)
          );
          const finalArray = newArray?.filter((exercise) =>
            exercise.equipmentRequired?.some((equipmentType) =>
              equipment.includes(equipmentType)
            )
          );
          updatedWorkoutArray = [...updatedWorkoutArray, ...finalArray];
        }
      } else {
        //console.log("upper Items don't exist", workout.lowerBody.groups);
        const groupKeys = Object.keys(workout.lowerBody?.groups);

        for (let i = groupKeys.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [groupKeys[i], groupKeys[j]] = [groupKeys[j], groupKeys[i]];
        }

        const randomGroupKey = groupKeys[0];
        console.log("Random group selected:", randomGroupKey);
        await AsyncStorage.setItem("lGroup", randomGroupKey);
        let group;
        if (randomGroupKey == 1) {
          group = workout.lowerBody?.groups[1].ex;
          await AsyncStorage.setItem("lGroup", `${1}`);
          let newArray = Object.values(workout.lowerBody?.exercises).filter(
            (exercise) => group.includes(exercise.id)
          );
          const finalArray = newArray?.filter(
            (exercise) =>
              exercise.equipmentRequired?.some((equipmentType) =>
                equipment.includes(equipmentType)
              ) ||
              exercise.equipmentOptions?.some((equipmentType) =>
                equipment.includes(equipmentType)
              )
          );
          updatedWorkoutArray = [...updatedWorkoutArray, ...finalArray];
        } else {
          group = workout.lowerBody?.groups[2].ex;
          await AsyncStorage.setItem("lGroup", `${2}`);
          let newArray = Object.values(workout.lowerBody?.exercises).filter(
            (exercise) => group.includes(exercise.id)
          );
          const finalArray = newArray?.filter(
            (exercise) =>
              exercise.equipmentRequired?.some((equipmentType) =>
                equipment.includes(equipmentType)
              ) ||
              exercise.equipmentOptions?.some((equipmentType) =>
                equipment.includes(equipmentType)
              )
          );
          updatedWorkoutArray = [...updatedWorkoutArray, ...finalArray];
        }
      }

      if (coreGroup !== null) {
        console.log("lower Item exists:", coreGroup);
        let group;
        if (coreGroup == 1) {
          group = workout.core?.groups[2].ex;
          await AsyncStorage.setItem("cGroup", `${2}`);
          let equipment = await AsyncStorage.getItem("Equipments");
          let newArray = Object.values(workout.core?.exercises).filter(
            (exercise) => group.includes(exercise.id)
          );
          const finalArray = newArray?.filter(
            (exercise) =>
              exercise.equipmentRequired?.some((equipmentType) =>
                equipment.includes(equipmentType)
              ) ||
              exercise.equipmentOptions?.some((equipmentType) =>
                equipment.includes(equipmentType)
              )
          );
          updatedWorkoutArray = [...updatedWorkoutArray, ...finalArray];
        } else {
          group = workout.core?.groups[1].ex;
          await AsyncStorage.setItem("cGroup", `${1}`);
          let equipment = await AsyncStorage.getItem("Equipments");
          let newArray = Object.values(workout.core?.exercises).filter(
            (exercise) => group.includes(exercise.id)
          );
          const finalArray = newArray?.filter(
            (exercise) =>
              exercise.equipmentRequired?.some((equipmentType) =>
                equipment.includes(equipmentType)
              ) ||
              exercise.equipmentOptions?.some((equipmentType) =>
                equipment.includes(equipmentType)
              )
          );
          updatedWorkoutArray = [...updatedWorkoutArray, ...finalArray];
        }
      } else {
        //console.log("upper Items don't exist", workout.lowerBody.groups);
        const groupKeys = Object.keys(workout.core?.groups);

        for (let i = groupKeys.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [groupKeys[i], groupKeys[j]] = [groupKeys[j], groupKeys[i]];
        }

        const randomGroupKey = groupKeys[0];
        console.log("Random group selected:", randomGroupKey);
        await AsyncStorage.setItem("cGroup", randomGroupKey);

        let group;
        if (randomGroupKey == 1) {
          group = workout.lowerBody?.groups[1].ex;
          await AsyncStorage.setItem("lGroup", `${1}`);
          let newArray = Object.values(workout.lowerBody?.exercises).filter(
            (exercise) => group.includes(exercise.id)
          );
          const finalArray = newArray?.filter(
            (exercise) =>
              exercise.equipmentRequired?.some((equipmentType) =>
                equipment.includes(equipmentType)
              ) ||
              exercise.equipmentOptions?.some((equipmentType) =>
                equipment.includes(equipmentType)
              )
          );
          updatedWorkoutArray = [...updatedWorkoutArray, ...finalArray];
        } else {
          group = workout.lowerBody?.groups[2].ex;
          await AsyncStorage.setItem("lGroup", `${2}`);
          let newArray = Object.values(workout.lowerBody?.exercises).filter(
            (exercise) => group.includes(exercise.id)
          );
          const finalArray = newArray?.filter(
            (exercise) =>
              exercise.equipmentRequired?.some((equipmentType) =>
                equipment.includes(equipmentType)
              ) ||
              exercise.equipmentOptions?.some((equipmentType) =>
                equipment.includes(equipmentType)
              )
          );
          updatedWorkoutArray = [...updatedWorkoutArray, ...finalArray];
        }
      }
    }

    // await AsyncStorage.setItem("Categories", JSON.stringify(list));

    navigation.navigate("Exercises", { updatedWorkoutArray });
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
