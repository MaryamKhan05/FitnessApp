import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import MainLyout from "../layouts/MainLayout";
import colors from "../../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import Styles from "./Styles";
import ActiveButton from "../components/activeButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateEmailFunction, updatePassword } from "../firebase/firebase";
import { auth, db } from "../FirebaseConfig";
import { getDoc, doc } from "firebase/firestore";
const EditProfile = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [newName, setNewName] = useState();
  const [newEmail, setNewEmail] = useState();

  const [userName, setUsername] = useState();

  const getUsername = async () => {
    // const userId = auth.currentUser.uid; // Replace with the actual UID
    // Fetch the user's data from Firestore
    const id = await AsyncStorage.getItem("userId");
    console.log("iddddd", id);
    const userDocRef = doc(db, "users", id);

    try {
      console.log("User's Name:::");
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const userName = userData.username; // Extract the username
        console.log("User's Name:::", userName);
        setUsername(userName);
        // Now you have the user's name, and you can use it as needed on this screen.
      } else {
        console.log("User document does not exist.");
      }
    } catch (error) {
      console.error("Error getting user document:", error);
    }
  };
  useEffect(() => {
    getNameHandler();
    getMailHandler();
    getUsername();
  }, []);
  const getNameHandler = async () => {
    try {
      let n = await AsyncStorage.getItem("Name");
      setName(n);
    } catch (e) {
      console.log("Error getting name from the storage", e);
    }
  };

  const getMailHandler = async () => {
    try {
      let n = await AsyncStorage.getItem("Email");
      setEmail(n);
    } catch (e) {
      console.log("Error getting email from the storage", e);
    }
  };
  const saveNewInfoHandler = async () => {
    try {
      await AsyncStorage.setItem("Name", newName);
      console.log("new name saved");
    } catch (e) {
      console.log("Error saving new name ", e);
    }
  };

  return (
    <MainLyout heading="Personal Information">
      <View style={styles.card}>
        <TouchableOpacity
          style={{
            height: 70,
            width: 70,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "grey",
            borderRadius: 50,
            marginBottom: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <ImageBackground
            source={require("../../assets/ferioLabs/Premium.png")}
            resizeMode="contain"
            style={{
              height: 70,
              width: 70,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather name="camera" size={30} color={"white"} />
          </ImageBackground>
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontFamily: "PoppinsBold" }}>
          {userName}
        </Text>
        <View style={styles.divider} />
        <View
          style={{
            flexDirection: "row",
            width: "90%",
            justifyContent: "space-between",
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>Username:</Text>
          <TextInput
            style={Styles.profileInput}
            placeholder={userName}
            placeholderTextColor={"#666666"}
            onChangeText={(text) => setNewName(text)}
            autoCapitalize="none"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "90%",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={styles.text}>Email:</Text>
          <TextInput
            style={Styles.profileInput}
            placeholder={auth.currentUser.email}
            placeholderTextColor={"#666666"}
            onChangeText={(text) => setNewEmail(text)}
            autoCapitalize="none"
            editable={false}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity onPress={saveNewInfoHandler}>
            <ActiveButton title="Save" width={wp(80)} />
          </TouchableOpacity>
        </View>
      </View>
    </MainLyout>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    paddingVertical: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    borderRadius: 10,
    margin: 10,
    // paddingHorizontal: 15,
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
  },
  details: {
    width: "60%",
    // color: "#00000029",
    color: "#666666",
  },
  divider: {
    backgroundColor: "#00000029",
    width: "100%",
    marginBottom: 12,
    padding: 0.1,
    marginTop: 22,
  },
});

export default EditProfile;
