import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
const MainLyout = (props) => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ImageBackground
        source={require("../../assets/ferioLabs/header.png")}
        style={{
          height: 140,
          width:wp(100) ,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
        resizeMode="stretch"
      >
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            marginTop: "10%",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color="white" />
          </TouchableOpacity>
          <View style={{ width: "90%", alignItems: "center" }}>
            <Text style={styles.heading}>{props.heading}</Text>
          </View>
        </View>
      </ImageBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{ backgroundColor: "white", flex: 1, alignItems: "center",marginTop:10 }}
        >
          {props.children}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "black",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 20,
    height: "10%",
    width: "100%",
    alignSelf: "center",
  },
  heading: {
    fontSize: 15,
    fontFamily: "PoppinsMedium",
    color: "white",
    // marginHorizontal: "25%",
    // width: "100%",
    textAlign: "center",
  },
});

export default MainLyout;
