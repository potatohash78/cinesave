import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import { auth } from "../../../firebase";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../Main";
import { TheatersContext } from "../../TheatersProvider";
import { SettingsContext } from "../../SettingsProvider";
import Carousel from "react-native-snap-carousel";
import Deal from "./Deal";
import Movie from "./Movie";
import Settings from "../Settings";
import TheaterSelect from "./TheaterSelect";
import MyTheaters from "./MyTheaters";

const windowWidth = Dimensions.get("window").width;

const movies = [
  {
    title: "Star Wars: The Rise of Skywalker",
    genre: "Action",
    movieLength: "2h 22m",
    location: "Cranford Theater",
    rating: 3.6,
    showingDate: "October 30",
    showingTime: "10:15 PM",
    price: 16.49,
    discount: 40,
    poster: "../../../assets/skywalker.png",
  },
  {
    title: "Star Wars",
    genre: "Action",
    movieLength: "2h 22m",
    location: "Cranford Theater",
    rating: 3.6,
    showingDate: "October 30",
    showingTime: "10:15 PM",
    price: 16.49,
    discount: 40,
  },
  {
    title: "Star Wars",
    genre: "Action",
    movieLength: "2h 22m",
    location: "Cranford Theater",
    rating: 3.6,
    showingDate: "October 30",
    showingTime: "10:15 PM",
    price: 16.49,
    discount: 40,
  },
  {
    title: "Star Wars",
    genre: "Action",
    movieLength: "2h 22m",
    location: "Cranford Theater",
    rating: 3.6,
    showingDate: "October 30",
    showingTime: "10:15 PM",
    price: 16.49,
    discount: 40,
  },
];

function renderDeal({ item, index }) {
  return (
    <Deal
      title={item.title}
      genre={item.genre}
      movieLength={item.movieLength}
      location={item.location}
      rating={item.rating}
      showingDate={item.showingDate}
      showingTime={item.showingTime}
      price={item.price}
      discount={item.discount}
      poster={item.poster}
    />
  );
}

function renderMovie({ item, index }) {
  return (
    <Movie
      title={item.title}
      genre={item.genre}
      movieLength={item.movieLength}
      rating={item.rating}
      poster={item.poster}
    />
  );
}

export default function Home() {
  const [openSettings, setOpenSettings] = useState(false);
  const [openTheater, setOpenTheater] = useState(false);
  const [addTheater, setAddTheater] = useState(false);
  const { user } = useContext(UserContext);
  const { theaters, currTheater } = useContext(TheatersContext);
  const { settings } = useContext(SettingsContext);
  return (
    <ScrollView style={styles.homeContainer}>
      <Settings visible={openSettings} setVisible={setOpenSettings} />
      <View style={styles.header}>
        <Text style={styles.brandName}>CINESAVE</Text>
        <Text style={styles.userName}>Hi, {`${user["firstName"]}`}</Text>
        <Pressable onPress={() => setOpenSettings(true)}>
          <Ionicons
            style={styles.settings}
            name="settings"
            size={20}
            color="#C32528"
          />
        </Pressable>
      </View>
      <View style={styles.dealsContainer}>
        <Text style={styles.dealsHeader}>Top Deals</Text>
        <View style={styles.deals}>
          <Carousel
            layout={"default"}
            data={movies}
            sliderWidth={windowWidth}
            itemWidth={250}
            renderItem={renderDeal}
            loop={true}
          />
        </View>
      </View>
      <View
        style={[
          styles.showingsContainer,
          settings.darkMode && darkStyles.showingsContainer,
          theaters.length > 0 && { height: 450 },
        ]}
      >
        <TheaterSelect visible={openTheater} setVisible={setOpenTheater} />
        <MyTheaters
          visible={addTheater}
          setVisible={setAddTheater}
          setParentVisible={setOpenTheater}
        />
        {theaters.length === 0 && (
          <Pressable onPress={() => setAddTheater(true)}>
            <Text
              style={[
                styles.addTheater,
                settings.darkMode && darkStyles.addTheater,
              ]}
            >
              Add theater
            </Text>
          </Pressable>
        )}
        {theaters.length > 0 && (
          <View style={styles.selectTheaterContainer}>
            <Text
              style={[
                styles.selectTheater,
                settings.darkMode && darkStyles.selectTheater,
              ]}
            >
              Today at:
            </Text>
            <Pressable
              onPress={() => setOpenTheater(true)}
              style={{ flexDirection: "row" }}
            >
              <Text
                style={[
                  styles.currTheater,
                  settings.darkMode && darkStyles.currTheater,
                ]}
              >
                {`${currTheater}`}
              </Text>
              <Ionicons name="chevron-down" size={30} color="#C32528" />
            </Pressable>
          </View>
        )}
        {theaters.length > 0 && (
          <Carousel
            layout={"default"}
            data={movies}
            sliderWidth={windowWidth}
            itemWidth={250}
            renderItem={renderMovie}
            loop={true}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#F0EAEA",
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "white",
    height: 80,
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

  dealsContainer: {
    marginTop: 4,
    backgroundColor: "white",
  },

  dealsHeader: {
    color: "#C32528",
    width: "100%",
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingVertical: 20,
  },

  deals: {
    paddingBottom: 30,
  },

  showingsContainer: {
    marginTop: 30,
    backgroundColor: "white",
    marginBottom: 3,
  },

  selectTheaterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  addTheater: {
    fontSize: 25,
    fontWeight: "bold",
    paddingLeft: 25,
    paddingVertical: 20,
    color: "#C32528",
  },

  selectTheater: {
    fontSize: 25,
    fontWeight: "bold",
    paddingLeft: 25,
    paddingVertical: 20,
    color: "#C32528",
  },

  currTheater: {
    paddingLeft: 5,
    fontWeight: "bold",
    color: "#C32528",
    fontSize: 25,
    textTransform: "uppercase",
    paddingTop: 1,
  },
});

const darkStyles = StyleSheet.create({});
