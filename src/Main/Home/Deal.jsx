import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SettingsContext } from "../../SettingsProvider";
import { CheckoutContext } from "../../CheckoutProvider";

export default function Deal({
  title,
  genre,
  movieLength,
  location,
  rating,
  showingTimes,
  price,
  discount,
  setOpenCheckout,
  info,
}) {
  const { settings } = useContext(SettingsContext);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState();
  const { setPage, setInfo, setMovieDate, setPoster } =
    useContext(CheckoutContext);

  useEffect(() => {
    async function getPoster() {
      const query = await fetch(
        `https://dry-tor-14403.herokuapp.com/info/movieposter?${title}`
      );
      const data = await query.json();
      setUrl(data.poster_path);
      setLoading(false);
    }
    getPoster();
    const currTime = new Date("2021-06-01T15:30:00.000Z");
    // Reset to current time once testing is over.
    const newTimes = showingTimes.filter((time) => {
      let d = new Date(time);
      return d.getTime() > currTime.getTime();
    });
    setDate(new Date(newTimes[0]));
  }, []);

  return loading ? null : (
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
          {`${genre}`} | {Math.floor(`${movieLength}` / 60)} h{" "}
          {`${movieLength}` % 60} m
        </Text>
        <Text style={[styles.rating, settings.darkMode && darkStyles.rating]}>
          <Ionicons name="star-sharp" color="gold" size={17} />
          {`${rating}`}
        </Text>
      </View>
      <Text
        style={[styles.location, settings.darkMode && darkStyles.location]}
      >{`${location}`}</Text>
      <Text style={[styles.time, settings.darkMode && darkStyles.time]}>
        {`${date.toLocaleString("default", { month: "long" })}`}{" "}
        {date.getDate()} |{" "}
        {`${date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}`}
      </Text>
      <View style={styles.price}>
        <Text style={styles.regularPrice}>${`${price}`}</Text>
        <Text
          style={[
            styles.discountPrice,
            settings.darkMode && darkStyles.discountPrice,
          ]}
        >
          ${`${discount}`}
        </Text>
      </View>
      <Text style={styles.discountBanner}>
        {`${(((price - discount) * 100) / price).toFixed(0)}`}% OFF
      </Text>
      <Image
        style={styles.poster}
        source={{
          uri: url,
        }}
      />
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, settings.darkMode && darkStyles.button]}
          onPress={() => {
            setOpenCheckout(true);
            setInfo(info);
            setPage(2);
            setMovieDate(date);
            setPoster(url);
          }}
        >
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
    aspectRatio: 27 / 40,
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
