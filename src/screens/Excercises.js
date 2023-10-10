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
  // console.log("route", route.params?.updatedWorkoutArray.length);
  const navigation = useNavigation();
  const [setNumber, setSetNumber] = useState(1);
  const [secondsRemaining, setSecondsRemaining] = useState(10);
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
  const [rest, setRest] = useState(15);
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
  const [startButton, setStartButton] = useState(true);

  const [newly, setNewly] = useState([]);

  //get values from storage
  useEffect(() => {
    getValuesFromStorage();
  }, []);
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
    let DATA = route?.params?.updatedWorkoutArray;
    setData(DATA);
  }, []);

  const getValuesFromStorage = async () => {
    // const cat = await AsyncStorage.getItem("Category");
    // // console.log("cat", cat[0]);
    // const l = JSON.parse(cat);
    // console.log("lllll", l);
    // setCategory(l);

    const equi = await AsyncStorage.getItem("Equipments");
    const e = JSON.parse(equi);
    setEquipment(e);
  };

  const mainFuntion = () => {
    let exerciseArray = [];
    console.log("equipment;;;;", equipment, "equipment");
    if (data.some((item) => item.type === "upperBody")) {
      let upper = data.filter((item) => item.type === "upperBody");
      let grp =
        day === "Monday" || day === "Wednesday" || day === "Friday"
          ? upper[0].groups[1].ex
          : upper[0].groups[2].ex;

      let newArray = Object.values(upper[0]?.exercises).filter((exercise) =>
        grp.includes(exercise.id)
      );
      const finalArray = newArray?.filter((exercise) =>
        exercise.equipmentRequired?.some((equipmentType) =>
          equipment.includes(equipmentType)
        )
      );
      exerciseArray = [...exerciseArray, ...finalArray];
    }
    if (data.some((item) => item.type === "lowerBody")) {
      let lower = data.filter((item) => item.type === "lowerBody");
      let grp =
        day === "Tuesday" || day === "Thursday"
          ? lower[0].groups[1].ex
          : lower[0].groups[2].ex;

      let newArray = Object.values(lower[0]?.exercises).filter((exercise) =>
        grp.includes(exercise.id)
      );
      // console.log("newArray", newArray,'llllllsssss');
      const finalArray = newArray?.filter((exercise) =>
        exercise.equipmentRequired?.some((equipmentType) =>
          equipment.includes(equipmentType)
        )
      );
      // console.log(finalArray.length, "final");
      exerciseArray = [...exerciseArray, ...finalArray];
    }
    if (data.some((item) => item.type === "core")) {
      let core = data.filter((item) => item.type === "core");
      let grp =
        day === "Tuesday" || day === "Thursday"
          ? core[0].groups[1].ex
          : core[0].groups[2].ex;

      let newArray = Object.values(core[0]?.exercises).filter((exercise) =>
        grp.includes(exercise.id)
      );
      console.log("newArray", newArray,'llllllsssss');
      const finalArray = newArray?.filter((exercise) =>
        exercise.equipmentRequired?.some((equipmentType) =>
          equipment.includes(equipmentType)
        )
      );
      console.log(finalArray.length, "final");
      exerciseArray = [...exerciseArray, ...finalArray];
    }


    console.log('exerciseArray',exerciseArray,'exerciseArray')
  };

  useEffect(() => {
    if (data && equipment) {
      console.log("equipmentyyyyyyyy", equipment, "equipment");
      mainFuntion();
    }
  }, [data, equipment]);

  function shuffleArray() {
    let array = finalArray;
    console.log(array, "oooo___ooooo");
    // console.log("array before", array.length);
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    // console.log("array afetr", array);
    // console.log("buhahahr", array.length);
    setShuffledArray(array);
    setExName(array[currentExerciseIndex]?.name);
    setGif(array[currentExerciseIndex]?.asset);
    // setCurrentExerciseIndex(currentExerciseIndex+1)
  }

  // useEffect(() => {
  //   if (data && group && equipment.length > 0) {
  //     console.log("uuuuu");
  //     // console.log("equipments", equipment);
  //     const filteredExercises = Object.values(data?.exercises).filter(
  //       (exercise) => group.includes(exercise.id)
  //     );
  //     console.log("filtered", filteredExercises);
  //     const finalArray = filteredExercises?.filter((exercise) =>
  //       exercise.equipmentRequired?.some((equipmentType) =>
  //         equipment.includes(equipmentType)
  //       )
  //     );
  //     console.log("FINAL", finalArray);
  //     setFinalArray(finalArray);
  //   }
  // }, [group, equipment]);

  // new code when there is no equipment
  // useEffect(() => {
  //   if (data && equipment.length === 0) {
  //     let group = [...data?.groups[1]?.ex, ...data?.groups[2]?.ex];
  //     setGroup(group);
  //     const finalArray = Object.values(data?.exercises).filter(
  //       (exercise) =>
  //         group.includes(exercise.id) &&
  //         exercise.equipmentRequired.some(
  //           (equipmentType) => equipmentType === ""
  //         )
  //     );
  //     console.log("finalArray is", finalArray);
  //     // console.log("exercise.equipmentRequired",exercise?.equipmentRequired)
  //     if (finalArray.length === 0) {
  //       console.log("No Exercises To Show");
  //       setStartButton(false);
  //     }
  //     setFinalArray(finalArray);
  //   }
  // }, [equipment]);

  // useEffect(() => {
  //   if (finalArray) {
  //     if (!calledOnce) {
  //       console.log("hhehyeyey", finalArray[0]?.name);
  //       console.log("array before", finalArray.length);
  //       for (let i = finalArray.length - 1; i > 0; i--) {
  //         const j = Math.floor(Math.random() * (i + 1));
  //         [finalArray[i], finalArray[j]] = [finalArray[j], finalArray[i]];
  //       }

  //       console.log("array afetr", finalArray.length);
  //       setShuffledArray(finalArray);
  //       setExName(finalArray[currentExerciseIndex]?.name);
  //       setGif(finalArray[currentExerciseIndex]?.asset);
  //     }
  //   } else {
  //     Alert.alert("No matching exercises found.");
  //   }
  // }, [finalArray]);

  // useEffect(() => {
  //   if (currentExerciseIndex) {
  //     setExName(shuffledArray[currentExerciseIndex]?.name);
  //     setGif(shuffledArray[currentExerciseIndex]?.asset);
  //   }
  // }, [currentExerciseIndex]);

  const nextHandler = () => {
    // console.log("shuffle ", shuffledArray.length);
    // console.log("shuffle 0", shuffledArray[0]?.name);
    // console.log("shuffle 1", shuffledArray[1]?.name);
    // console.log("shuffle 2", shuffledArray[2]?.name);
    // console.log("iiiiiiippp", currentExerciseIndex);
    if (currentExerciseIndex < shuffledArray.length - 1) {
      // console.log("iiiiiiioooo", currentExerciseIndex);
      setCurrentExerciseIndex(currentExerciseIndex + 1);

      // new code
      console.log(
        "variation????",
        shuffledArray[currentExerciseIndex]?.variations
      );
      if (shuffledArray[currentExerciseIndex]?.variations?.available == true) {
        console.log("llssbsbsb");
        const variations = shuffledArray[currentExerciseIndex]?.variations;
        const numberOfVariations = Object.keys(variations).length;
        const randomIndex = Math.floor(Math.random() * numberOfVariations);
        console.log("random index", randomIndex);
        if (randomIndex !== 0) {
          console.log("-------------random!==0");
          const variationIds = Object.keys(variations);
          const selectedVariationId = variationIds[randomIndex];
          console.log(
            "selectedVariationId",
            variations[selectedVariationId].name
          );
          const requiredEquipment =
            variations[selectedVariationId]?.equipmentRequired;
          console.log("requiredEquipment", requiredEquipment);

          const containsMatchingEquipment = requiredEquipment?.some(
            (equipmentItem) => equipment.includes(equipmentItem)
          );
          console.log("containsMatchingEquipment", containsMatchingEquipment);
          if (containsMatchingEquipment) {
            setExName(variations[selectedVariationId]?.name);
            setGif(variations[selectedVariationId]?.asset);
          } else {
            console.log("ooejej");
            setExName(shuffledArray[currentExerciseIndex].name);
            setGif(shuffledArray[currentExerciseIndex].asset);
          }
        }
      } else {
        console.log("00202002");
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

  // useEffect(() => {
  //   if (startTimer == true) {
  //     const countdown = setInterval(() => {
  //       if (secondsRemaining > 0) {
  //         setSecondsRemaining(secondsRemaining - 1);
  //       } else if (secondsRemaining == 0) {
  //         // setCount(count + 1);
  //         if (set < 3) {
  //           setText("Next Set");
  //         }
  //         setTimer(false);
  //         setRestModal(true);
  //         setRestTimer(true);
  //         chingHandler();
  //       }
  //     }, 1000);
  //     return () => clearInterval(countdown);
  //   }
  // }, [secondsRemaining, startTimer]);

  // rest timer
  // useEffect(() => {
  //   if (restTimer) {
  //     const countdown = setInterval(() => {
  //       if (rest > 0) {
  //         setRest(rest - 1);
  //       } else if (rest == 0) {
  //         setRestModal(false);
  //         setRestTimer(false);
  //         setRest(15);
  //       }
  //     }, 1000);
  //     return () => clearInterval(countdown);
  //   }
  // }, [secondsRemaining, rest, restTimer]);

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

  const texthandler = () => {
    if (set < 3) {
      if (text == "Start Exercise") {
        setTimer(true);
        setText("Rest");
        setSecondsRemaining(10);
        setCount(count + 1);
      } else if (text == "Rest") {
        setRestTimer(true);
        setRest(15);
        setText("Next Set");
        setTimer(false);
      } else if (text == "Next Set") {
        setTimer(true);
        setText("Rest");
        setSecondsRemaining(10);
        setSet(set + 1);
        setRest(false);
      }
    } else if (text == "Next Exercise") {
      setText("Start Exercise");
      setSet(1);
      setRest(false);
      setSecondsRemaining(10);
      setTimer(false);
      nextHandler();
    } else {
      setText("Next Exercise");
      setSet(1);
      setRest(false);
      shuffleAndShowExercise();
      setSecondsRemaining(10);
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
            {startTimer ? (
              <Text style={styles.time}>{`${String(minutes).padStart(
                2,
                "0"
              )} ${String(seconds).padStart(2, "0")}`}</Text>
            ) : restTimer ? (
              <Text style={styles.time}>{`${String(restMin).padStart(
                2,
                "0"
              )} ${String(restSec).padStart(2, "0")}`}</Text>
            ) : (
              <Text style={styles.time}>01 00</Text>
            )}

            {/* {restTimer && (
              <Text style={styles.time}>{`${String(restMin).padStart(
                2,
                "0"
              )} ${String(restSec).padStart(2, "0")}`}</Text>
            )} */}
            {/* {!startTimer && !restTimer && (
              <Text style={styles.time}>01 00</Text>
            )} */}
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
        {startButton ? (
          <TouchableOpacity onPress={texthandler}>
            <ActiveButton title={text} width="70%" />
          </TouchableOpacity>
        ) : (
          <ActiveButton title={text} width="70%" />
        )}

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
