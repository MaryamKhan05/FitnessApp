import React, { useRef, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, AppState } from "react-native";
import { useFonts } from "expo-font";

import {
  Home,
  Login,
  ProfileInfo,
  Signin,
  Signup,
  Terms,
  Release,
  Profile,
  Onboarding,
} from "./src/screens/INDEX";
import MainLyout from "./src/layouts/MainLayout";
import AppNav from "./src/navigation/AppNavigation";
import RegLayout from "./src/layouts/RegistrationLayout";
import TabNav from "./src/navigation/TabNav";

export default function App() {
  const [fontsLoaded] = useFonts({
    PoppinsBold: require("./assets/font/Poppins/Poppins-Bold.ttf"),
    PoppinsMedium: require("./assets/font/Poppins/Poppins-Medium.ttf"),
    PoppinsRegular: require("./assets/font/Poppins/Poppins-Regular.ttf"),
    PoppinsSemi: require("./assets/font/Poppins/Poppins-SemiBold.ttf"),
  });

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [activeTime, setActiveTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [sec, setSec] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (appState.current == "active") {
      const timer = setInterval(() => {
        setSec(sec + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
    if (appState.current == "inactive") {
      setSec(0);
    }
  }, [appState.current, sec]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ flex: 1}}>
      <AppNav/>
      {/* <Text>Current state is: {appStateVisible}</Text>
      <Text>seconds {sec}</Text> */}
      {/* <Onboarding/> */}
      {/* <TabNav/> */}
      {/* <Text>second are {sec}  </Text>
      <Text>state is  {appStateVisible}  </Text> */}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({});
