import React, { useContext, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Overlay } from "react-native-elements";
import { SettingsContext } from "../../SettingsProvider";
import { PurchaseContext } from "../../PurchaseProvider";
import EditPurchase from "./EditPurchase";

export default function Purchase({ visible, setVisible }) {
  const { settings } = useContext(SettingsContext);
  const darkMode = settings.darkMode;
  const [openEdit, setOpenEdit] = useState(false);
  const { purchases } = useContext(PurchaseContext);
  return (
    <Overlay
      isVisible={visible}
      fullScreen={true}
      overlayStyle={[styles.container, darkMode && darkStyles.container]}
    >
      <SafeAreaView
        style={{ flex: 0, backgroundColor: darkMode ? "black" : "white" }}
      />
      <ScrollView>
        <EditPurchase visible={openEdit} setVisible={setOpenEdit} />
        <View style={[styles.header, settings.darkMode && darkStyles.header]}>
          <Pressable
            style={[styles.pressBtn]}
            onPress={() => {
              setVisible(false);
            }}
          >
            <Text
              style={[styles.backBtn, settings.darkMode && darkStyles.backBtn]}
            >
              CLOSE
            </Text>
          </Pressable>
          <Text style={[styles.title, settings.darkMode && darkStyles.title]}>
            PURCHASES
          </Text>
          <Pressable
            style={styles.pressBtn}
            onPress={() => {
              setOpenEdit(true);
            }}
          >
            <Text style={[styles.editBtn, darkMode && darkStyles.editBtn]}>
              EDIT
            </Text>
          </Pressable>
        </View>
        <View style={[styles.body, darkMode && darkStyles.body]}>
          {purchases.map((purchase, i) => (
            <View
              key={i}
              style={[
                styles.purchaseContainer,
                darkMode && darkStyles.purchaseContainer,
              ]}
            >
              <Text
                style={[
                  styles.movieData,
                  darkMode && darkStyles.movieData,
                  { textTransform: "uppercase" },
                ]}
              >{`${purchase.title}`}</Text>
              <Text
                style={[styles.movieData, darkMode && darkStyles.movieData]}
              >{`${purchase.date}`}</Text>
              <Text
                style={[styles.movieData, darkMode && darkStyles.movieData]}
              >
                {`${purchase.seatNumber}`} | ${`${purchase.price.toFixed(2)}`}
              </Text>
              <TouchableOpacity
                style={[styles.rateBtn, darkMode && darkStyles.rateBtn]}
              >
                <Text
                  style={[styles.rateText, darkMode && darkStyles.rateText]}
                >
                  RATE
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0EAEA",
    padding: 0,
  },

  header: {
    height: 70,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "white",
    paddingBottom: 10,
  },

  pressBtn: {
    width: "25%",
  },

  backBtn: {
    fontWeight: "bold",
    color: "#C32528",
    fontSize: 15,
    width: "100%",
    paddingBottom: 2,
    paddingLeft: 10,
  },

  title: {
    fontWeight: "bold",
    fontSize: 23,
    color: "#C32528",
    width: "50%",
    textAlign: "center",
  },

  editBtn: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#C32528",
    textAlign: "right",
    paddingBottom: 2,
    paddingRight: 10,
  },

  purchaseContainer: {
    backgroundColor: "white",
    width: "100%",
    padding: 15,
    marginTop: 3,
    paddingBottom: 10,
  },

  movieData: {
    color: "#C32528",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },

  rateBtn: {
    backgroundColor: "#C32528",
    borderRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 5,
    position: "absolute",
    left: 290,
    top: 60,
  },

  rateText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});

const darkStyles = StyleSheet.create({});
