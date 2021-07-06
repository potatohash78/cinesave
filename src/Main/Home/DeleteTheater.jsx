import React, { useContext } from "react";
import { Overlay } from "react-native-elements";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { TheatersContext } from "../../TheatersProvider";
import { SettingsContext } from "../../SettingsProvider";

export default function DeleteTheater({ visible, setVisible, theaterName }) {
  const { settings } = useContext(SettingsContext);
  const { theaters, setTheaters, currTheater, setCurrTheater } =
    useContext(TheatersContext);
  return (
    <Overlay
      isVisible={visible}
      fullScreen={true}
      overlayStyle={[
        styles.container,
        settings.darkMode && darkStyles.container,
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
      >{`${theaterName}`}</Text>
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
          style={[styles.cancelBtn, settings.darkMode && darkStyles.cancelBtn]}
          onPress={() => setVisible(false)}
        >
          <Text style={[styles.cancel, settings.darkMode && darkStyles.cancel]}>
            CANCEL
          </Text>
        </Pressable>
        <Pressable
          style={[styles.okayBtn, settings.darkMode && darkStyles.okayBtn]}
          onPress={() => {
            const newTheaters = theaters.filter(
              (theater) => theater !== theaterName
            );
            setTheaters(newTheaters);
            if (theaterName === currTheater) {
              setCurrTheater(newTheaters.length ? newTheaters[0] : "");
            }
            setVisible(false);
          }}
        >
          <Text style={[styles.okay, settings.darkMode && darkStyles.okay]}>
            OK
          </Text>
        </Pressable>
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    opacity: 0.95,
    paddingTop: "40%",
    paddingLeft: 30,
  },

  confirmation: {
    color: "#C32528",
    fontSize: 16,
    marginBottom: 10,
  },

  theaterName: {
    color: "#C32528",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
    marginBottom: 10,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },

  cancelBtn: {
    backgroundColor: "#E4E4E4",
    borderRadius: 50,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginRight: 20,
  },

  cancel: {
    color: "#BCBCBC",
    textAlign: "center",
    fontWeight: "bold",
  },

  okayBtn: {
    backgroundColor: "#C32528",
    borderRadius: 50,
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 5,
    marginLeft: 20,
  },

  okay: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

const darkStyles = StyleSheet.create({});
