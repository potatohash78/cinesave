import React, { useContext, useState, useEffect } from "react";
import { Overlay } from "react-native-elements";
import { SettingsContext } from "../../SettingsProvider";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import SearchResult from "../SearchResult";

export default function AddTheater({ visible, setVisible, setChanges }) {
  const { settings } = useContext(SettingsContext);
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const [region, setRegion] = useState();
  const [focus, setFocus] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  // Ask what to do if the user doesn't want their location to be tracked.

  useEffect(() => {
    setSearch("");
    setFocus(null);
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0461,
        longitudeDelta: 0.021,
      });
    })();
  }, [visible]);

  async function searchTheaters(theaterName) {
    setResults([]);
    const query_ids = await (
      await fetch(
        `https://dry-tor-14403.herokuapp.com/info/theaterid?name=${theaterName}`
      )
    ).json();
    const ids = query_ids.map((id) => id.theater_id);
    await Promise.all(
      ids.map((id) =>
        fetch(
          `https://dry-tor-14403.herokuapp.com/info/theaterinfo?theater=${id}`
        )
      )
    )
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then((data) => {
        const searchResults = [];
        for (let item of data) {
          searchResults.push(item);
        }
        setResults(searchResults);
      });
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
      <SafeAreaView
        style={{
          flex: 0,
          backgroundColor: settings.darkMode ? "black" : "white",
          zIndex: 99,
        }}
      />
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
      <MapView region={region} style={{ width: "100%", height: "100%" }}>
        {focus ? (
          <Marker
            coordinate={{
              latitude: focus.latitude,
              longitude: focus.longitude,
            }}
            style={{ width: "100%" }}
          >
            <Ionicons
              name="location"
              size={100}
              color="#C32528"
              style={{ zIndex: -1, left: 150, position: "absolute" }}
            />
            <SearchResult
              info={focus}
              setRegion={setRegion}
              showResults={setShowResults}
              setFocus={setFocus}
              onMap={true}
            />
          </Marker>
        ) : null}
      </MapView>
      {showResults && (
        <ScrollView style={[styles.resultsContainer]}>
          {results.map((result) => (
            <SearchResult
              key={result.theater_id}
              info={result}
              setRegion={setRegion}
              showResults={setShowResults}
              setFocus={setFocus}
              onMap={false}
            />
          ))}
        </ScrollView>
      )}
      <TextInput
        value={search}
        onChangeText={setSearch}
        style={[styles.searchBar]}
        placeholder="Type to search for a theater..."
        onSubmitEditing={async () => {
          setShowResults(true);
          await searchTheaters(search);
        }}
      />
      <Pressable
        style={{ position: "absolute", left: 325, top: 133 }}
        onPress={() => {
          setShowResults(false);
          setSearch("");
        }}
      >
        <Ionicons name={"close-outline"} color={"#C32528"} size={45} />
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
    height: 70,
    alignItems: "flex-end",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    paddingBottom: 10,
    zIndex: 99,
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

  searchBar: {
    position: "absolute",
    width: "90%",
    left: 20,
    top: 140,
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
    backgroundColor: "rgba(0,0,0,0.8)",
    position: "absolute",
    width: "100%",
    height: "100%",
    paddingTop: 200,
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

  searchBar: {
    backgroundColor: "black",
    color: "white",
  },
});
