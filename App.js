import React, { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

import { Home, Login, ProfileInfo, Signin, Signup, Terms,Release, Profile, Onboarding } from "./src/screens/INDEX";
import MainLyout from "./src/layouts/MainLayout";
import AppNav from "./src/navigation/AppNavigation";
import RegLayout from "./src/layouts/RegistrationLayout";

export default function App() {
  const [fontsLoaded] = useFonts({
    PoppinsBold: require("./assets/font/Poppins/Poppins-Bold.ttf"),
    PoppinsMedium: require("./assets/font/Poppins/Poppins-Medium.ttf"),
    PoppinsRegular: require("./assets/font/Poppins/Poppins-Regular.ttf"),
    PoppinsSemi: require("./assets/font/Poppins/Poppins-SemiBold.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ flex: 1 }}>
      {/* <AppNav/> */}
      {/* <ProfileInfo/> */}
      {/* <Login/> */}
      {/* <RegLayout>
        <Text>hello</Text>
      </RegLayout> */}
      <Onboarding/>
       {/* <Home/> */}
       {/* <Terms/> */}
       {/* <Release/> */}
       {/* <Profile/> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({});
