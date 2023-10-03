import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import MainLyout from "../layouts/MainLayout";
import { equipments } from "../equipments";
import ActiveButton from "../components/activeButton";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import colors from "../../assets/colors/colors";
const Equiments = () => {
  const navigation = useNavigation();
  const [equipmentArray, setEquipmentArray] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [loading, setLoading] = useState(false);

  const saveToAsyncHandler = async () => {
    setLoading(true);
    try {
      await AsyncStorage.setItem("eFlag", "true");
      console.log("saved flag to storage");
    } catch (e) {
      console.log("error saving equipment flag to storage", e);
    }
    try {
      await AsyncStorage.setItem("Equipments", JSON.stringify(equipmentArray));
      navigation.navigate("TabNav");
    } catch (e) {
      console.log("error saving equipments to storage");
    }

    setLoading(false);
  };
  const handleClick = (name, id) => {
    if (selectedItem.includes(id)) {
      setSelectedItem(selectedItem.filter((item) => item !== id));
      setEquipmentArray(equipmentArray.filter((item) => item !== name));
    } else {
      setEquipmentArray((current) => [...current, name]);
      setSelectedItem((current) => [...current, id]);
    }
  };
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          handleClick(item.name, item.id);
        }}
      >
        {selectedItem.includes(item.id) ? (
          <View style={styles.iconContainer}>
            <AntDesign
              name="checkcircleo"
              size={23}
              color={"green"}
              style={styles.icon}
            />
          </View>
        ) : null}

        <Image
          source={item.image}
          resizeMode="contain"
          style={{ height: 60, width: 80, margin: 10 }}
        />
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <MainLyout heading="Equipment">
      <View style={{ alignItems: "center", flex: 1 }}>
        <FlatList
          data={equipments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
        <TouchableOpacity onPress={saveToAsyncHandler}>
          <ActiveButton title="Done" onPress="" />
        </TouchableOpacity>
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
    </MainLyout>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 10,
    alignItems: "center",
    width: "43%",
    height: 145,
    margin: 10,
    justifyContent: "center",
    shadowColor: "#E4E5E6",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "white",
    alignSelf: "center",
  },
  iconContainer: {
    shadowColor: "#B2B2B2",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    position: "absolute",
    alignSelf: "flex-end",
    top: -7,
    right: -7,
    backgroundColor: "white",
    borderRadius: 50,
  },
  title: {
    fontSize: 12,
    fontFamily: "PoppinsRegular",
  },
  icon: {},
});

export default Equiments;
