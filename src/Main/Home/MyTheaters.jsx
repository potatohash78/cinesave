import React, { useContext, useState, useEffect } from "react";
import { Overlay } from "react-native-elements";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { SettingsContext } from "../../SettingsProvider";
import { TheatersContext } from "../../TheatersProvider";
import { Ionicons } from "@expo/vector-icons";
import DeleteTheater from "./DeleteTheater";
import AddTheater from "./AddTheater";

export default function MyTheaters({ visible, setVisible, setParentVisible }) {
  const { settings } = useContext(SettingsContext);
  const { theaterNames, setTheaters } = useContext(TheatersContext);
  const [remove, setRemove] = useState(false);
  const [removedTheater, setRemovedTheater] = useState("");
  const [addTheater, setAddTheater] = useState(false);
  const [changes, setChanges] = useState(false);
  const [initialTheaters, setInitialTheaters] = useState([]);

  useEffect(() => {
    setInitialTheaters(theaterNames);
  }, [visible]);
  return (
    <Overlay
      isVisible={visible}
      fullScreen={true}
      overlayStyle={[
        styles.container,
        settings.darkMode && darkStyles.container,
      ]}
    >
      <SafeAreaView
        style={{
          flex: 0,
          backgroundColor: settings.darkMode ? "black" : "white",
        }}
      />
      <DeleteTheater
        visible={remove}
        setVisible={setRemove}
        theaterName={removedTheater}
        setChanges={setChanges}
      />
      <AddTheater
        visible={addTheater}
        setVisible={setAddTheater}
        setChanges={setChanges}
      />
      <View style={[styles.header, settings.darkMode && darkStyles.header]}>
        <Pressable
          style={[styles.pressBtn]}
          onPress={() => {
            setVisible(false);
            setParentVisible(false);
            setTheaters(initialTheaters);
          }}
        >
          <Text
            style={[styles.backBtn, settings.darkMode && darkStyles.backBtn]}
          >
            BACK
          </Text>
        </Pressable>
        <Text style={[styles.title, settings.darkMode && darkStyles.title]}>
          THEATERS
        </Text>
        <Pressable
          style={styles.pressBtn}
          onPress={() => {
            if (changes) {
              setVisible(false);
              setParentVisible(false);
            }
          }}
        >
          <Text
            style={[
              styles.saveBtn,
              changes && styles.saveOn,
              settings.darkMode && changes && darkStyles.saveOn,
            ]}
          >
            SAVE
          </Text>
        </Pressable>
      </View>
      <ScrollView alwaysBounceVertical={false}>
        {theaterNames.map((theater) => (
          <View
            key={theater}
            style={[
              styles.theaterContainer,
              settings.darkMode && darkStyles.theaterContainer,
            ]}
          >
            <Text
              style={[styles.theater, settings.darkMode && darkStyles.theater]}
            >
              {`${theater}`}
            </Text>
            <Pressable>
              <Ionicons
                name="location-outline"
                color={settings.darkMode ? "#D7B286" : "#C32528"}
                size={27}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                setRemovedTheater(theater);
                setRemove(true);
              }}
            >
              <Ionicons
                name="trash-outline"
                color={settings.darkMode ? "#D7B286" : "#C32528"}
                size={27}
              />
            </Pressable>
          </View>
        ))}
        <TouchableOpacity
          style={[
            styles.addContainer,
            settings.darkMode && darkStyles.addContainer,
          ]}
          onPress={() => setAddTheater(true)}
        >
          <Text
            style={[
              styles.addTheater,
              settings.darkMode && darkStyles.addTheater,
            ]}
          >
            ADD THEATER
          </Text>
        </TouchableOpacity>
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

  theaterContainer: {
    height: 45,
    paddingHorizontal: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 4,
  },

  theater: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#C32528",
    textTransform: "uppercase",
    width: "80%",
  },

  addContainer: {
    backgroundColor: "#C32528",
    borderRadius: 50,
    width: "50%",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 5,
  },

  addTheater: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },

  saveOn: {
    color: "#C32528",
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: "#1C1A19",
  },

  header: {
    backgroundColor: "black",
  },

  backBtn: {
    color: "#D7B286",
  },

  title: {
    color: "#D7B286",
  },

  theaterContainer: {
    backgroundColor: "black",
  },

  theater: {
    color: "#D7B286",
  },

  addContainer: {
    backgroundColor: "#D7B286",
  },

  saveOn: {
    color: "#D7B286",
  },
});
