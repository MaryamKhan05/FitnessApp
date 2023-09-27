import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
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

const Exercises = () => {
  const [setNumber, setSetNumber] = useState(1);
  const [secondsRemaining, setSecondsRemaining] = useState(120);
  const [modalVisible, setModalVisible] = useState(false);
  const [day, setDay] = useState();
  const [category, setCategory] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [group, setGroup] = useState([]);
  const [data, setData] = useState();
  const [exercise, setExercise] = useState();
  const [finalArray, setFinalArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shuffledArray, setShuffledArray] = useState([]);
  const [count, setCount] = useState(0);
  const [startTimer, setTimer] = useState(false);
  const [rest, setRest] = useState(5);
  const [restTimer, setRestTimer] = useState(false);
  const [set, setSet] = useState(0);
  const [soundChing, setSoundChing] = React.useState();
  const [soundChaChing, setSoundChaChing] = React.useState();
  const [randomExercise, setRandomExercise] = useState();
  const [nextEx, setNextEx] = useState(false);

  // get the day

  useEffect(() => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDayString = daysOfWeek[currentDay];
    setDay(currentDayString);
  }, []);
  //get values from storage
  useEffect(() => {
    getValuesFromStorage();
  }, []);

  const getValuesFromStorage = async () => {
    const cat = await AsyncStorage.getItem("Category");
    setCategory(cat);

    const equi = await AsyncStorage.getItem("Equipments");
    const e = JSON.parse(equi);
    setEquipment(e);
  };

  useEffect(() => {
    if (day && category) {
      const data = workout[category] || workout.core;
      setData(data);

      const grp =
        day === "Monday" || day === "Wednesday" || day === "Friday"
          ? data?.groups[1]?.ex
          : data?.groups[2]?.ex;
      setGroup(grp);
    }
  }, [day, category]);

  useEffect(() => {
    if (data && group && equipment) {
      const filteredExercises = Object.values(data?.exercises).filter(
        (exercise) => group.includes(exercise.id)
      );
      // console.log("filteredExercises",filteredExercises?.equipmentOptions)
      const finalArray = filteredExercises?.filter((exercise) =>
        exercise.equipmentRequired?.some((equipmentType) =>
          equipment.includes(equipmentType)
        )
      );
      setFinalArray(finalArray);
    }
  }, [group, equipment]);

  useEffect(() => {
    if (finalArray) {
      // console.log("ahh haan", finalArray);
      shuffleArray(finalArray);
    } else {
      console.log("No matching exercises found.");
    }
  }, [finalArray]);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    // console.log("array is", array);
    setShuffledArray(array);
  }

  useEffect(() => {
    if (shuffleArray && finalArray) {
      setLoading(true);
      const randomExercise = finalArray[0];
      // console.log("randomExercise", randomExercise);
      setRandomExercise(randomExercise);
    }
    if (
      randomExercise?.variations?.available == true &&
      randomExercise?.equipmentRequired == equipment
    ) {
      const variations = randomExercise?.variations;
      const numberOfVariations = Object.keys(variations).length;
      const randomIndex = Math.floor(Math.random() * numberOfVariations);
      if (randomIndex !== 0) {
        const variationIds = Object.keys(variations);
        const selectedVariationId = variationIds[randomIndex];
        setExercise(variations[selectedVariationId]);
        // console.log(
        //   "selectedVariationIdlllllljjjjjssshhs",
        //   selectedVariationId
        // );
      }
      setLoading(false);
    } else {
      setExercise(randomExercise);
      setLoading(false);
    }
  }, [shuffledArray, randomExercise]);

  useEffect(() => {
    if (startTimer == true) {
      const countdown = setInterval(() => {
        if (secondsRemaining > 0) {
          setSecondsRemaining(secondsRemaining - 1);
        } else if (secondsRemaining == 0) {
          setCount(count + 1);
          setTimer(false);
          setRestTimer(true);
          chingHandler();
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [secondsRemaining, startTimer]);

  // rest timer
  useEffect(() => {
    if (restTimer && count !== 3) {
      if (secondsRemaining == 0) {
        const countdown = setInterval(() => {
          if (rest > 0) {
            setRest(rest - 1);
          } else if (rest == 0) {
            setRestTimer(false);
            setRest(5);
          }
        }, 1000);
        return () => clearInterval(countdown);
      }
    }
  }, [secondsRemaining, rest, restTimer]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  const restMin = Math.floor(rest / 60);
  const restSec = rest % 60;

  async function loadSoundAsync(source, setSound) {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(source);
    setSound(sound);
  }

  async function unloadSoundAsync(sound) {
    if (sound) {
      console.log("Unloading Sound");
      await sound.unloadAsync();
    }
  }

  React.useEffect(() => {
    return () => {
      unloadSoundAsync(soundChing);
      unloadSoundAsync(soundChaChing);
    };
  }, [soundChing, soundChaChing]);

  React.useEffect(() => {
    if (soundChing) {
      playSound(soundChing);
    }
  }, [soundChing]);

  const chingHandler = async () => {
    await unloadSoundAsync(soundChaChing);
    loadSoundAsync(require("../../assets/audio/Ching.mp3"), setSoundChing);
  };

  const chachingHandler = async () => {
    await unloadSoundAsync(soundChing);
    loadSoundAsync(
      require("../../assets/audio/ChaChing.mp3"),
      setSoundChaChing
    );
  };

  useEffect(() => {
    if (count == 3) {
      chachingHandler();
    }
  }, [count]);
  React.useEffect(() => {
    if (soundChaChing) {
      playSound(soundChaChing);
    }
  }, [soundChaChing]);

  const playSound = async (sound) => {
    console.log("Playing Sound");
    await sound.replayAsync();
  };

  useEffect(() => {
    if (nextEx) {
      console.log("nextEx", nextEx);
      // const randomExercise = finalArray[0];
      // console.log("randomExercise", randomExercise);
      // setRandomExercise(randomExercise);

      // if (
      //   randomExercise?.variations?.available == true &&
      //   randomExercise?.equipmentRequired == equipment
      // ) {
      //   const variations = randomExercise?.variations;
      //   const numberOfVariations = Object.keys(variations).length;
      //   const randomIndex = Math.floor(Math.random() * numberOfVariations);
      //   if (randomIndex !== 0) {
      //     const variationIds = Object.keys(variations);
      //     const selectedVariationId = variationIds[randomIndex];
      //     setExercise(variations[selectedVariationId]);
      //     console.log(
      //       "selectedVariationIdlllllljjjjjssshhs",
      //       selectedVariationId
      //     );
      //   }
      //   setLoading(false);
      // } else {
      //   setExercise(randomExercise);
      //   setLoading(false);
      // }
    }
  }, [nextEx, randomExercise]);

  const shuffleAndShowExercise = () => {
    if (randomExercise?.variations?.available == true) {
      const variations = randomExercise?.variations;
      const numberOfVariations = Object.keys(variations).length;
      const randomIndex = Math.floor(Math.random() * numberOfVariations);
      if (randomIndex !== 0) {
        const variationIds = Object.keys(variations);
        const selectedVariationId = variationIds[randomIndex];
        setExercise(variations[selectedVariationId]);
      }
      setLoading(false);
    } else {
      setExercise(randomExercise);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  return (
    <MainLyout heading="My Workout">
      <Card>
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{ fontSize: 18, fontFamily: "PoppinsSemi", margin: 5 }}
            >
              {exercise?.name}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <AntDesign name="infocirlceo" size={20} color={"#E8A243"} />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 14, fontFamily: "PoppinsBold", margin: 5 }}>
            Sets {exercise?.sets}
          </Text>

          <Divider backgroundColor="#00000029" width="90%" />
          <View style={styles.row}>
            <Text style={styles.number}>{exercise?.reps} </Text>
            <Text style={styles.text}>Reps</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.number}>2 min</Text>
            <Text style={styles.text}>Rest</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F5FAFF",
              borderRadius: 169,
              padding: 10,
              paddingHorizontal: 20,
              marginTop: 15,
            }}
          >
            <Image
              source={require("../../assets/ferioLabs/clock.png")}
              style={{ height: 40, width: 40 }}
              resizeMode="contain"
            />
            <Text style={styles.time}>{`${String(minutes).padStart(
              2,
              "0"
            )}  ${String(seconds).padStart(2, "0")}`}</Text>
          </View>

          {/* <Text style={styles.time}>{`${String(restMin).padStart(
            2,
            "0"
          )}  ${String(restSec).padStart(2, "0")}`}</Text> */}
        </View>

        {count == 0 ? (
          <TouchableOpacity
            style={{ marginTop: "10%" }}
            onPress={() => [setTimer(true), setSecondsRemaining(120)]}
          >
            <ActiveButton title="Start Exercise" width={"80%"} />
          </TouchableOpacity>
        ) : count == 1 || count == 2 ? (
          <TouchableOpacity
            style={{ marginTop: "10%" }}
            onPress={() => [setTimer(true), setSecondsRemaining(120)]}
          >
            <ActiveButton title="Next Set" width={"80%"} />
          </TouchableOpacity>
        ) : count == 3 ? (
          <TouchableOpacity
            style={{ marginTop: "10%" }}
            onPress={shuffleAndShowExercise}
          >
            <ActiveButton title="Next Exercise" width={"80%"} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ marginTop: "10%" }}
            onPress={shuffleAndShowExercise}
          >
            <ActiveButton title="Next Exercise" width={"80%"} />
          </TouchableOpacity>
        )}
      </Card>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.overlay,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              padding: 10,
              width: "90%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <AntDesign name="infocirlceo" size={20} color={"#E8A243"} />
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "PoppinsSemi",
                    margin: 5,
                    textAlign: "center",
                  }}
                >
                  {exercise?.name}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{}}
              >
                <Entypo name="circle-with-cross" size={20} color={"grey"} />
              </TouchableOpacity>
            </View>
            <Image
              source={exercise?.asset}
              style={{ height: 288, width: 288, alignSelf: "center" }}
              resizeMode="contain"
            />
          </View>
        </View>
      </Modal>
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
    fontSize: 35,
    fontFamily: "PoppinsSemi",
    margin: 5,
  },
});

export default Exercises;
