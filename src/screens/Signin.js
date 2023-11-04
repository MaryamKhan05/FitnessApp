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
  const [userId, setUserId] = useState();

  useEffect(() => {
    if (token) {
      console.log(token,'llllll')
      saveTokenHandler();
    }
  }, [token]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // navigation.navigate("TabNav");
      }
    });
    return unsubscribe;
  }, []);

  const saveTokenHandler = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);
      console.log("saved token");
    } catch (e) {
      console.log("error saving token after login", e);
    }
  };

  const handleSignIn = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      alert("Please enter valid email and password");
      return;
    }

    signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword)
      .then((userCredential) => {
        // setToken(userCredential._tokenResponse.idToken);
        // console.log("userCredential._tokenResponse", userCredential._tokenResponse.idToken);
        saveTokenHandler(userCredential._tokenResponse.idToken)
        // saveUserIdHandler(userCredential.user.uid)
        setLoading(false);
        navigation.navigate("TabNav");
      })
      .catch((error) => {
        console.log("error", error);
        const errorMessage = error.message;
        alert(errorMessage);
        setLoading(false);
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
          <Text style={Styles.regTopText}>Sign In</Text>
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
          <TouchableOpacity onPress={() => [handleSignIn(), setLoading(true)]}>
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

// userCredential._tokenResponse UserCredentialImpl {
//   "_tokenResponse": Object {
//     "displayName": "",
//     "email": "test6@gmail.com",
//     "expiresIn": "3600",
//     "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjlhNTE5MDc0NmU5M2JhZTI0OWIyYWE3YzJhYTRlMzA2M2UzNDFlYzciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vd29ya291dGZsb3ctZTQ0OGIiLCJhdWQiOiJ3b3Jrb3V0Zmxvdy1lNDQ4YiIsImF1dGhfdGltZSI6MTY5NjUwNDAyNSwidXNlcl9pZCI6ImJsUExYUGRoUGNRRnJLZnB4aFBwbXBlSzJpajEiLCJzdWIiOiJibFBMWFBkaFBjUUZyS2ZweGhQcG1wZUsyaWoxIiwiaWF0IjoxNjk2NTA0MDI1LCJleHAiOjE2OTY1MDc2MjUsImVtYWlsIjoidGVzdDZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3Q2QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.kwchwMu1yuoXFofJH6_oAzAkRWBqTujU9s0uvCsLNymoTYFSWQIOtNqYvMMRk_Iu64KIVOeTh6wBPxmCJBZ2QlNOSyd9jyrnWShBJTte73VAuk0UfvmDtOAaQbtcvD25xWlrvZgw3meaBrxY36Pd5A2EFMtGIQfHqI_Cpnx45DcQNXgeoiu91O4SxEJ7YqrA88-onZUrQAmbWASpL4Az4n4I6tG-RAQb8yO6NysqGTpUjKfiQu4g1K0ucKsTJqeInq6DGG83jcGwQ1UZM2cuSjSmQyxZM1oK0p4H8RN6y8Itd7k4-Xu_hSAEllVM_XfRYmA5Ou0wlni_n2M2cZEb3g",
//     "kind": "identitytoolkit#VerifyPasswordResponse",
//     "localId": "blPLXPdhPcQFrKfpxhPpmpeK2ij1",
//     "refreshToken": "AMf-vBwsE4hL7cGcmNJjsekor5Hz1aySmXDMECFFPjtk9QW7ltT-GVqg0tIed-RSHT49vr72ExqhJIIs1JusUOxeQLjDzPM7BerOq6hhksRYyj3m6d_JvJsnif-SoB4DmtB4Xr9TLgBocD7JcdDpK0T1GS3AT--Xf7JrjhbdKXSaMWyU0G7DzUJbS3CSSnKMz_MTjnJDHaJlpmO9t7KHj2ZXHAsVLHGW0g",
//     "registered": true,
//   },
//   "operationType": "signIn",
//   "providerId": null,
//   "user": Object {
//     "_redirectEventId": undefined,
//     "apiKey": "AIzaSyBpNH7x9OcRZgfsn_jvM3frYGQPXrI3IJA",
//     "appName": "[DEFAULT]",
//     "createdAt": "1696502794713",
//     "displayName": undefined,
//     "email": "test6@gmail.com",
//     "emailVerified": false,
//     "isAnonymous": false,
//     "lastLoginAt": "1696503965509",
//     "phoneNumber": undefined,
//     "photoURL": undefined,
//     "providerData": Array [
//       Object {
//         "displayName": null,
//         "email": "test6@gmail.com",
//         "phoneNumber": null,
//         "photoURL": null,
//         "providerId": "password",
//         "uid": "test6@gmail.com",
//       },
//     ],
//     "stsTokenManager": Object {
//       "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjlhNTE5MDc0NmU5M2JhZTI0OWIyYWE3YzJhYTRlMzA2M2UzNDFlYzciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vd29ya291dGZsb3ctZTQ0OGIiLCJhdWQiOiJ3b3Jrb3V0Zmxvdy1lNDQ4YiIsImF1dGhfdGltZSI6MTY5NjUwNDAyNSwidXNlcl9pZCI6ImJsUExYUGRoUGNRRnJLZnB4aFBwbXBlSzJpajEiLCJzdWIiOiJibFBMWFBkaFBjUUZyS2ZweGhQcG1wZUsyaWoxIiwiaWF0IjoxNjk2NTA0MDI1LCJleHAiOjE2OTY1MDc2MjUsImVtYWlsIjoidGVzdDZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3Q2QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.kwchwMu1yuoXFofJH6_oAzAkRWBqTujU9s0uvCsLNymoTYFSWQIOtNqYvMMRk_Iu64KIVOeTh6wBPxmCJBZ2QlNOSyd9jyrnWShBJTte73VAuk0UfvmDtOAaQbtcvD25xWlrvZgw3meaBrxY36Pd5A2EFMtGIQfHqI_Cpnx45DcQNXgeoiu91O4SxEJ7YqrA88-onZUrQAmbWASpL4Az4n4I6tG-RAQb8yO6NysqGTpUjKfiQu4g1K0ucKsTJqeInq6DGG83jcGwQ1UZM2cuSjSmQyxZM1oK0p4H8RN6y8Itd7k4-Xu_hSAEllVM_XfRYmA5Ou0wlni_n2M2cZEb3g",
//       "expirationTime": 1696507625045,
//       "refreshToken": "AMf-vBwsE4hL7cGcmNJjsekor5Hz1aySmXDMECFFPjtk9QW7ltT-GVqg0tIed-RSHT49vr72ExqhJIIs1JusUOxeQLjDzPM7BerOq6hhksRYyj3m6d_JvJsnif-SoB4DmtB4Xr9TLgBocD7JcdDpK0T1GS3AT--Xf7JrjhbdKXSaMWyU0G7DzUJbS3CSSnKMz_MTjnJDHaJlpmO9t7KHj2ZXHAsVLHGW0g",
//     },
//     "tenantId": undefined,
//     "uid": "blPLXPdhPcQFrKfpxhPpmpeK2ij1",
//   },
// }
