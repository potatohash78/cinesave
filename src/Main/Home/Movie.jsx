import React, { useContext } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SettingsContext } from "../../SettingsProvider";

export default function Movie({ title, genre, movieLength, rating, poster }) {
  //   const moviePoster = require(`${poster}`);
  const moviePoster = require("../../../assets/skywalker.png");
  const { settings } = useContext(SettingsContext);
  return (
    <View
      style={[
        styles.dealContainer,
        settings.darkMode && darkStyles.dealContainer,
      ]}
    >
      <Text
        numberOfLines={1}
        style={[styles.title, settings.darkMode && darkStyles.title]}
      >{`${title}`}</Text>
      <View style={styles.subcontainer}>
        <Text style={styles.genre}>
          {`${genre}`} | {`${movieLength}`}
        </Text>
        <Text style={[styles.rating, settings.darkMode && darkStyles.rating]}>
          <Ionicons name="star-sharp" color="gold" size={17} />
          {`${rating}`}
        </Text>
      </View>
      <Image style={styles.poster} source={moviePoster} />
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, settings.darkMode && darkStyles.button]}
        >
          <Text style={styles.buttonText}>SHOW TIMES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dealContainer: {
    backgroundColor: "white",
    borderColor: "#E4E4E4",
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    height: 25,
    overflow: "hidden",
    marginVertical: 5,
    marginHorizontal: 7,
  },

  subcontainer: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  genre: {
    color: "#BCBCBC",
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 7,
    width: "70%",
    paddingTop: 4,
  },

  rating: {
    marginRight: 7,
    fontWeight: "bold",
  },

  poster: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 12,
  },

  footer: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },

  button: {
    backgroundColor: "#C32528",
    borderRadius: 50,
    width: "60%",
    marginBottom: 10,
  },

  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
  },
});

const darkStyles = StyleSheet.create({
  dealContainer: {
    backgroundColor: "black",
  },

  title: {
    color: "white",
  },

  rating: {
    color: "white",
  },

  location: {
    color: "white",
  },

  time: {
    color: "white",
  },

  discountPrice: {
    color: "white",
  },

  button: {
    backgroundColor: "#D7B286",
  },
});
