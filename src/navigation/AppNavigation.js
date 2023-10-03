import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Login, Signin, Signup, Home, Terms, Release,ForgotPassword,Confirmation,ProfileInfo, Onboarding, NewPassword, Equiments } from "../screens/INDEX";
import TabNav from "./TabNav";
import HomeStack from "./TabNav";

const Stack = createNativeStackNavigator();

const AppNav = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <NavigationContainer>
      {/* {loggedIn ? ( */}
      <Stack.Navigator >
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ headerShown: false }}
        />
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
      {/* ) : (
        <TabNav />
      )} */}
    </NavigationContainer>
  );
};
// function TabNav() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="Terms" component={Terms} />
//     </Tab.Navigator>
//   );
// }
export default AppNav;
