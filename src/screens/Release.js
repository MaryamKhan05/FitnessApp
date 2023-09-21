import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "../components/INDEX";
import Styles from "./Styles";
import MainLyout from "../layouts/MainLayout";

const Release = () => {
  return (

    <MainLyout heading="Terms of Services">
      <View style={{ marginTop: 10 }}>
        <Card>
          <Text style={[Styles.blackText, { marginVertical: 5 }]}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam
          </Text>
          <Text style={[Styles.blackText, { marginVertical: 5 }]}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et
          </Text>
          <Text style={[Styles.blackText, { marginVertical: 5 }]}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore
          </Text>
        </Card>
      </View>
    </MainLyout>
  );
};

const styles = StyleSheet.create({});

export default Release;
