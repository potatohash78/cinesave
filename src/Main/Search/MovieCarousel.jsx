import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import { Overlay } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import Movie from "../Home/Movie";

export default function MovieCarousel({
  visible,
  setVisible,
  theater,
  setOpenCheckout,
}) {
  const [movies, setMovies] = useState([]);
  const { width: windowWidth } = useWindowDimensions();
  function renderMovie({ item, index }) {
    return (
      <Movie
        title={item.title}
        genre={item.genre}
        movieLength={item.runtime}
        rating={item.rating}
        showingTimes={item.time}
        info={item}
        setOpenCheckout={setOpenCheckout}
        setVisible={setVisible}
      />
    );
  }

  useEffect(() => {
    async function getMovies() {
      let theaterId = await fetch(
        `https://dry-tor-14403.herokuapp.com/info/theaterid?name=${theater}`
      );
      theaterId = await theaterId.json();
      theaterId = theaterId[0].theater_id;
      let search = await fetch(
        `https://dry-tor-14403.herokuapp.com/homepage?theater=${theaterId}`
      );
      search = await search.json();
      setMovies(search);
    }
    getMovies();
  }, [visible]);

  return (
    <Overlay
      isVisible={visible}
      fullScreen={true}
      overlayStyle={[
        {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          padding: 0,
        },
      ]}
    >
      <SafeAreaView style={{ flex: 1, opacity: 1 }}>
        <Pressable
          onPress={() => {
            setVisible(false);
          }}
          style={{ alignSelf: "flex-end" }}
        >
          <Ionicons name="close-sharp" color="#C32528" size={40} />
        </Pressable>
        <Text
          style={[
            {
              color: "#C32528",
              fontWeight: "bold",
              fontSize: 20,
              textTransform: "uppercase",
              width: "100%",
              textAlign: "left",
              marginTop: 80,
              marginLeft: 10,
              marginBottom: 20,
            },
          ]}
        >
          {theater}
        </Text>
        <View style={{ overflow: "hidden" }}>
          <Carousel
            layout={"default"}
            data={movies}
            sliderWidth={windowWidth}
            itemWidth={250}
            renderItem={renderMovie}
          />
        </View>
      </SafeAreaView>
    </Overlay>
  );
}
