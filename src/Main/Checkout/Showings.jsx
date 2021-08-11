import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CheckoutContext } from "../../CheckoutProvider";

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const showings = [
  {
    time: new Date() + "",
    seats: 10,
    discounted_price: 10.0,
    original_price: 12.0,
  },
  {
    time: new Date() + "",
    seats: 10,
    discounted_price: 10.0,
    original_price: 12.0,
  },
  {
    time: new Date() + "",
    seats: 10,
    discounted_price: 10.0,
    original_price: 12.0,
  },
];

export default function Showings({ scroll }) {
  //   const [showings, setShowings] = useState([]);
  const { width: windowWidth } = useWindowDimensions();
  const { info, date } = useContext(CheckoutContext);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={[styles.showingsHeader]}>SHOWINGS FOR</Text>
        <Text style={[styles.movie]}>{info.title}</Text>
        <Text style={[styles.select]}>Tap on a time to choose.</Text>
      </View>
      <View style={[styles.dateContainer]}>
        <Text style={[styles.day]}>{date.getDate()}</Text>
        <View
          style={{
            flexDirection: "column",
            marginLeft: 10,
          }}
        >
          <Text style={[styles.date]}>
            {weekDays[date.getDay()]}, {months[date.getMonth()]}{" "}
            {date.getDate()}
          </Text>
          <Text style={[styles.showings]}>SHOWINGS</Text>
        </View>
      </View>
      <ScrollView style={{ marginTop: 2 }}>
        {showings.map((showing, i) => (
          <Pressable
            key={i}
            onPress={() => {
              scroll(windowWidth * 2);
            }}
          >
            <View style={[styles.showing]}>
              <Text style={[styles.time]}>
                {new Date(showing.time).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </Text>
              <Text style={[styles.seats]}>SEATS LEFT: {showing.seats}</Text>
              <View style={[styles.prices]}>
                <Text style={[styles.original]}>
                  ${showing.original_price.toFixed(2)}
                </Text>
                <Text style={[styles.discount]}>
                  ${showing.discounted_price.toFixed(2)}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <Pressable
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => {
          scroll(0);
        }}
      >
        <Ionicons name="chevron-back-sharp" size={50} color="#C32528" />
        <Text style={[styles.backBtn]}>BACK</Text>
      </Pressable>
      <SafeAreaView style={{ flex: 0, backgroundColor: "white" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  showingsHeader: {
    textAlign: "center",
    width: "100%",
    fontSize: 22,
    color: "#C32528",
  },

  movie: {
    textAlign: "center",
    width: "100%",
    fontWeight: "bold",
    fontSize: 30,
    color: "#C32528",
    marginTop: 10,
    textTransform: "uppercase",
  },

  select: {
    textAlign: "center",
    color: "#C32528",
    width: "100%",
    marginTop: 15,
    fontSize: 16,
  },

  dateContainer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#C32528",
    padding: 10,
    alignItems: "center",
    marginTop: 80,
  },

  day: {
    height: 40,
    width: 40,
    textAlign: "center",
    paddingTop: 7,
    fontWeight: "bold",
    color: "#C32528",
    borderRadius: 20,
    overflow: "hidden",
    fontSize: 22,
    backgroundColor: "white",
  },

  date: {
    textTransform: "uppercase",
    fontSize: 18,
    color: "white",
    paddingBottom: 2,
  },

  showings: {
    fontWeight: "bold",
    color: "white",
    fontSize: 25,
    paddingTop: 2,
  },

  showing: {
    backgroundColor: "#C32528",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
    padding: 10,
  },

  time: {
    color: "white",
    fontWeight: "bold",
  },

  seats: {
    color: "white",
  },

  prices: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },

  original: {
    color: "#C32528",
    textDecorationLine: "line-through",
    fontWeight: "bold",
    fontSize: 13,
  },

  discount: {
    marginLeft: 7,
    fontWeight: "bold",
    fontSize: 13,
  },

  backBtn: {
    color: "#C32528",
    fontWeight: "bold",
    fontSize: 14,
    right: 10,
  },
});
