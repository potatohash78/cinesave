import React, { useContext } from "react";
import {
  StyleSheet,
  Platform,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { UserContext } from "../../UserProvider";
import { SettingsContext } from "../../SettingsProvider";

export default function ImageSelector({ setChanges, setImage }) {
  const { settings } = useContext(SettingsContext);
  const darkMode = settings.darkMode;

  async function checkPermissions() {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setChanges(true);
    }
  };

  return (
    <TouchableOpacity
      onPress={async () => {
        await checkPermissions();
        pickImage();
      }}
      style={[styles.replaceBtn, darkMode && darkStyles.replaceBtn]}
    >
      <Text style={[styles.replaceText, darkMode && darkStyles.replaceText]}>
        REPLACE
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  replaceBtn: {
    backgroundColor: "#C32528",
    borderRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 5,
    alignItems: "center",
  },

  replaceText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});

const darkStyles = StyleSheet.create({});
