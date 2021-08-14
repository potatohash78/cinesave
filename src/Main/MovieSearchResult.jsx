import React, { useContext, useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { TheatersContext } from "../TheatersProvider";
import { CheckoutContext } from "../CheckoutProvider";

export default function MovieSearchResult({
  info,
  setRegion,
  showResults,
  setOpenCheckout,
}) {
  const {
    theaters,
    setTheaters,
    currTheater,
    setCurrTheater,
    theaterNames,
    setTheaterNames,
  } = useContext(TheatersContext);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState();
  const [selectedTheater, setSelectedTheater] = useState(currTheater);
  const [visible, setVisible] = useState(false);
  const y = useRef(new Animated.Value(172.7)).current;
  const [openTimes, setOpenTimes] = useState(false);
  const [times, setTimes] = useState([]);
  const { setPage, setInfo, setPoster, setMovieDate } =
    useContext(CheckoutContext);

  async function getTimes(theater) {
    setTimes([]);
    let theaterId = await fetch(
      `https://dry-tor-14403.herokuapp.com/info/theaterid?name=${theater}`
    );
    theaterId = await theaterId.json();
    theaterId = theaterId[0].theater_id;
    let movies = await fetch(
      `https://dry-tor-14403.herokuapp.com/homepage?theater=${theaterId}`
    );
    movies = await movies.json();
    movies = movies.filter((movie) => movie.title === info.title);
    const movieInfo = movies[0];
    if (movieInfo) {
      setTimes(movieInfo.time);
    }
  }

  useEffect(() => {
    setLoading(true);
    async function getPoster() {
      const result = await fetch(
        `https://dry-tor-14403.herokuapp.com/info/movieposter?movie=${info.title}`
      );
      const json = await result.json();
      setImage(json.poster_path);
    }
    getPoster();
    getTimes(selectedTheater);
    setLoading(false);
  }, []);

  return loading ? null : (
    <View style={[styles.resultContainer]}>
      <Image
        source={{ uri: image }}
        style={{ width: "30%", aspectRatio: 27 / 40 }}
      />

      <View
        style={{
          flexDirection: "column",
          width: "70%",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        {visible && (
          <ScrollView
            style={{
              width: "105%",
              height: "100%",
              position: "absolute",
              backgroundColor: "white",
              zIndex: 99,
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  width: "90%",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {selectedTheater}
              </Text>
              <Pressable
                onPress={() => {
                  setVisible(false);
                }}
              >
                <Ionicons name="close" size={17} />
              </Pressable>
            </View>
            {theaterNames.map((theater, index) => {
              if (theater !== selectedTheater) {
                return (
                  <Pressable
                    key={index}
                    onPress={async () => {
                      setSelectedTheater(theater);
                      await getTimes(theater);
                      setVisible(false);
                    }}
                  >
                    <Text style={{ textTransform: "uppercase", marginTop: 4 }}>
                      {theater}
                    </Text>
                  </Pressable>
                );
              }
            })}
          </ScrollView>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              width: "70%",
            }}
          >
            {info.title}
          </Text>
        </View>
        <View
          style={{
            marginLeft: 10,
            flexDirection: "row",
            width: "100%",
            alignItems: "flex-end",
            bottom: 10,
          }}
        >
          <Text
            style={{
              color: "#BCBCBC",
              fontSize: 10,
              fontWeight: "bold",
              width: "80%",
            }}
          >
            {info.genre} | {Math.floor(info.runtime / 60)}h {info.runtime % 60}m
          </Text>
          <Ionicons name="star-sharp" size={17} color="#d4c02a" />
          <Text style={{ marginLeft: 1, fontWeight: "bold" }}>
            {info.rating}
          </Text>
        </View>
        <View style={{ marginLeft: 10, marginTop: 10, width: "100%" }}>
          <Text style={{ fontWeight: "bold" }}>THEATER</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text style={{ textTransform: "uppercase", width: "90%" }}>
              {selectedTheater}
            </Text>
            <Pressable
              onPress={() => {
                setVisible(true);
              }}
            >
              <Ionicons name="chevron-down" size={20} />
            </Pressable>
          </View>
        </View>
        <TouchableOpacity
          style={[
            {
              backgroundColor: "#C32528",
              paddingHorizontal: 40,
              paddingVertical: 5,
              marginLeft: 10,
              marginTop: 10,
              borderRadius: 50,
            },
          ]}
          onPress={() => {
            setOpenTimes(true);
            Animated.timing(y, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: false,
            }).start();
          }}
        >
          <Text
            style={[
              { color: "white", fontWeight: "bold", textAlign: "center" },
            ]}
          >
            SHOW TIMES
          </Text>
        </TouchableOpacity>
      </View>
      <Animated.View
        style={{
          width: "108%",
          top: y,
          height: "119%",
          opacity: openTimes ? 1 : 0,
          borderRadius: 10,
          position: "absolute",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={[
              {
                fontWeight: "bold",
                color: "#C32528",
                textAlign: "center",
                fontSize: 18,
                width: "100%",
                marginTop: 10,
              },
            ]}
          >
            TODAY
          </Text>
          <Pressable
            onPress={() => {
              Animated.timing(y, {
                toValue: 172.7,
                duration: 1000,
                useNativeDriver: false,
              }).start(() => setOpenTimes(false));
            }}
            style={{ right: 40 }}
          >
            <Ionicons name="close-sharp" color="#C32528" size={45} />
          </Pressable>
        </View>
        <View
          style={{
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {times.length ? (
              times.map((time, index) => {
                const d = new Date(time);
                return (
                  <Pressable
                    key={index}
                    onPress={() => {
                      setPage(2);
                      setOpenCheckout(true);
                      setInfo({ ...info, theater_name: selectedTheater });
                      setMovieDate(d);
                      setPoster(image);
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
              })
            ) : (
              <Text style={{ width: "90%", fontWeight: "bold" }}>
                There are no times for your current selected theater.
              </Text>
            )}
          </View>
          {times.length ? (
            <Pressable
              onPress={() => {
                setPage(0);
                setOpenCheckout(true);
                setInfo({ ...info, theater_name: selectedTheater });
                setPoster(image);
              }}
            >
              <Text style={[styles.btns]}>GO TO CALENDAR</Text>
            </Pressable>
          ) : null}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    backgroundColor: "#FFFFFFFF",
    width: "90%",
    left: 20,
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    overflow: "hidden",
  },

  time: {
    textAlign: "center",
    color: "white",
    backgroundColor: "#C32528",
    width: 85,
    borderRadius: 12,
    overflow: "hidden",
    paddingVertical: 3,
    fontWeight: "bold",
    margin: 8,
    fontSize: 15,
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
    marginBottom: 10,
  },
});
