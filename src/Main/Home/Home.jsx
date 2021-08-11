import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TheatersContext } from "../../TheatersProvider";
import { SettingsContext } from "../../SettingsProvider";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import Carousel from "react-native-snap-carousel";
import Checkout from "../Checkout/Checkout";
import Deal from "./Deal";
import Movie from "./Movie";
import Settings from "../Settings";
import TheaterSelect from "./TheaterSelect";
import MyTheaters from "./MyTheaters";

const windowWidth = Dimensions.get("window").width;

export default function Home() {
  const [openSettings, setOpenSettings] = useState(false);
  const [openTheater, setOpenTheater] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [addTheater, setAddTheater] = useState(false);
  const [deals, setDeals] = useState([]);
  const [movies, setMovies] = useState({});
  const { theaters, currTheater, theaterNames } = useContext(TheatersContext);
  const { settings } = useContext(SettingsContext);
  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    async function getMovies() {
      await Promise.all(
        theaters.map((theater) =>
          fetch(
            `https://dry-tor-14403.herokuapp.com/homepage?theater=${theater}`
          )
        )
      )
        .then((responses) =>
          Promise.all(responses.map((response) => response.json()))
        )
        .then((data) => {
          const newMovies = {};
          const newDeals = [];
          for (let i in data) {
            newMovies[theaterNames[i]] = data[i];
            newDeals.push(...data[i]);
          }
          setMovies(newMovies);
          setDeals(newDeals);
        });
    }
    trackPromise(getMovies());
  }, [addTheater]);

  function renderDeal({ item, index }) {
    return (
      <Deal
        title={item.title}
        genre={item.genre}
        movieLength={item.runtime}
        location={item.theater_name}
        rating={item.rating}
        showingTimes={item.time}
        price={item.original_price}
        discount={item.discounted_price}
        info={item}
        setOpenCheckout={setOpenCheckout}
      />
    );
  }

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
      />
    );
  }

  return promiseInProgress ? null : (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: settings.darkMode ? "black" : "white",
      }}
    >
      <ScrollView
        style={[
          styles.homeContainer,
          settings.darkMode && darkStyles.homeContainer,
        ]}
      >
        <Settings visible={openSettings} setVisible={setOpenSettings} />
        <Checkout
          visible={openCheckout}
          setVisible={setOpenCheckout}
          movieTitle={"Star Wars: The Rise of Skywalker"}
        />
        <View style={[styles.header, settings.darkMode && darkStyles.header]}>
          <Text
            style={[
              styles.brandName,
              settings.darkMode && darkStyles.brandName,
            ]}
          >
            CINESAVE
          </Text>
          <Pressable onPress={() => setOpenSettings(true)}>
            <Ionicons
              style={styles.icon}
              name="cart-outline"
              size={25}
              color={settings.darkMode ? "#D7B286" : "#C32528"}
            />
          </Pressable>
          <Pressable onPress={() => setOpenSettings(true)}>
            <Ionicons
              style={styles.icon}
              name="settings"
              size={22}
              color={settings.darkMode ? "#D7B286" : "#C32528"}
            />
          </Pressable>
        </View>
        <View
          style={[
            styles.dealsContainer,
            settings.darkMode && darkStyles.dealsContainer,
          ]}
        >
          <Text
            style={[
              styles.dealsHeader,
              settings.darkMode && darkStyles.dealsHeader,
            ]}
          >
            TOP DEALS
          </Text>
          <View style={styles.deals}>
            <Carousel
              layout={"default"}
              data={deals}
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
          ]}
        >
          <TheaterSelect visible={openTheater} setVisible={setOpenTheater} />
          <MyTheaters
            visible={addTheater}
            setVisible={setAddTheater}
            setParentVisible={setOpenTheater}
          />

          <Pressable
            onPress={() => setOpenTheater(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <Text
              style={[
                styles.currTheater,
                settings.darkMode && darkStyles.currTheater,
              ]}
            >
              {`${currTheater}`}
            </Text>
            <Ionicons
              name="chevron-down"
              size={30}
              color={settings.darkMode ? "#D7B286" : "#C32528"}
            />
          </Pressable>
          <Carousel
            layout={"default"}
            data={movies[`${currTheater}`]}
            sliderWidth={windowWidth}
            itemWidth={250}
            renderItem={renderMovie}
            loop={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
    width: "80%",
    fontSize: 30,
    fontWeight: "bold",
    color: "#C32528",
    paddingLeft: 10,
    paddingBottom: 13,
    margin: 0,
  },

  icon: {
    paddingBottom: 13,
    marginLeft: 8,
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
    marginTop: 3,
    backgroundColor: "white",
    marginBottom: 3,
    paddingBottom: 30,
  },

  addTheater: {
    fontSize: 25,
    fontWeight: "bold",
    paddingLeft: 25,
    paddingVertical: 20,
    color: "#C32528",
  },

  currTheater: {
    marginLeft: 20,
    fontWeight: "bold",
    color: "#C32528",
    fontSize: 25,
    textTransform: "uppercase",
  },
});

const darkStyles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#1C1A19",
  },

  header: {
    backgroundColor: "black",
  },

  brandName: {
    color: "#D7B286",
  },

  dealsContainer: {
    backgroundColor: "black",
  },

  dealsHeader: {
    color: "#D7B286",
  },

  showingsContainer: {
    backgroundColor: "black",
  },

  addTheater: {
    color: "#D7B286",
  },

  currTheater: {
    color: "#D7B286",
  },
});
