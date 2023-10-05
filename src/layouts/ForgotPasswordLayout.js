import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import ActiveButton from "../components/activeButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
const ForgotLayout = (props) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: "white",
        alignSelf: "center",
        alignItems: "center",
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        // flex: 1,
        // marginTop: "20%",
        width: "100%",
        padding:'20%'
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        //   height: "80%",
        }}
      >
        <Image
          source={props.source}
          style={{ height: 60, width: 60, marginBottom: 10 }}
          resizeMode="contain"
        />
        <Text
          style={{
            fontSize: 16,
            fontFamily: "PoppindsRegular",
            lineHeight: 25,
            margin: 10,
          }}
        >
          {props.heading}
        </Text>
        {props.text ? (
          <Text
            style={{
              fontSize: 10,
              fontFamily: "PoppinsRegular",
              lineHeight: 16,
              textAlign:'center',
              width:236
            }}
          >
            {props.text}
          </Text>
        ) : null}

        <View>
          {props.children}
        
        </View>
        
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginTop: 10,
          }}
          onPress={() => navigation.navigate("Signin")}
        >
            <Ionicons name="arrow-back" size={18} color="#1A347A" style={{marginRight:10}}/>
          <Text style={{ fontSize: 14, fontFamily: "PoppinsRegular" ,color:'#1A347A'}}>
            Back To Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ForgotLayout;
