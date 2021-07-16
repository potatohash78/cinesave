import React, { useContext, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { SettingsContext } from "../../SettingsProvider";
import { UserContext } from "../../UserProvider";
import Settings from "../Settings";

export default function Search() {
  const { settings } = useContext(SettingsContext);
  const { user } = useContext(UserContext);
  const [openSettings, setOpenSettings] = useState(false);
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const [location, setLocation] = useState({});

  async function getResults() {}

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: settings.darkMode ? "black" : "white",
      }}
    >
      <View style={{ flex: 1 }}>
        <Settings visible={openSettings} setVisible={setOpenSettings} />
        <View style={[styles.header, settings.darkMode && darkStyles.header]}>
          <Text
            style={[
              styles.brandName,
              settings.darkMode && darkStyles.brandName,
            ]}
          >
            CINESAVE
          </Text>
          <Text
            style={[styles.userName, settings.darkMode && darkStyles.userName]}
          >
            Hi, {`${user["firstName"]}`}
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
        <MapView style={{ width: "100%", height: "100%" }} />
        {showResults && (
          <ScrollView style={[styles.resultsContainer]}>
            {results.map((result) => {
              <View>
                <Image />
                <View></View>
              </View>;
            })}
          </ScrollView>
        )}
        <TextInput
          value={search}
          onChangeText={setSearch}
          style={[styles.searchBar]}
          placeholder="Search for movies, theaters, and more..."
          onSubmitEditing={async () => {
            setShowResults(true);
            await getResults();
          }}
        />
        <Pressable
          style={{ position: "absolute", left: 325, top: 95 }}
          onPress={() => {
            setShowResults(false);
            setSearch("");
          }}
        >
          <Ionicons name="close-outline" color={"#C32528"} size={45} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "white",
    height: 80,
    zIndex: 99,
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

  userName: {
    width: "45%",
    textAlign: "right",
    color: "#C32528",
    fontSize: 15,
    paddingRight: 10,
    paddingBottom: 13,
    margin: 0,
  },

  settings: {
    paddingBottom: 13,
  },

  searchBar: {
    position: "absolute",
    width: "90%",
    left: 20,
    top: 100,
    backgroundColor: "white",
    borderRadius: 50,
    fontWeight: "bold",
    fontSize: 13,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowOffset: {
      shadowOffsetWidth: 0,
      shadowOffsetHeight: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 0.2,
  },

  resultsContainer: {
    backgroundColor: "black",
    opacity: 0.8,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

const darkStyles = StyleSheet.create({});
