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
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Timer from "../components/timer";
const Exercises = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [upperData, setUpperData] = useState();
  const [lowerData, setLowerData] = useState();
  const [coreData, setCoreData] = useState();
  const [workoutData, setWorkoutData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [equipment, setEquipment] = useState();
  const [exercise, setExercise] = useState();
  const [exName, setExName] = useState();
  const [gif, setGif] = useState();

  const [startTimer, setTimer] = useState(false);
  const [rest, setRest] = useState(90);
  const [restTimer, setRestTimer] = useState(false);
  const [set, setSet] = useState(1);
  const [soundChing, setSoundChing] = useState();
  const [soundChaChing, setSoundChaChing] = useState();
  const [restModal, setRestModal] = useState(false);
  const [text, setText] = useState("Rest");
  const [calledOnce, setCalledOnce] = useState(false);
  const [setNumber, setSetNumber] = useState(1);
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const [startButton, setStartButton] = useState(true);
  const [count, setCount] = useState(0);
  const [workout, setWorkout] = useState();

  // background timer

  const [play, setPlay] = useState(true);
  const [duration, setDuration] = useState(10);
  const [key, setKey] = useState(0);
  const [call, setCall] = useState(false);

  const [restPlay, setRestPlay] = useState(false);
  const [restDuration, setRestDuration] = useState(15);
  const [restKey, setRestKey] = useState(Date.now() + 1);
  const resetTimer = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to reset the timer
  };
  const resetRestTimer = () => {
    setRestKey((prevKey) => prevKey + 1); // Change the key to reset the timer
  };
  let KEY = 1;
  let exerciseArray = [];
  useEffect(() => {
    if (route.params && equipment) {
      // console.log(route.params)
      shuffleHandler(route.params);
    }
  }, [route.params, equipment]);

  useEffect(() => {
    getEquipment();
  }, []);

  const getEquipment = async () => {
    let equipment = await AsyncStorage.getItem("Equipments");
    setEquipment(equipment);
  };

  const shuffleHandler = () => {
    //shuffle the array
    let array = route.params?.updatedWorkoutArray;
    console.log(array.length, "before");
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    setWorkout(array);

    // select one exercise randomly
    let randomExercise = array[currentExerciseIndex];

    if (randomExercise?.variations?.available == true)
      if (
        randomExercise?.equipmentRequired?.some((item) =>
          equipment.includes(item)
        ) ||
        randomExercise?.equipmentOptions?.some((item) =>
          equipment.includes(item)
        )
      ) {
        // console.log("variations available");
        // console.log("helloe");
        const variations = randomExercise?.variations;
        const numberOfVariations = Object.keys(variations).length;
        console.log(numberOfVariations);
        let randomIndex = Math.floor(Math.random() * numberOfVariations);
        // console.log(randomIndex, "random i");
        if (randomIndex !== 0) {
          const variationIds = Object.keys(variations);
          const selectedVariationId = variationIds[randomIndex];
          setExercise(variations[selectedVariationId]);
          setExName(variations[selectedVariationId].name);
          setGif(variations[selectedVariationId].asset);
          // setCurrentExerciseIndex(currentExerciseIndex + 1);
          // console.log(
          //   "selectedVariationIdlllllljjjjjssshhs",
          //   selectedVariationId
          // );
        } else {
          // console.log("randomIndex is 0");
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

  const nextExerciseHandler = () => {
    if (currentExerciseIndex < workout.length - 1) {
      setSet(1);
      setCount(0);
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      navigation.navigate("Completion");
    }
  };
  useEffect(() => {
    if (startTimer == true) {
      const countdown = setInterval(() => {
        if (secondsRemaining > 0) {
          setSecondsRemaining(secondsRemaining - 1);
        } else if (secondsRemaining == 0) {
          // setCount(count + 1);
          if (set < 3) {
            setText("Next");
          }
          setTimer(false);
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
      // console.log("Unloading Sound");
      await sound.unloadAsync();
    }
  }

  useEffect(() => {
    return () => {
      unloadSoundAsync(soundChing);
      unloadSoundAsync(soundChaChing);
    };
  }, [soundChing, soundChaChing]);

  useEffect(() => {
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
    if (soundChaChing) {
      playSound(soundChaChing);
    }
  }, [soundChaChing]);

  const playSound = async (sound) => {
    // console.log("Playing Sound");
    await sound.replayAsync();
  };

  useEffect(() => {
    if (set === 3 && text === "Rest" && secondsRemaining === 0) {
      setTimer(false);
      setText("Next Exercise");
      chachingHandler();
    }
  }, [set, text, secondsRemaining]);

  const texthandler = () => {
    // console.log("start pressed 1", text);
    if (set < 3) {
      console.log("set", set);
      if (text == "Start") {
        resetTimer();
        // console.log("start pressed 3",text);
        setTimer(true);
        setText("Rest");
        setSecondsRemaining(60);
        setCount(count + 1);
        setPlay(true);
        setDuration(10);
        // resetTimer();
        setCall(false);
      } else if (text == "Next Exercise") {
        setText("Start");
        setSet(1);
        setRest(false);
        setSecondsRemaining(60);
        setTimer(false);
        // nextHandler();
        nextExerciseHandler();
        setCount(0);
        setRestPlay(true);
        resetRestTimer();
        setRestDuration(15);
        setCall(false);
      } else if (text == "Rest") {
        console.log("resttttttttttt");
        setPlay(false);
        setDuration(10);
        setRestTimer(true);
        setRest(90);
        setText("Next");
        setTimer(false);
        setRestPlay(true);
        setRestDuration(15);
        resetRestTimer();
        setCall(true);
      } else if (text == "Next") {
        console.log(duration, "duuruurururuur");
        resetTimer();
        setTimer(true);
        setPlay(true);
        setDuration(10);
        setText("Rest");
        setSecondsRemaining(60);
        setSet(set + 1);
        setRest(false);
        setCount(count + 1);
        setRestPlay(false);
        setRestDuration(15);
        setCall(false);
      }
    } else if (text == "Next") {
      console.log("else if (text == Next");
      setText("Start");
      setSet(1);
      setRest(false);
      setSecondsRemaining(60);
      setDuration(10);
      // resetTimer();
      setTimer(false);
      // nextHandler();
      setCall(false);
      nextExerciseHandler();
      setCount(0);
      setRestPlay(false);
      setRestDuration(15);
      resetRestTimer();
    } else if (text == "Next Exercise") {
      setText("Start");
      setSet(1);
      setRest(false);
      setSecondsRemaining(60);
      setDuration(10);
      setTimer(false);
      // nextHandler();
      nextExerciseHandler();
      setCount(0);
      setRestPlay(false);
      setRestDuration(15);
      // resetTimer();
      setCall(false);
    } else {
      console.log("else");
      setText("Next Exercise");
      setTimer(false);
      // setSet(1);
      setRestTimer(true);
      setRest(90);
      setPlay(false);
      setDuration(10);
      setRestPlay(true);
      setRestDuration(15);
      chachingHandler();
      setCall(true);
    }
  };

  const soundHandler = () => {
    if (set === 2 || set === 1) {
      setText("Next");
      chingHandler();
    }
  };

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${String(minutes).padStart(2, "0")} ${String(
      remainingSeconds
    ).padStart(2, "0")}`;
    return formattedTime;
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
              {workout && workout[currentExerciseIndex]?.name}
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
          {/* <View
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
          </View> */}

          {/* exercise timer */}
          {play && (
            <CountdownCircleTimer
              key={key}
              isPlaying={play}
              duration={60}
              colors={[colors.primary, "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[7, 5, 2, 0]}
              size={80}
              strokeWidth={0}
              onComplete={soundHandler}
            >
              {({ remainingTime }) => (
                <Text style={{ fontSize: 20, fontWeight: "900" }}>
                  {formatTime(remainingTime)}
                </Text>
              )}
            </CountdownCircleTimer>
          )}

          {/* rest timer */}

          {restPlay && (
            <CountdownCircleTimer
              key={restKey}
              isPlaying={restPlay}
              duration={90}
              colors={[colors.primary, "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[7, 5, 2, 0]}
              size={80}
              strokeWidth={0}
              stroke={false}
              onComplete={() => setRestDuration(10)}
            >
              {({ remainingTime }) => (
                <Text style={{ fontSize: 20, fontWeight: "900" }}>
                  {formatTime(remainingTime)}
                </Text>
              )}
            </CountdownCircleTimer>
          )}

          {!restPlay && !play && (
            <Text style={{ fontSize: 20, fontWeight: "900", padding: 25 }}>
              00 00
            </Text>
          )}
        </View>

        {startButton ? (
          <TouchableOpacity onPress={texthandler}>
            <ActiveButton title={text} width="70%" />
          </TouchableOpacity>
        ) : (
          <ActiveButton title={text} width="70%" />
        )}
      </Card>

      {/* gif modal */}
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
                  {workout && workout[currentExerciseIndex]?.name}
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
              source={workout && workout[currentExerciseIndex]?.asset}
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
