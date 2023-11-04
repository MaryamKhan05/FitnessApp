import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import colors from "../../assets/colors/colors";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [play, setPlay] = useState(true);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <CountdownCircleTimer
        isPlaying={play}
        duration={60}
        colors={[colors.primary, "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[7, 5, 2, 0]}
        size={50}
        strokeWidth={0}
        stroke={false}
        onComplete={console.log("completed")}
      >
        {({ remainingTime }) => (
          <Text style={{ color: "red", fontSize: 20, fontWeight: "900" }}>
            {remainingTime}
          </Text>
        )}
      </CountdownCircleTimer>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Timer;
