import React, { useContext, useState } from "react";
import { Overlay } from "react-native-elements";
import { SettingsContext } from "../../SettingsProvider";
import { StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import { TheatersContext } from "../../TheatersProvider";
import { Ionicons } from "@expo/vector-icons";
import { firestore } from "../../../firebase";

export default function AddTheater({ visible, setVisible }) {
  const { settings } = useContext(SettingsContext);
  const { theaters, setTheaters, currTheater, setCurrTheater } =
    useContext(TheatersContext);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  async function searchTheaters(theaterName) {
    setSearchResults([]);
    const query = await firestore
      .collection("theaters")
      .where("Name", "==", theaterName)
      .get();
    const results = query.docs;
    setSearchResults(results);
  }

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
        <Pressable onPress={() => setVisible(false)}>
          <Text
            style={[styles.backBtn, settings.darkMode && darkStyles.backBtn]}
          >
            BACK
          </Text>
        </Pressable>
        <Text style={[styles.title, settings.darkMode && darkStyles.title]}>
          ADD THEATER
        </Text>
      </View>
      <View style={[styles.body, settings.darkMode && darkStyles.body]}>
        <View
          style={[
            styles.searchView,
            settings.darkMode && darkStyles.searchView,
          ]}
        >
          <TextInput
            style={[
              styles.searchBar,
              settings.darkMode && darkStyles.searchBar,
            ]}
            placeholder="Type to search for a theater..."
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={async () => {
              await searchTheaters(search);
              setSearch("");
            }}
          />
          <Ionicons
            name="search-sharp"
            color={settings.darkMode ? "#D7B286" : "#C32528"}
            size={20}
            style={{ position: "absolute", right: 20 }}
          />
        </View>
        {searchResults.map((result) => (
          <View key={result.data()["Name"]}>
            <Pressable>
              <Text>{`${result.data()["Name"]}`}</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0EAEA",
    padding: 0,
  },

  header: {
    height: 90,
    alignItems: "flex-end",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    paddingBottom: 10,
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
    marginLeft: 40,
  },

  body: {
    alignItems: "center",
  },

  searchView: {
    flexDirection: "row",
    marginTop: 30,
    alignItems: "center",
  },

  searchBar: {
    backgroundColor: "white",
    fontSize: 15,
    fontWeight: "bold",
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 20,
    width: "90%",
  },
});

const darkStyles = StyleSheet.create({});
