import React, { useRef, useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import { Overlay } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import Calendar from "./Calendar";
import Showings from "./Showings";
import Seats from "./Seats";
import ReviewPurchase from "./ReviewPurchase";
import { CheckoutContext } from "../../CheckoutProvider";

export default function Checkout({ visible, setVisible }) {
  const scroll = useRef();
  const { width: windowWidth } = useWindowDimensions();
  const [purchased, setPurchased] = useState(false);
  const { page, poster, info, date } = useContext(CheckoutContext);

  useEffect(() => {
    setPurchased(false);
  }, [visible]);

  function scrollScreen(n) {
    scroll.current.scrollTo({ x: n });
  }

  return (
    <Overlay
      isVisible={visible}
      fullScreen={true}
      overlayStyle={[{ padding: 0, alignItems: "flex-end" }]}
    >
      <SafeAreaView style={{ flex: 0, backgroundColor: "white" }} />
      <Pressable
        onPress={() => {
          setVisible(false);
        }}
      >
        <Ionicons name="close-outline" size={60} color="#C32528" />
      </Pressable>
      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        scrollEnabled={false}
        style={{ width: "100%" }}
        ref={scroll}
        contentOffset={{ x: page * windowWidth }}
      >
        <View style={{ width: windowWidth }}>
          <Calendar scroll={scrollScreen} />
        </View>

        <View style={{ width: windowWidth }}>
          <Showings scroll={scrollScreen} />
        </View>

        <View style={{ width: windowWidth }}>
          <Seats scroll={scrollScreen} />
        </View>

        <View style={{ width: windowWidth }}>
          <ReviewPurchase scroll={scrollScreen} setPurchased={setPurchased} />
        </View>
      </ScrollView>
      {purchased && (
        <View
          style={{
            position: "absolute",
            backgroundColor: "rgba(255,255,255,0.95)",
            height: "100%",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <View
            style={[
              {
                backgroundColor: "#C32528",
                alignItems: "center",
                height: "70%",
              },
            ]}
          >
            <Text
              style={[
                {
                  color: "white",
                  fontSize: 35,
                  textAlign: "center",
                  marginTop: 40,
                  marginHorizontal: 30,
                },
              ]}
            >
              YOUR TICKET HAS BEEN PURCHASED!
            </Text>
            <Text
              style={[
                {
                  color: "white",
                  textAlign: "center",
                  marginTop: 15,
                },
              ]}
            >
              Enjoy the movie!
            </Text>
            <View style={[styles.moviePreview]}>
              <Image
                source={{ uri: poster }}
                style={{ width: "30%", aspectRatio: 27 / 40 }}
              />
              <View
                style={{
                  justifyContent: "space-between",
                  paddingHorizontal: 15,
                  width: "70%",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    marginBottom: 60,
                    fontSize: 18,
                    width: "100%",
                  }}
                >
                  {info.title}
                </Text>
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      width: "100%",
                    }}
                  >
                    {info.theater_name}
                  </Text>
                  <Text style={{ fontWeight: "bold", marginTop: 3 }}>
                    {date.toLocaleString("default", { weekday: "long" })}
                    {", "}
                    {date.toLocaleString("default", {
                      month: "long",
                    })}{" "}
                    {date.getDate()}
                  </Text>
                  <Text style={{ fontWeight: "bold", marginTop: 3 }}>
                    {date.toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={[{ color: "white" }]}>
              Go to <Text style={{ fontWeight: "bold" }}>MY TICKETS</Text> to
              find your ticket.
            </Text>
            <TouchableOpacity
              style={[styles.closeBtn]}
              onPress={() => {
                setVisible(false);
              }}
            >
              <Text
                style={[{ color: "#C32528", fontWeight: "bold", fontSize: 20 }]}
              >
                CLOSE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Overlay>
  );
}

const styles = StyleSheet.create({
  moviePreview: {
    marginVertical: 30,
    backgroundColor: "#FFFFFFFF",
    width: "95%",
    borderRadius: 12,
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-end",
  },

  closeBtn: {
    backgroundColor: "white",
    paddingHorizontal: 33,
    paddingVertical: 8,
    borderRadius: 50,
    marginTop: 100,
  },
});
