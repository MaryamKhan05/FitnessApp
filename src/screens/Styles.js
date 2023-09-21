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
    height: 60,
    width: 60,
  },
  homeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  homeText:{
    fontSize:16,
    fontFamily:'PoppinsMedium',
  },
  forgotInput:{
    borderColor:"#E5E6E7",
    borderWidth:1,
    borderRadius:6,
    width:326,
    // height:35,
    padding:10,
    fontFamily:'PoppinsRegular'
  }
});
