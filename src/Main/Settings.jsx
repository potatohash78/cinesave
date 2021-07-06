import React, { useContext } from "react";

import { StyleSheet, Text, Pressable, View, Switch } from "react-native";
import { Overlay } from "react-native-elements";

import { SettingsContext } from "../SettingsProvider";

export default function Settings({ visible, setVisible }) {
  const { settings, setSettings } = useContext(SettingsContext);

  return (
    <Overlay
      isVisible={visible}
      fullScreen={true}
      overlayStyle={[
        styles.container,
        settings.darkMode && darkStyles.container,
      ]}
    >
      <View style={[styles.header, settings.darkMode && darkStyles.header]}>
        <Pressable style={[styles.pressBtn]} onPress={() => setVisible(false)}>
          <Text
            style={[styles.backBtn, settings.darkMode && darkStyles.backBtn]}
          >
            CANCEL
          </Text>
        </Pressable>
        <Text style={[styles.title, settings.darkMode && darkStyles.title]}>
          SETTINGS
        </Text>
        <Pressable style={styles.pressBtn}>
          <Text style={styles.saveBtn}>SAVE</Text>
        </Pressable>
      </View>
      <View
        style={[
          styles.optionContainer,
          settings.darkMode && darkStyles.optionContainer,
        ]}
      >
        <Text style={[styles.option, settings.darkMode && darkStyles.option]}>
          Dark mode
        </Text>
        <Switch
          onValueChange={() => {
            setSettings({ ...settings, ["darkMode"]: !settings.darkMode });
          }}
          value={settings.darkMode}
        />
      </View>
      <View
        style={[
          styles.optionContainer,
          settings.darkMode && darkStyles.optionContainer,
        ]}
      >
        <Text style={[styles.option, settings.darkMode && darkStyles.option]}>
          Notifications
        </Text>
        <Switch
          onValueChange={() => {
            setSettings({
              ...settings,
              ["notifications"]: !settings.notifications,
            });
          }}
          value={settings.notifications}
        />
      </View>
      <View
        style={[
          styles.optionContainer,
          settings.darkMode && darkStyles.optionContainer,
        ]}
      >
        <Text style={[styles.option, settings.darkMode && darkStyles.option]}>
          Location
        </Text>
        <Switch
          onValueChange={() => {
            setSettings({ ...settings, ["location"]: !settings.location });
          }}
          value={settings.location}
        />
      </View>
      <Pressable style={[styles.optionPress, { marginTop: 45 }]}>
        <View
          style={[
            styles.optionContainer,
            settings.darkMode && darkStyles.optionContainer,
          ]}
        >
          <Text style={[styles.option, settings.darkMode && darkStyles.option]}>
            Change payment method
          </Text>
        </View>
      </Pressable>
      <Pressable style={[styles.optionPress]}>
        <View
          style={[
            styles.optionContainer,
            settings.darkMode && darkStyles.optionContainer,
          ]}
        >
          <Text style={[styles.option, settings.darkMode && darkStyles.option]}>
            Change username
          </Text>
        </View>
      </Pressable>
      <Pressable style={[styles.optionPress]}>
        <View
          style={[
            styles.optionContainer,
            settings.darkMode && darkStyles.optionContainer,
          ]}
        >
          <Text style={[styles.option, settings.darkMode && darkStyles.option]}>
            Change password
          </Text>
        </View>
      </Pressable>
      <Pressable style={[styles.optionPress, { marginTop: 45 }]}>
        <View
          style={[
            styles.optionContainer,
            settings.darkMode && darkStyles.optionContainer,
          ]}
        >
          <Text style={[styles.option, settings.darkMode && darkStyles.option]}>
            Log out
          </Text>
        </View>
      </Pressable>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0EAEA",
    padding: 0,
  },

  header: {
    height: 60,
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
    fontSize: 18,
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
    fontSize: 18,
    color: "#BCBCBC",
    textAlign: "right",
    paddingBottom: 2,
    paddingRight: 10,
  },

  optionContainer: {
    height: 45,
    paddingHorizontal: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 4,
  },

  option: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#C32528",
  },

  optionPress: {
    width: "100%",
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

  optionContainer: {
    backgroundColor: "black",
  },

  option: {
    color: "#D7B286",
  },
});