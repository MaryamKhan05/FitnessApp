import React, { useState, useEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";

const Exercises = () => {
  const navigation = useNavigation();
  const [setNumber, setSetNumber] = useState(1);
  const [secondsRemaining, setSecondsRemaining] = useState(60);
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
  const [rest, setRest] = useState(90);
  const [restTimer, setRestTimer] = useState(false);
  const [set, setSet] = useState(1);
  const [soundChing, setSoundChing] = React.useState();
  const [soundChaChing, setSoundChaChing] = React.useState();
  const [randomExercise, setRandomExercise] = useState();
  const [nextEx, setNextEx] = useState(false);
  const [restModal, setRestModal] = useState(false);
  const [text, setText] = useState("Start Exercise");
  const [calledOnce, setCalledOnce] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  let exerciseArray = [];
  const [exName, setExName] = useState();
  const [gif, setGif] = useState();

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
      // console.log("FINAL", finalArray);
      setFinalArray(finalArray);
    }
  }, [group, equipment]);

  useEffect(() => {
    if (finalArray) {
      if (!calledOnce) {
        // console.log("hhehyeyey000000", finalArray);

        shuffleArray(finalArray);
        // setCalledOnce(true);
        exerciseArray = finalArray;
        console.log("apppllee", exerciseArray[currentExerciseIndex]?.name);
        console.log("kkk", finalArray.length);
      }
    } else {
      Alert.alert("No matching exercises found.");
    }
  }, [finalArray]);

  useEffect(() => {
    if (currentExerciseIndex) {
      setExName(shuffledArray[currentExerciseIndex]?.name);
      setGif(shuffledArray[currentExerciseIndex]?.asset);
    }
  }, [currentExerciseIndex]);

  const nextHandler = () => {
    console.log("shuffle ", shuffledArray.length);
    console.log("shuffle 1", shuffledArray[1]?.name);
    console.log("shuffle 0", shuffledArray[0]?.name);
    console.log("shuffle 2", shuffledArray[2]?.name);
    console.log("iiiiiiippp", currentExerciseIndex);
    if (currentExerciseIndex < shuffledArray.length - 1) {
      console.log("iiiiiiioooo", currentExerciseIndex);
      setCurrentExerciseIndex(currentExerciseIndex + 1);

      if (shuffledArray[currentExerciseIndex]?.variations) {
        console.log("jjjj",shuffledArray[currentExerciseIndex]);
        shuffleArray(shuffledArray[currentExerciseIndex]);
      } else {
        setExName(shuffledArray[currentExerciseIndex].name);
        setGif(shuffledArray[currentExerciseIndex].asset);
      }
    } else {
      setTimeout(() => {
        navigation.navigate("Completion");
      }, 1000);
      setText("Finished!");
      setRest(false);
      setTimer(false);
    }
  };

  function shuffleArray(array) {
    console.log("array before", array.length);
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    console.log("array afetr", array.length);
    setShuffledArray(array);
    setExName(array[currentExerciseIndex]?.name);
    setGif(array[currentExerciseIndex]?.asset);
    // setCurrentExerciseIndex(currentExerciseIndex+1)
  }

  // useEffect(() => {
  //   if (shuffleArray && finalArray) {
  //     setLoading(true);
  //     const randomExercise = finalArray[0];
  //     // console.log("randomExercise", randomExercise);
  //     setRandomExercise(randomExercise);
  //   }
  //   if (
  //     randomExercise?.variations?.available == true &&
  //     randomExercise?.equipmentRequired == equipment
  //   ) {
  //     const variations = randomExercise?.variations;
  //     const numberOfVariations = Object.keys(variations).length;
  //     const randomIndex = Math.floor(Math.random() * numberOfVariations);
  //     if (randomIndex !== 0) {
  //       const variationIds = Object.keys(variations);
  //       const selectedVariationId = variationIds[randomIndex];
  //       setExercise(variations[selectedVariationId]);
  //       // console.log(
  //       //   "selectedVariationIdlllllljjjjjssshhs",
  //       //   selectedVariationId
  //       // );
  //     }
  //     setLoading(false);
  //   } else {
  //     setExercise(randomExercise);
  //     setLoading(false);
  //   }
  // }, [shuffledArray, randomExercise]);

  useEffect(() => {
    if (startTimer == true) {
      const countdown = setInterval(() => {
        if (secondsRemaining > 0) {
          setSecondsRemaining(secondsRemaining - 1);
        } else if (secondsRemaining == 0) {
          // setCount(count + 1);
          if (set < 3) {
            setText("Next Set");
          }
          setTimer(false);
          setRestModal(true);
          setRestTimer(true);
          chingHandler();
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [secondsRemaining, startTimer]);

  // rest timer
  useEffect(() => {
    if (restTimer) {
      const countdown = setInterval(() => {
        if (rest > 0) {
          setRest(rest - 1);
        } else if (rest == 0) {
          setRestModal(false);
          setRestTimer(false);
          setRest(90);
        }
      }, 1000);
      return () => clearInterval(countdown);
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
    setSet(1);
    setCount(0);
    // setRestTimer(5)
    // console.log("final array", finalArray);
    // console.log("randm", randomExercise);
    if (randomExercise?.variations?.available == true) {
      const variations = randomExercise?.variations;
      const numberOfVariations = Object.keys(variations).length;
      const randomIndex = Math.floor(Math.random() * numberOfVariations);
      if (randomIndex !== 0) {
        const variationIds = Object.keys(variations);
        const selectedVariationId = variationIds[randomIndex];
        setExercise(variations[selectedVariationId]);
        console.log("variation", variations[selectedVariationId]);
      }
      setLoading(false);
    } else {
      setExercise(randomExercise);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (set) {
  //     console.log(set, "set is");
  //   }
  //   if (set == 3) {
  //     setTimeout(() => {
  //       setText("Next Exercise");
  //     }, 10000);
  //   }
  // }, [set]);
  const texthandler = () => {
    if (set < 3) {
      if (text == "Start Exercise") {
        setTimer(true);
        setText("Rest");
        setSecondsRemaining(60);
        setCount(count + 1);
      } else if (text == "Rest") {
        setRestTimer(true);
        setRest(90);
        // setSecondsRemaining(5);
        setText("Next Set");
        setTimer(false);
      } else if (text == "Next Set") {
        setTimer(true);
        setText("Rest");
        setSecondsRemaining(60);
        setSet(set + 1);
      }
    } else if (text == "Next Exercise") {
      setText("Start Exercise");
      setSet(1);
      setRest(false);
      setSecondsRemaining(60);
      setTimer(false);
      // shuffleAndShowExercise();
      nextHandler();
    } else {
      setText("Next Exercise");
      // shuffleAndShowExercise();
      setSet(1);
      setRest(false);
      shuffleAndShowExercise();
      setSecondsRemaining(60);
      nextHandler();
      setTimer(false);
      setText("Start Exercise");
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
    <MainLyout heading="Workout">
      <Card>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: "10%",
            }}
          >
            <Text
              style={{ fontSize: 18, fontFamily: "PoppinsSemi", margin: 5 }}
            >
              {exName}
              {/* {exerciseArray[currentExerciseIndex]?.name} */}
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{ alignItems: "center", left: 20 }}
            >
              <AntDesign name="infocirlceo" size={20} color={"#E8A243"} />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 14, fontFamily: "PoppinsBold", margin: 5 }}>
            {/* Sets { set==3? set-1 :set} */}
            Set {set}
          </Text>

          <Divider backgroundColor="#00000029" width="90%" />
          {/* <View style={styles.row}>
            <Text style={styles.number}>{exercise?.reps} </Text>
            <Text style={styles.text}>Reps</Text>
          </View> */}
          {/* <View style={styles.row}>
            <Text style={styles.number}>2 min</Text>
            <Text style={styles.text}>Rest</Text>
          </View> */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F5FAFF",
              borderRadius: 169,
              // padding: 5,
              paddingHorizontal: 20,
              marginTop: "20%",
              width: "50%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../assets/ferioLabs/clock.png")}
              style={{ height: 25, width: 25 }}
              resizeMode="contain"
            />
            {startTimer && (
              <Text style={styles.time}>{`${String(minutes).padStart(
                2,
                "0"
              )} ${String(seconds).padStart(2, "0")}`}</Text>
            )}

            {restTimer && (
              <Text style={styles.time}>{`${String(restMin).padStart(
                2,
                "0"
              )} ${String(restSec).padStart(2, "0")}`}</Text>
            )}
            {!startTimer && !restTimer && (
              <Text style={styles.time}>01 00</Text>
            )}
          </View>
        </View>
        <View style={{ marginTop: "10%" }}>
          {/* {count == 0 ? (
            <TouchableOpacity
              style={{ marginTop: "10%" }}
              onPress={() => [
                setTimer(true),
                setSecondsRemaining(5),
                setCount(count + 1),
                setSet(set),
                setRestTimer(5),
              ]}
            >
              <ActiveButton title="Start Exercise" width={"80%"} />
            </TouchableOpacity>
          ) : count == 1 || count == 2 ? (
            <TouchableOpacity
              style={{ marginTop: "10%" }}
              onPress={() => [
                setTimer(true),
                setSecondsRemaining(5),
                setCount(count + 1),
                setSet(set + 1),
                setRestTimer(5),
              ]}
            >
              <ActiveButton title="Rest" width={"80%"} />
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
          )} */}
        </View>

        <TouchableOpacity onPress={texthandler}>
          <ActiveButton title={text} width="70%" />
        </TouchableOpacity>

        {/* button */}
      </Card>
      {/* git modal */}
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
                  {exName}
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
              source={gif}
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
    fontSize: 26,
    fontFamily: "PoppinsSemi",
    margin: 5,
    width: "70%",
    // textAlign:'center'
  },
});

export default Exercises;
