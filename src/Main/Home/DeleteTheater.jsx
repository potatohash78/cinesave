import React, { useContext } from "react";
import { Overlay } from "react-native-elements";
import { StyleSheet, View, Text, Pressable, SafeAreaView } from "react-native";
import { TheatersContext } from "../../TheatersProvider";
import { SettingsContext } from "../../SettingsProvider";

export default function DeleteTheater({
  visible,
  setVisible,
  setChanges,
  index,
}) {
  const { settings } = useContext(SettingsContext);
  const {
    theaters,
    setTheaters,
    currTheater,
    setCurrTheater,
    theaterNames,
    setTheaterNames,
  } = useContext(TheatersContext);
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
      <View
        style={[
          {
            backgroundColor: "#C32528",
            height: "40%",
            paddingTop: 30,
            alignItems: "center",
          },
        ]}
      >
        <Text
          style={[
            styles.confirmation,
            settings.darkMode && darkStyles.confirmation,
          ]}
        >
          Are you sure you want to delete
        </Text>
        <Text
          style={[
            styles.theaterName,
            settings.darkMode && darkStyles.theaterName,
          ]}
        >{`${theaterNames[index]}`}</Text>
        <Text
          style={[
            styles.confirmation,
            settings.darkMode && darkStyles.confirmation,
          ]}
        >
          from your Theaters?
        </Text>
        <View style={[styles.footer, settings.darkMode && darkStyles.footer]}>
          <Pressable
            style={[
              styles.cancelBtn,
              settings.darkMode && darkStyles.cancelBtn,
            ]}
            onPress={() => setVisible(false)}
          >
            <Text
              style={[styles.cancel, settings.darkMode && darkStyles.cancel]}
            >
              NO
            </Text>
          </Pressable>
          <Pressable
            style={[styles.okayBtn, settings.darkMode && darkStyles.okayBtn]}
            onPress={() => {
              if (theaterNames.length > 1) {
                setChanges(true);
                let newTheaterIds = [...theaters];
                newTheaterIds.splice(index, 1);
                setTheaters(newTheaterIds);
                const removedTheater = theaterNames[index];
                let newTheaters = [...theaterNames];
                newTheaters.splice(index, 1);
                setTheaterNames(newTheaters);
                if (removedTheater === currTheater) {
                  setCurrTheater(newTheaters[0]);
                }
              }
              setVisible(false);
            }}
          >
            <Text style={[styles.okay, settings.darkMode && darkStyles.okay]}>
              OK
            </Text>
          </Pressable>
        </View>
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    opacity: 0.95,
    paddingTop: "40%",
    paddingHorizontal: 0,
  },

  confirmation: {
    color: "white",
    fontSize: 16,
    marginBottom: 3,
    textAlign: "left",
    width: "70%",
  },

  theaterName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
    marginBottom: 3,
    textAlign: "left",
    width: "70%",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 60,
  },

  cancelBtn: {
    backgroundColor: "white",
    borderRadius: 50,
    alignItems: "center",
    paddingHorizontal: 65,
    paddingVertical: 10,
    marginRight: 10,
    opacity: 0.6,
  },

  cancel: {
    color: "#C32528",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },

  okayBtn: {
    backgroundColor: "white",
    borderRadius: 50,
    alignItems: "center",
    paddingHorizontal: 65,
    paddingVertical: 10,
    marginLeft: 10,
  },

  okay: {
    color: "#C32528",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },

  confirmation: {
    color: "#D7B286",
  },

  theaterName: {
    color: "#D7B286",
  },

  okayBtn: {
    backgroundColor: "#D7B286",
  },
});
