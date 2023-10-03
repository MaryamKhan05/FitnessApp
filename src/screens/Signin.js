import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  Modal,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FirebaseConfig";

const Signin = () => {
  const size = 20;
  const color = "#B2B6B7";
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [conEye, setconEye] = useState(true);
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setLoading(true);
      saveTokenHandler();
      setLoading(false);
    }
  }, [token]);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("TabNav");
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const saveTokenHandler = async () => {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (e) {
      console.log("error saving token after login", e);
    }
    setLoading(false);
  };
  const handleSignIn = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setToken(userCredential._tokenResponse.idToken);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        const errorMessage = error.message;
        alert(errorMessage);
      });
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
        <View style={{ marginTop: hp(10) }}>
          <Text style={Styles.regTopText}>Signin</Text>
          <TextInput
            placeholder="Email"
            style={[Styles.input, { padding: 10 }]}
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
          />
          <View style={Styles.input}>
            <TextInput
              style={Styles.authInput}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={conEye}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setconEye(!conEye)}>
              {conEye == true ? (
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
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text
              style={[Styles.text, { textAlign: "right", marginRight: 15 }]}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.buttonTop}>
          <TouchableOpacity onPress={handleSignIn}>
            <ActiveButton title="Sign In" />
          </TouchableOpacity>
          <Divider />
          <RegNav
            heading="Don't have an account?"
            text="Sign Up"
            onPress="Signup"
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
});

export default Signin;
