import React, { useContext, useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SettingsContext } from "../../SettingsProvider";
import { CheckoutContext } from "../../CheckoutProvider";

export default function Movie({
  title,
  genre,
  movieLength,
  rating,
  showingTimes,
  setOpenCheckout,
  info,
}) {
  const { settings } = useContext(SettingsContext);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [openTimes, setOpenTimes] = useState(false);
  const [times, setTimes] = useState([]);
  const { setPage, setInfo, setMovieDate, setPoster } =
    useContext(CheckoutContext);
  const y = useRef(new Animated.Value(408)).current;

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
    const currTime = new Date("2021-05-01T15:30:00.000Z");
    // Reset to current time once testing is over.
    setTimes(
      showingTimes.filter((time) => {
        const date = new Date(time);
        return date.getTime() > currTime.getTime();
      })
    );
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
          {`${genre}`} | {`${movieLength}`}
        </Text>
        <Text style={[styles.rating, settings.darkMode && darkStyles.rating]}>
          <Ionicons name="star-sharp" color="gold" size={17} />
          {`${rating}`}
        </Text>
      </View>
      <Image style={styles.poster} source={{ uri: url }} />
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, settings.darkMode && darkStyles.button]}
          onPress={() => {
            setOpenTimes(true);
            Animated.timing(y, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: false,
            }).start();
          }}
        >
          <Text style={styles.buttonText}>SHOW TIMES</Text>
        </TouchableOpacity>
      </View>
      <Animated.View
        style={{
          width: "100%",
          top: y,
          position: "absolute",
          height: "100%",
          backgroundColor: "white",
          opacity: openTimes ? 0.95 : 0,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              marginTop: 120,
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {times.map((time, index) => {
              const d = new Date(time);
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    setPage(2);
                    setOpenCheckout(true);
                    setInfo(info);
                    setMovieDate(d);
                    setPoster(url);
                  }}
                >
                  <Text style={[styles.time]}>
                    {d.toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <Pressable
            onPress={() => {
              setPage(0);
              setOpenCheckout(true);
              setInfo(info);
              setPoster(url);
            }}
          >
            <Text style={[styles.btns]}>SHOW MORE TIMES</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => {
            Animated.timing(y, {
              toValue: 408,
              duration: 1000,
              useNativeDriver: false,
            }).start();
          }}
        >
          <Text style={[styles.btns, { marginBottom: 10 }]}>CLOSE</Text>
        </Pressable>
      </Animated.View>
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

  time: {
    textAlign: "center",
    color: "white",
    backgroundColor: "#C32528",
    width: 85,
    borderRadius: 11,
    overflow: "hidden",
    paddingVertical: 3,
    fontWeight: "bold",
    margin: 8,
  },

  btns: {
    backgroundColor: "#C32528",
    borderRadius: 13,
    overflow: "hidden",
    paddingVertical: 5,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    paddingHorizontal: 25,
    marginTop: 10,
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
