import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { SettingsContext } from "../../SettingsProvider";
import { UserContext } from "../../UserProvider";
import Settings from "../Settings";
import TheaterSearchResult from "../TheaterSearchResult";
import MovieSearchResult from "../MovieSearchResult";
import Checkout from "../Checkout/Checkout";
import MovieCarousel from "./MovieCarousel";

export default function Search() {
  const { settings } = useContext(SettingsContext);
  const { user } = useContext(UserContext);
  const [openSettings, setOpenSettings] = useState(false);
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [theaterResults, setTheaterResults] = useState([]);
  const [movieResults, setMovieResults] = useState([]);
  const [region, setRegion] = useState();
  const [focus, setFocus] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [openCarousel, setOpenCarousel] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    setSearch("");
    setFocus(null);
    setShowResults(false);
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
  }, [isFocused]);

  async function searchTheaters(theaterName) {
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
        const searchTheaterResults = [];
        for (let item of data) {
          searchTheaterResults.push(item);
        }
        setTheaterResults(searchTheaterResults);
      });
  }

  async function searchMovies(movieName) {
    const query_ids = await (
      await fetch(
        `https://dry-tor-14403.herokuapp.com/info/movieid?name=${movieName}`
      )
    ).json();
    const ids = query_ids.map((id) => id.movie_id);
    await Promise.all(
      ids.map((id) =>
        fetch(`https://dry-tor-14403.herokuapp.com/info/movieinfo?movie=${id}`)
      )
    )
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then((data) => {
        const searchMovieResults = [];
        for (let item of data) {
          searchMovieResults.push(item);
        }
        setMovieResults(searchMovieResults);
      });
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: settings.darkMode ? "black" : "white",
      }}
    >
      <View style={{ flex: 1 }}>
        <Settings visible={openSettings} setVisible={setOpenSettings} />
        <MovieCarousel
          visible={openCarousel}
          setVisible={setOpenCarousel}
          theater={search}
          setOpenCheckout={setOpenCheckout}
        />
        <Checkout visible={openCheckout} setVisible={setOpenCheckout} />
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
              <TheaterSearchResult
                info={focus}
                setRegion={setRegion}
                showResults={setShowResults}
                setFocus={setFocus}
                onMap={true}
                setOpenCarousel={setOpenCarousel}
              />
            </Marker>
          ) : null}
        </MapView>
        {showResults && (
          <ScrollView style={[styles.resultsContainer]}>
            {theaterResults.map((result) => (
              <TheaterSearchResult
                key={result.theater_id}
                info={result}
                setRegion={setRegion}
                showResults={setShowResults}
                setFocus={setFocus}
                onMap={false}
                setOpenCarousel={setOpenCarousel}
              />
            ))}
            {movieResults.map((result) => (
              <MovieSearchResult
                key={result.movie_id}
                info={result}
                setRegion={setRegion}
                showResults={setShowResults}
                setOpenCheckout={setOpenCheckout}
              />
            ))}
          </ScrollView>
        )}
        <TextInput
          value={search}
          onChangeText={setSearch}
          style={[styles.searchBar]}
          placeholder="Search for movies, theaters, and more..."
          onSubmitEditing={async () => {
            setShowResults(true);
            setTheaterResults([]);
            setMovieResults([]);
            await searchTheaters(search);
            await searchMovies(search);
          }}
        />
        <Pressable
          style={{ position: "absolute", left: 325, top: 93 }}
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
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 0.2,
  },

  resultsContainer: {
    backgroundColor: "rgba(0,0,0,0.8)",
    position: "absolute",
    width: "100%",
    height: "100%",
    paddingTop: 160,
  },
});

const darkStyles = StyleSheet.create({});
