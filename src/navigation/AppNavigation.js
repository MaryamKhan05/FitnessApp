import { useEffect, useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  Login,
  Signin,
  Signup,
  Home,
  Terms,
  Release,
  ForgotPassword,
  Confirmation,
  Onboarding,
  NewPassword,
  Equiments,
} from "../screens/INDEX";
import TabNav from "./TabNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import colors from "../../assets/colors/colors";
import { auth, db } from "../FirebaseConfig";
const Stack = createNativeStackNavigator();

const AppNav = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    getTokenHandler();

    // const unsubscribe = auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     // User is signed in
    //     // Navigate to your app's main screen
    //     console.log("user is");
    //     setUser(true);
    //     setLoading(false);
    //   } else {
    //     // User is not signed in
    //     // Show the login screen
    //     console.log("user no user");
    //     setUser(false);
    //     setLoading(false);
    //   }
    // });

    // return () => unsubscribe();








    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, check if email is verified
        if (user.emailVerified) {
          // Email is verified, navigate to your app's main screen
          setUser(true);
        } else {
          // Email is not verified, restrict to the signup screen
          setUser(false);
        }
      } else {
        // User is not signed in, show the login screen
        setUser(false);
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);

  const getTokenHandler = async () => {
    try {
      let t = await AsyncStorage.getItem("token");
      if (t) {
        setLoggedIn(true);
      }
    } catch (e) {
      console.log("eror getting token from storage", e);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!user ? (
        <Stack.Navigator initialRouteName={loggedIn ? "Login" : "Onboarding"}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Confirmation"
            component={Confirmation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NewPassword"
            component={NewPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Release"
            component={Release}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Terms"
            component={Terms}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Equiments"
            component={Equiments}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TabNav"
            component={TabNav}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <TabNav />
      )}
    </NavigationContainer>
  );
};
export default AppNav;
