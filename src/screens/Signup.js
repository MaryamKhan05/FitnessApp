import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  ActiveButton,
  BorderButton,
  Divider,
  RegNav,
} from "../components/INDEX";
import RegLayout from "../layouts/RegistrationLayout";
import colors from "../../assets/colors/colors";
import Styles from "./Styles";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getFirestore,
  doc,
  setDoc, // Import setDoc function
} from "firebase/firestore";
const Signup = () => {
  const size = 20;
  const color = "#B2B6B7";
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [conEye, setconEye] = useState(true);
  const [passEye, setPassEye] = useState(true);
  const [terms, setTerms] = useState(false);
  const [liability, setLiability] = useState(false);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [userId, setUserId] = useState();

  useEffect(() => {
    getFlagHandler();
  }, []);

  const getFlagHandler = async () => {
    // setLoading(true);
    try {
      const f = await AsyncStorage.getItem("eFlag");
      console.log(f, "f");
      if (f) {
        setFlag(true);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log("errro getting flag from storage", e);
      setLoading(true);
    }
  };

  const saveTokenHandler = async () => {
    try {
      await AsyncStorage.setItem("token", token);
      // await AsyncStorage.setItem("userId", userId);
    } catch (e) {
      console.log("error saving token after signup", e);
      console.log("error saving id after signup", e);
    }
  };
  useEffect(() => {
    if (token) {
      saveTokenHandler();
      Alert.alert("Signed Up Successfully ! ");
      if (flag) {
        navigation.navigate("TabNav");
      } else {
        navigation.navigate("Equiments");
      }
      // setTimeout(() => {
      // }, 2000);
    }
  }, [token]);

  const handleSignUp = async () => {
    if (terms && liability) {
      setLoading(true);
      if (password == confirmPassword) {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            const user = userCredential.user;
            setToken(userCredential._tokenResponse.idToken);
            console.log("usid", userCredential._tokenResponse);
            setUserId(userCredential.user.providerData.uid);
            // Store the username in Firebase Realtime Database or Firestore
            const username = name; // Replace with the actual username
            const userId = user.uid; // The UID of the signed-up user

            // Firebase Realtime Database example:
            const userDocRef = doc(db, "users", userId);
            await setDoc(userDocRef, { username });
            setLoading(false);
          })
          .catch((error) => {
            console.log("error", error);
            const errorMessage = error.message;
            alert(errorMessage);
            setLoading(false);
          });
      } else {
        Alert.alert("Password doesn't match");
        setLoading(false);
      }
    } else {
      Alert.alert(
        "Make sure to mark Terms of Services and Release of liability "
      );
    }
    setLoading(false);
  };

  return (
    <RegLayout>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enableOnAndroid={true}
        scrollEnabled={true}
      >
        <Text style={Styles.regTopText}>Signup</Text>
        <TextInput
          placeholder="Name"
          style={[Styles.input, { padding: 10 }]}
          value={name}
          onChangeText={(text) => setName(text)}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Email"
          style={[Styles.input, { padding: 10 }]}
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <View style={[Styles.input]}>
          <TextInput
            style={Styles.authInput}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCapitalize="none"
            secureTextEntry={passEye}
          />
          <TouchableOpacity onPress={() => setPassEye(!passEye)}>
            {passEye == true ? (
              <Feather
                name="eye-off"
                size={size}
                color={color}
                style={Styles.eyeIcon}
              />
            ) : (
              <Feather
                name="eye"
                size={size}
                color={color}
                style={Styles.eyeIcon}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={Styles.input}>
          <TextInput
            style={Styles.authInput}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            autoCapitalize="none"
            secureTextEntry={conEye}
          />
          <TouchableOpacity onPress={() => setconEye(!conEye)}>
            {conEye ? (
              <Feather
                name="eye-off"
                size={size}
                color={color}
                style={Styles.eyeIcon}
              />
            ) : (
              <Feather
                name="eye"
                size={size}
                color={color}
                style={Styles.eyeIcon}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.purpleTextContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {terms ? (
              <TouchableOpacity onPress={() => setTerms(!terms)}>
                <MaterialCommunityIcons
                  name="checkbox-outline"
                  size={size}
                  color={color}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setTerms(!terms)}>
                <MaterialCommunityIcons
                  name="checkbox-blank-outline"
                  size={size}
                  color={color}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => navigation.navigate("Terms")}>
              <Text style={styles.purpleText}>Terms of Services</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            {liability ? (
              <TouchableOpacity onPress={() => setLiability(!liability)}>
                <MaterialCommunityIcons
                  name="checkbox-outline"
                  size={size}
                  color={color}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setLiability(!liability)}>
                <MaterialCommunityIcons
                  name="checkbox-blank-outline"
                  size={size}
                  color={color}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => navigation.navigate("Release")}>
              <Text style={styles.purpleText}>Release of Liability</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: hp(6) }}>
          <TouchableOpacity onPress={handleSignUp}>
            <ActiveButton title="Sign Up" />
          </TouchableOpacity>
          <Divider />
          <RegNav
            heading="Already have an account?"
            text="Sign In"
            onPress="Signin"
          />
        </View>
        <Modal visible={loading} animationType="fade" transparent={true}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              backgroundColor: colors.overlay,
            }}
          >
            <ActivityIndicator size={"large"} color={colors.primary} />
          </View>
        </Modal>
      </KeyboardAwareScrollView>
    </RegLayout>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: colors.white,
  },
  purpleText: {
    color: "#A3BDFC",
    textDecorationLine: "underline",
    margin: 3,
  },
  purpleTextContainer: {
    margin: 10,
  },
});

export default Signup;
