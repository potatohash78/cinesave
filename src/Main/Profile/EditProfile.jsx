import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Pressable,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { firestore } from "../../../firebase";
import { Overlay } from "react-native-elements";
import { SettingsContext } from "../../SettingsProvider";
import { UserContext } from "../../UserProvider";
import ImageSelector from "./ImageSelector";

const defaultProfile = require("../../../assets/default-profile.png");

export default function EditProfile({
  visible,
  setVisible,
  update,
  profilePic,
}) {
  const { settings } = useContext(SettingsContext);
  const darkMode = settings.darkMode;
  const { user, setUser } = useContext(UserContext);
  const [changes, setChanges] = useState(false);
  const [image, setImage] = useState(profilePic);
  const [newBirthDate, setNewBirthDate] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    setChanges(false);
    setImage(profilePic);
    setNewEmail("");
    setNewBirthDate("");
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
            }}
          >
            <Text
              style={[styles.backBtn, settings.darkMode && darkStyles.backBtn]}
            >
              CANCEL
            </Text>
          </Pressable>
          <Text style={[styles.title, settings.darkMode && darkStyles.title]}>
            EDIT PROFILE
          </Text>
          <Pressable
            style={styles.pressBtn}
            onPress={async () => {
              if (changes) {
                await update(image);
                if (newBirthDate) {
                  const newInfo = { ...user, ["birthDate"]: newBirthDate };
                  setUser(newInfo);
                  await firestore.collection("users").doc(user.id).update({
                    birthDate: newBirthDate,
                  });
                }
                if (newEmail) {
                  const newInfo = { ...user, ["email"]: newEmail };
                  setUser(newInfo);
                  await firestore.collection("users").doc(user.id).update({
                    email: newEmail,
                  });
                }
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
        <View
          style={{
            backgroundColor: darkMode ? "black" : "white",
            marginTop: 3,
          }}
        >
          <Text style={[styles.picHeader, darkMode && darkStyles.picHeader]}>
            Profile picture
          </Text>
          <View
            style={[styles.picContainer, darkMode && darkStyles.picContainer]}
          >
            <Image
              source={image ? { uri: image } : defaultProfile}
              style={styles.profilePicture}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginVertical: 20,
            }}
          >
            <TouchableOpacity
              style={[styles.editBtn, darkMode && darkStyles.editBtn]}
            >
              <Text style={[styles.editText, darkMode && darkStyles.editText]}>
                EDIT
              </Text>
            </TouchableOpacity>
            <ImageSelector setChanges={setChanges} setImage={setImage} />
            <TouchableOpacity
              style={[styles.removeBtn, darkMode && darkStyles.removeBtn]}
              onPress={async () => {
                setImage(null);
                setChanges(true);
              }}
            >
              <Text
                style={[styles.removeText, darkMode && darkStyles.removeText]}
              >
                REMOVE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.field, darkMode && darkStyles.field]}>
          <Text style={[styles.fieldText, darkMode && darkStyles.fieldText]}>
            Date of birth
          </Text>
          <TextInput
            value={newBirthDate}
            onChange={() => setChanges(true)}
            onChangeText={setNewBirthDate}
            placeholder={user.birthDate}
            style={[styles.input, darkMode && darkStyles.input]}
          />
        </View>
        <View style={[styles.field, darkMode && darkStyles.field]}>
          <Text style={[styles.fieldText, darkMode && darkStyles.fieldText]}>
            Email
          </Text>
          <TextInput
            value={newEmail}
            onChange={() => setChanges(true)}
            onChangeText={setNewEmail}
            placeholder={user.email}
            style={[styles.input, darkMode && darkStyles.input]}
          />
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

  picHeader: {
    color: "#C32528",
    fontWeight: "bold",
    fontSize: 15,
    padding: 10,
  },

  picContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },

  profilePicture: {
    width: 140,
    height: 140,
    resizeMode: "stretch",
    borderRadius: 70,
  },

  removeBtn: {
    backgroundColor: "#C32528",
    borderRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 5,
    alignItems: "center",
  },

  removeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },

  field: {
    backgroundColor: "white",
    marginTop: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 45,
  },

  fieldText: {
    color: "#C32528",
    fontWeight: "bold",
    fontSize: 15,
    marginHorizontal: 10,
  },

  input: {
    fontWeight: "bold",
    fontSize: 15,
    marginRight: 10,
  },

  editBtn: {
    backgroundColor: "#E4E4E4",
    borderRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 5,
    alignItems: "center",
  },

  editText: {
    color: "#BCBCBC",
    fontWeight: "bold",
    fontSize: 15,
    marginHorizontal: 10,
  },
});
const darkStyles = StyleSheet.create({});
