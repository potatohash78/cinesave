import React, { useContext, useState } from "react";
import { SettingsContext } from "../../SettingsProvider";
import { TheatersContext } from "../../TheatersProvider";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MyTheaters from "./MyTheaters";

export default function TheaterSelect({ visible, setVisible }) {
  const { settings } = useContext(SettingsContext);
  const { theaterNames, currTheater, setCurrTheater } =
    useContext(TheatersContext);
  const [openEdit, setOpenEdit] = useState(false);
  return visible ? (
    <View style={[styles.container, settings.darkMode && darkStyles.container]}>
      <MyTheaters
        visible={openEdit}
        setVisible={setOpenEdit}
        setParentVisible={setVisible}
      />
      <View style={[styles.header, settings.darkMode && darkStyles.header]}>
        <TouchableOpacity
          style={[styles.editBtn, settings.darkMode && darkStyles.editBtn]}
          onPress={() => setOpenEdit(true)}
        >
          <Text
            style={[styles.editText, settings.darkMode && darkStyles.editText]}
          >
            EDIT
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={[styles.body, settings.darkMode && darkStyles.body]}>
        {theaterNames.map((theater) => (
          <View
            key={theater}
            style={[
              styles.theaterContainer,
              settings.darkMode && darkStyles.theaterContainer,
            ]}
          >
            <Pressable
              onPress={() => {
                setCurrTheater(theater);
                setVisible(false);
              }}
            >
              <Text
                style={[
                  styles.theaterOption,
                  settings.darkMode && darkStyles.theaterOption,
                  theater === currTheater && { fontWeight: "bold" },
                ]}
              >{`${theater}`}</Text>
            </Pressable>
            {theater === currTheater && (
              <Ionicons
                name="checkmark-sharp"
                color={settings.darkMode ? "#D7B286" : "#C32528"}
                size={25}
              />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    opacity: 0.95,
    backgroundColor: "white",
    position: "absolute",
    alignSelf: "flex-end",
    zIndex: 99,
  },

  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    height: 80,
  },

  editBtn: {
    marginRight: 10,
    backgroundColor: "#C32528",
    borderRadius: 50,
    paddingHorizontal: 30,
    paddingVertical: 5,
  },

  editText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },

  body: {
    backgroundColor: "white",
  },

  theaterContainer: {
    paddingHorizontal: 25,
    alignItems: "center",
    height: 30,
    flexDirection: "row",
    marginBottom: 15,
  },

  theaterOption: {
    color: "#C32528",
    fontSize: 25,
    marginRight: 5,
    textTransform: "uppercase",
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },

  editBtn: {
    backgroundColor: "#D7B286",
  },

  body: {
    backgroundColor: "black",
  },

  theaterOption: {
    color: "#D7B286",
  },
});
