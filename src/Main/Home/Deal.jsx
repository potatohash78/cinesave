import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Deal({
  title,
  genre,
  movieLength,
  location,
  rating,
  showingDate,
  showingTime,
  price,
  discount,
  poster,
}) {
  //   const moviePoster = require(`${poster}`);
  const moviePoster = require("../../../assets/skywalker.png");
  return (
    <View style={styles.dealContainer}>
      <Text numberOfLines={1} style={styles.title}>{`${title}`}</Text>
      <View style={styles.subcontainer}>
        <Text style={styles.genre}>
          {`${genre}`} | {`${movieLength}`}
        </Text>
        <Text style={styles.rating}>
          <Ionicons name="star-sharp" color="gold" size={17} />
          {`${rating}`}
        </Text>
      </View>
      <Text style={styles.location}>{`${location}`}</Text>
      <Text style={styles.time}>
        {`${showingDate}`} | {`${showingTime}`}
      </Text>
      <View style={styles.price}>
        <Text style={styles.regularPrice}>${`${price}`}</Text>
        <Text style={styles.discountPrice}>
          ${`${(price * (1 - discount / 100)).toFixed(2)}`}
        </Text>
      </View>
      <Text style={styles.discountBanner}>{`${discount}`}% OFF</Text>
      <Image style={styles.poster} source={moviePoster} />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>BUY NOW</Text>
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

  location: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 4,
    marginHorizontal: 7,
  },

  time: {
    fontWeight: "bold",
    fontSize: 14,
    marginHorizontal: 7,
    marginTop: 2,
  },

  price: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 20,
  },

  regularPrice: {
    fontSize: 14,
    color: "#C32528",
    textDecorationLine: "line-through",
    fontWeight: "bold",
    marginRight: 3,
  },

  discountPrice: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 3,
  },

  discountBanner: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#C32528",
    marginTop: 3,
    paddingVertical: 3,
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
