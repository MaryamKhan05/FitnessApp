import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Linking,
} from "react-native";

import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { auth, db } from "../FirebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { ActiveButton, Divider, ProfileCard } from "../components/INDEX";
import MainLyout from "../layouts/MainLayout";
import colors from "../../assets/colors/colors";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
const size = 25;
const color = "#B1B1B1";
const starSize = 40,
  starActiveColor = "#FFAA00",
  starInactiveColor = "#8C8C98";
const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [star1, setStar1] = useState(false);
  const [star2, setStar2] = useState(false);
  const [star3, setStar3] = useState(false);
  const [star4, setStar4] = useState(false);
  const [star5, setStar5] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [upgradeModal, setUpgradeModal] = useState(false);
  const [name, setName] = useState();
  const [userName, setUsername] = useState();

  useEffect(() => {
    getUsername();
  }, []);

  const getUsername = async () => {
    const userId = auth.currentUser.uid; // Replace with the actual UID
    console.log("auth.currentUser.uid", auth.currentUser.uid);
    // Fetch the user's data from Firestore
    const userDocRef = doc(db, "users", userId);

    try {
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const userName = userData.username; // Extract the username
        console.log("User's Name::::::", userName);
        setUsername(userName);
        // Now you have the user's name, and you can use it as needed on this screen.
      } else {
        console.log("User document does not exist.");
      }
    } catch (error) {
      console.error("Error getting user document:", error);
    }
  };

  // useEffect(() => {
  //   getNameHandler();
  // }, []);
  // const getNameHandler = async () => {
  //   try {
  //     let n = await AsyncStorage.getItem("Name");
  //     setName(n);
  //   } catch (e) {
  //     console.log("Error getting name from the storage", e);
  //   }
  // };
  const sendEmail = () => {
    const email = "myselfmaryamkhan@gmail.com";
    const subject = "Hello";
    const body = "This is the body of the email.";

    // Combine the email, subject, and body into a mailto URL
    const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;

    // Use Linking to open the email app
    Linking.openURL(mailtoUrl)
      .then(() => {
        console.log("Email app opened successfully");
      })
      .catch((error) => {
        console.error("Error opening email app: ", error);
      });
  };

  return (
    <MainLyout heading="My Profile">
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
          <Image
            source={require("../../assets/ferioLabs/Premium.png")}
            resizeMode="contain"
            style={{ height: 70, width: 70 }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontFamily: "PoppinsBold", }}>
          {userName}
        </Text>
      </View>
      <ProfileCard text="Personal Information" onPress="ProfileInfo">
        <FontAwesome
          name="user"
          size={size}
          color={color}
          style={styles.icon}
        />
      </ProfileCard>
      <ProfileCard text="Update Password" onPress="UpdatePassword">
        <Feather name="lock" size={size} color={color} style={styles.icon} />
      </ProfileCard>

      <TouchableOpacity
        style={{
          backgroundColor: colors.white,
          padding: 20,
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.09,
          shadowRadius: 4,
          elevation: 3,
          width: "90%",
          borderRadius: 10,
          margin: 5,
          paddingHorizontal: 15,
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => setUpgradeModal(true)}
      >
        <View style={{ width: "15%", alignItems: "center" }}>
          <FontAwesome
            name="diamond"
            size={20}
            color={color}
            style={styles.icon}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              width: "80%",
              fontFamily: "PoppinsRegular",
              fontSize: 14,
              color: "#4E2B4B",
              textAlign: "left",
              alignSelf: "center",
            }}
          >
            Update Premium
          </Text>
          <View style={{}}>
            <Entypo name="chevron-right" size={20} color="#B1B1B1" />
          </View>
        </View>
      </TouchableOpacity>
      <ProfileCard text="Update Equipment" onPress="Equiments">
        <MaterialCommunityIcons
          name="dumbbell"
          size={size}
          color={color}
          style={styles.icon}
          resizeMode="contain"
        />
      </ProfileCard>

      {/* <Divider backgroundColor="#B2B2B2" /> */}
      {/* <ProfileCard text="Terms of Services" onPress="Terms">
        <MaterialCommunityIcons
          name="shield-account-outline"
          size={size}
          color={color}
          style={styles.icon}
        />
      </ProfileCard>
      <ProfileCard text="Release of Liability" onPress="Release">
        <MaterialCommunityIcons
          name="shield-account-outline"
          size={size}
          color={color}
          style={styles.icon}
        />
      </ProfileCard> */}

      <TouchableOpacity
        style={{
          backgroundColor: colors.white,
          padding: 20,
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.09,
          shadowRadius: 4,
          elevation: 3,
          width: "90%",
          borderRadius: 10,
          margin: 5,
          paddingHorizontal: 15,
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => setModalVisible(true)}
      >
        <View style={{ width: "15%", alignItems: "center" }}>
          <AntDesign
            name="staro"
            size={size}
            color={color}
            style={styles.icon}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              width: "80%",
              fontFamily: "PoppinsRegular",
              fontSize: 14,
              color: "#4E2B4B",
              textAlign: "left",
              alignSelf: "center",
            }}
          >
            Rate Us
          </Text>
          <View style={{}}>
            <Entypo name="chevron-right" size={20} color="#B1B1B1" />
          </View>
        </View>
      </TouchableOpacity>

      <ProfileCard text="Logout" onPress="Login">
        <MaterialIcons
          name="logout"
          size={size}
          color={color}
          style={styles.icon}
        />
      </ProfileCard>

      {/* rate us modal */}
      <View style={{ alignItems: "center", flex: 1 }}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "flex-end",
              backgroundColor: "#00000099",
              flex: 1,
            }}
          >
            <View style={styles.modalView}>
              <Image
                source={require("../../assets/ferioLabs/Rateus.png")}
                style={{ height: "42%", width: "60%", alignSelf: "center" }}
                resizeMode="contain"
              />
              <Text style={styles.rateus}>Rate Us!</Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity onPress={() => setStar1(!star1)}>
                  {star1 ? (
                    <Entypo
                      name="star"
                      size={starSize}
                      color={starActiveColor}
                      style={styles.star}
                    />
                  ) : (
                    <Entypo
                      name="star"
                      size={starSize}
                      color={starInactiveColor}
                      style={styles.star}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStar2(!star2)}>
                  {star2 ? (
                    <Entypo
                      name="star"
                      size={starSize}
                      color={starActiveColor}
                      style={styles.star}
                    />
                  ) : (
                    <Entypo
                      name="star"
                      size={starSize}
                      color={starInactiveColor}
                      style={styles.star}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStar3(!star3)}>
                  {star3 ? (
                    <Entypo
                      name="star"
                      size={starSize}
                      color={starActiveColor}
                      style={styles.star}
                    />
                  ) : (
                    <Entypo
                      name="star"
                      size={starSize}
                      color={starInactiveColor}
                      style={styles.star}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStar4(!star4)}>
                  {star4 ? (
                    <Entypo
                      name="star"
                      size={starSize}
                      color={starActiveColor}
                      style={styles.star}
                    />
                  ) : (
                    <Entypo
                      name="star"
                      size={starSize}
                      color={starInactiveColor}
                      style={styles.star}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStar5(!star5)}>
                  {star5 ? (
                    <Entypo
                      name="star"
                      size={starSize}
                      color={starActiveColor}
                      style={styles.star}
                    />
                  ) : (
                    <Entypo
                      name="star"
                      size={starSize}
                      color={starInactiveColor}
                      style={styles.star}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <Text style={styles.text}>Tap a star to rate</Text>
              <View style={{ marginVertical: 10, marginTop: 20 }}>
                {star1 && star2 && star3 && star4 && star5 ? (
                  <TouchableOpacity>
                    <ActiveButton title="Rate Now" />
                  </TouchableOpacity>
                ) : (
                  <View>
                    <Text style={styles.feedback}>Feedback</Text>
                    <TextInput
                      value={feedback}
                      onChangeText={(text) => setFeedback(text)}
                      style={styles.input}
                      numberOfLines={20}
                      multiline={true}
                    />
                    <TouchableOpacity onPress={sendEmail}>
                      <ActiveButton title="Send" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.underlinedText}>Maybe Later</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      {/* upgrade modal */}
      <View style={{ alignItems: "center", flex: 1 }}>
        <Modal animationType="slide" transparent={true} visible={upgradeModal}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "flex-end",
              backgroundColor: "#00000099",
              flex: 1,
            }}
          >
            <View style={styles.modalView}>
              <Image
                source={require("../../assets/ferioLabs/Premium.png")}
                style={{
                  height: "44%",
                  width: "44%",
                  alignSelf: "center",
                  marginTop: 20,
                }}
                resizeMode="contain"
              />
              <Text style={styles.rateus}>Unlock More Features</Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginVertical: 20,
                }}
              >
                <Text
                  style={{
                    fontFamily: "PoppinsBold",
                    fontSize: 43,
                    color: "#E8A243",
                  }}
                >
                  $10
                </Text>
                <Text
                  style={{
                    fontFamily: "PoppinsRrgular",
                    fontSize: 14,
                    color: "#E8A243",
                  }}
                >
                  {" "}
                  Per Month
                </Text>
              </View>
              <TouchableOpacity>
                <ActiveButton title="Upgrade" width="70%" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setUpgradeModal(false)}>
                <Text style={styles.underlinedText}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </MainLyout>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 10,
  },
  card: {
    backgroundColor: colors.white,
    padding: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.09,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: "white",
    height: 725,
    width: 375,
    // alignItems: "center",
    alignSelf: "center",
    borderRadius: 24,
    width: "100%",
  },
  rateus: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
    color: "#020A1E",
    textAlign: "center",
  },
  text: {
    fontSize: 13,
    fontFamily: "PoppinsRegular",
    color: "#24253D80",
    textAlign: "center",
  },
  underlinedText: {
    textDecorationLine: "underline",
    color: "#2253D4",
    fontSize: 14,
    textAlign: "center",
  },
  star: {
    marginTop: 20,
    margin: 2,
    textAlign: "center",
  },
  feedback: {
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    textAlign: "left",
    marginLeft: 30,
    margin: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E6E7",
    width: 326,
    alignSelf: "center",
    paddingHorizontal: 10,
    fontFamily: "PoppinsRegular",
    borderRadius: 6,
    marginBottom: 10,
    padding: 10,
    height: 85,
  },
});

export default Profile;
