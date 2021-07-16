import React, { useContext, useState, useEffect } from "react";
import { PurchaseContext } from "../../PurchaseProvider";
import { SettingsContext } from "../../SettingsProvider";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Overlay } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

export default function EditPurchase({ visible, setVisible }) {
  const { settings } = useContext(SettingsContext);
  const darkMode = settings.darkMode;
  const { purchases, setPurchases } = useContext(PurchaseContext);
  const [initialPurchases, setInitialPurchases] = useState([]);
  const [changes, setChanges] = useState(false);

  useEffect(() => {
    setInitialPurchases(purchases);
    setChanges(false);
  }, [visible]);

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
        <View style={[styles.header, settings.darkMode && darkStyles.header]}>
          <Pressable
            style={[styles.pressBtn]}
            onPress={() => {
              setVisible(false);
              setPurchases(initialPurchases);
            }}
          >
            <Text
              style={[styles.backBtn, settings.darkMode && darkStyles.backBtn]}
            >
              CANCEL
            </Text>
          </Pressable>
          <Text style={[styles.title, settings.darkMode && darkStyles.title]}>
            PURCHASES
          </Text>
          <Pressable
            style={styles.pressBtn}
            onPress={() => {
              if (changes) {
                setVisible(false);
              }
            }}
          >
            <Text
              style={[
                styles.saveBtn,
                darkMode && darkStyles.saveBtn,
                changes && { color: "#C32528" },
              ]}
            >
              SAVE
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
                style={[styles.appealBtn, darkMode && darkStyles.appealBtn]}
              >
                <Text
                  style={[styles.appealText, darkMode && darkStyles.appealText]}
                >
                  APPEAL
                </Text>
              </TouchableOpacity>
              <Pressable
                style={[styles.trash]}
                onPress={() => {
                  const newPurchases = [...purchases];
                  newPurchases.splice(i, 1);
                  setPurchases(newPurchases);
                  setChanges(true);
                }}
              >
                <Ionicons name="trash-outline" color="#C32528" size={35} />
              </Pressable>
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

  saveBtn: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#BCBCBC",
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

  appealBtn: {
    backgroundColor: "#C32528",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 5,
    position: "absolute",
    left: 220,
    top: 60,
    opacity: 0.6,
  },

  appealText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },

  trash: {
    position: "absolute",
    left: 340,
    top: 30,
  },
});

const darkStyles = StyleSheet.create({});
