import { StyleSheet } from "react-native";
import colors from "../../assets/colors/colors";
export default styles = StyleSheet.create({
  input: {
    backgroundColor: colors.white,
    alignSelf: "center",
    width: 343,
    height: 52,
    borderRadius: 8,
    padding: 10,
    margin: 7,
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center'
  },
  text: {
    fontSize: 14,
    color: colors.white,
    fontFamily: "PoppinsMedium",
  },
  blackText: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
  },
  blueText: {
    fontSize: 12,
    color: colors.primary,
    fontFamily: "PoppinsBold",
  },
  regTopText: {
    color: colors.white,
    alignSelf: "center",
    fontFamily: "PoppinsRegular",
    fontSize: 18,
    margin: 10,
  },
  buttonTop: {
    marginTop: "15%",
  },
  homeImage: {
    height: 80,
    width: 100,
  },
  homeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  homeText: {
    fontSize: 18,
    fontFamily: "PoppinsMedium",
  },
  forgotInput: {
    borderColor: "#E5E6E7",
    borderWidth: 1,
    borderRadius: 6,
    width: 326,
    padding: 10,
    fontFamily: "PoppinsRegular",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    backgroundColor: "white",
  },
  eyeIcon:{
    marginRight:5
  },
  profileInput:{
    borderColor: "#E5E6E7",
    borderWidth: 1,
    borderRadius: 6,
    width: 173,
    padding: 10,
    color:'#666666'
  }
});
