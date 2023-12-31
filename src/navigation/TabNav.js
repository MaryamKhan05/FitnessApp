import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Login,
  Signin,
  Signup,
  Home,
  Terms,
  Release,
  ForgotPassword,
  Confirmation,
  ProfileInfo,
  Profile,
  Exercises,
  Onboarding,
  EditProfile,
  UpdatePassword,
  Equiments,
  Completion,
} from "../screens/INDEX";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import colors from "../../assets/colors/colors";
import { NavigationContainer, useNavigation } from "@react-navigation/native"
import { View } from "react-native";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function TabNav() {
  
  return (

    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: colors.primary }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          title: "Workout",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="running" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="user-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const HomeStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          title: "My Workout",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="running" size={size} color={color} />
          ),
        }}
      />
       <Stack.Screen
        name="Equiments"
        component={Equiments}
        options={{ headerShown: false }}
      />
     
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="running" size={size} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="Release"
        component={Release}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ProfileInfo"
        component={ProfileInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Exercises"
        component={Exercises}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdatePassword"
        component={UpdatePassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Completion"
        component={Completion}
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  );
};
export default TabNav;
