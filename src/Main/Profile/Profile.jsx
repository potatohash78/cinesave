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
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SettingsContext } from "../../SettingsProvider";
import { UserContext } from "../../UserProvider";
import { storage } from "../../../firebase";
import Settings from "../Settings";
import Purchase from "./Purchase";
import EditProfile from "./EditProfile";
import { PurchaseContext } from "../../PurchaseProvider";

const defaultProfile = require("../../../assets/default-profile.png");

export default function Profile() {
  const { settings } = useContext(SettingsContext);
  const { user } = useContext(UserContext);
  const { purchases } = useContext(PurchaseContext);
  const [openSettings, setOpenSettings] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openPurchase, setOpenPurchase] = useState(false);
  const [profilePic, setProfilePic] = useState();
  const { width: windowWidth } = useWindowDimensions();

  async function getProfilePicture() {
    const imageRef = storage.ref(`images/${user.id}`);
    try {
      const url = await imageRef.getDownloadURL();
      setProfilePic(url);
    } catch (error) {
      setProfilePic(null);
    }
  }

  async function updateProfilePicture(uri) {
    const imageRef = storage.ref(`images/${user.id}`);
    if (uri) {
      const response = await fetch(uri);
      const file = await response.blob();
      await imageRef.put(file);
    } else {
      try {
        await imageRef.delete();
      } catch {
        console.log("No image to delete");
      }
    }
  }

  useEffect(() => {
    getProfilePicture();
  }, [openEdit]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: settings.darkMode ? "black" : "white",
      }}
    >
      <ScrollView
        style={[
          styles.profileContainer,
          settings.darkMode && darkStyles.profileContainer,
        ]}
      >
        <Settings visible={openSettings} setVisible={setOpenSettings} />
        <Purchase visible={openPurchase} setVisible={setOpenPurchase} />
        <EditProfile
          visible={openEdit}
          setVisible={setOpenEdit}
          update={updateProfilePicture}
          profilePic={profilePic}
        />
        <View style={[styles.header, settings.darkMode && darkStyles.header]}>
          <Text
            style={[
              styles.brandName,
              settings.darkMode && darkStyles.brandName,
            ]}
          >
            CINESAVE
          </Text>
          <Pressable onPress={() => setOpenSettings(true)}>
            <Ionicons
              style={styles.settings}
              name="settings"
              size={20}
              color={settings.darkMode ? "#D7B286" : "#C32528"}
            />
          </Pressable>
        </View>
        <View
          style={[
            styles.editContainer,
            settings.darkMode && darkStyles.editContainer,
          ]}
        >
          <TouchableOpacity
            style={[styles.editBtn, settings.darkMode && darkStyles.editBtn]}
            onPress={() => setOpenEdit(true)}
          >
            <Text
              style={[
                styles.editText,
                settings.darkMode && darkStyles.editText,
              ]}
            >
              EDIT
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.pictureContainer,
            settings.darkMode && darkStyles.pictureContainer,
          ]}
        >
          <Image
            source={profilePic ? { uri: profilePic } : defaultProfile}
            style={styles.profilePicture}
          />
          <Text
            style={[styles.display, settings.darkMode && darkStyles.display]}
          >
            {`${user.firstName}`} {`${user.lastName}`}
          </Text>
        </View>
        {!user.premium && (
          <View
            style={[
              styles.upgradeContainer,
              settings.darkMode && darkStyles.upgradeContainer,
            ]}
          >
            <Text
              style={[
                styles.upgradeText,
                settings.darkMode && darkStyles.upgradeText,
              ]}
            >
              You are currently on a{" "}
              <Text style={{ fontWeight: "bold" }}>CINESAVE STANDARD</Text>{" "}
              plan.
            </Text>
            <Text
              style={[
                styles.upgradeText,
                settings.darkMode && darkStyles.upgradeText,
              ]}
            >
              <Text style={{ fontWeight: "bold" }}>UPGRADE NOW</Text> for
              special discounts, rewards, and other perks!
            </Text>
            <TouchableOpacity
              style={[
                styles.upgradeBtn,
                settings.darkMode && darkStyles.upgradeBtn,
              ]}
            >
              <Text
                style={[
                  styles.learnMore,
                  settings.darkMode && darkStyles.learnMore,
                ]}
              >
                LEARN MORE
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View
          style={[
            styles.rewardsBar,
            settings.darkMode && darkStyles.rewardsBar,
          ]}
        >
          {purchases
            .slice(-1 * (3 - user.nextReward))
            .map((purchase, index) => (
              <Image
                key={index}
                source={{ uri: purchase.poster }}
                style={{ width: windowWidth / 4, height: "100%", opacity: 0.5 }}
              />
            ))}
        </View>
        <Text
          style={[
            styles.rewardsText,
            settings.darkMode && darkStyles.rewardsText,
          ]}
        >
          You are currently{" "}
        </Text>
        <Text
          style={[
            styles.rewardsText,
            settings.darkMode && darkStyles.rewardsText,
            { fontWeight: "bold" },
          ]}
        >
          {`${user.nextReward}`} MOVIES
        </Text>
        <Text
          style={[
            styles.rewardsText,
            settings.darkMode && darkStyles.rewardsText,
          ]}
        >
          away from your next reward!
        </Text>
        <TouchableOpacity
          style={[
            styles.purchaseBtn,
            settings.darkMode && darkStyles.purchaseBtn,
          ]}
          onPress={() => setOpenPurchase(true)}
        >
          <Text
            style={[
              styles.purchaseText,
              settings.darkMode && darkStyles.purchaseText,
            ]}
          >
            VIEW PURCHASES
          </Text>
        </TouchableOpacity>
        <Text
          style={[
            styles.personalInfoHeader,
            settings.darkMode && darkStyles.personalInfoHeader,
          ]}
        >
          PERSONAL INFORMATION:
        </Text>
        <Text
          style={[
            styles.personalInfo,
            settings.darkMode && darkStyles.personalInfo,
          ]}
        >
          Personal information is only needed for ticket purchasing purposes.
          You can view this information by editing your profile.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: "#F0EAEA",
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "white",
    height: 80,
    justifyContent: "space-between",
  },

  brandName: {
    width: "45%",
    fontSize: 30,
    fontWeight: "bold",
    color: "#C32528",
    paddingLeft: 10,
    paddingBottom: 13,
    margin: 0,
  },

  settings: {
    paddingBottom: 13,
    marginRight: 10,
  },

  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
  },

  editBtn: {
    marginLeft: 10,
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

  pictureContainer: {
    alignItems: "center",
  },

  profilePicture: {
    width: 140,
    height: 140,
    resizeMode: "stretch",
    borderRadius: 70,
  },

  display: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#C32528",
    marginTop: 10,
    textTransform: "uppercase",
  },

  upgradeContainer: {
    backgroundColor: "#C32528",
    marginTop: 35,
    padding: 10,
  },

  upgradeText: {
    marginVertical: 10,
    color: "white",
    fontSize: 15,
  },

  upgradeBtn: {
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: "50%",
    alignSelf: "center",
    borderRadius: 50,
    marginTop: 15,
    marginBottom: 10,
  },

  learnMore: {
    fontSize: 24,
    color: "#C32528",
    fontWeight: "bold",
  },

  rewardsBar: {
    backgroundColor: "#C32528",
    height: 85,
    marginTop: 35,
    width: "75%",
    borderRadius: 100,
    alignSelf: "center",
    flexDirection: "row",
    overflow: "hidden",
    marginBottom: 8,
  },

  rewardsText: {
    width: "75%",
    alignSelf: "center",
    marginTop: 2,
    fontSize: 13,
    textAlign: "center",
    color: "#C32528",
  },

  purchaseBtn: {
    width: "50%",
    backgroundColor: "#C32528",
    borderRadius: 50,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    paddingVertical: 5,
  },

  purchaseText: {
    fontWeight: "bold",
    color: "white",
  },

  personalInfoHeader: {
    width: "100%",
    color: "#C32528",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 30,
    marginLeft: 10,
  },

  personalInfo: {
    width: "100%",
    color: "#C32528",
    fontSize: 16,
    marginBottom: 20,
    marginHorizontal: 10,
  },
});

const darkStyles = StyleSheet.create({});
