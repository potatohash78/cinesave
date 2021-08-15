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
import { PurchaseContext } from "../../PurchaseProvider";
import { UserContext } from "../../UserProvider";
import { SettingsContext } from "../../SettingsProvider";

export default function Checkout({ visible, setVisible }) {
  const scroll = useRef();
  const secondScroll = useRef();
  const { width: windowWidth } = useWindowDimensions();
  const [purchased, setPurchased] = useState(false);
  const { page, poster, info, date } = useContext(CheckoutContext);
  const { purchases } = useContext(PurchaseContext);
  const { user } = useContext(UserContext);
  const { settings } = useContext(SettingsContext);

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
        <ScrollView
          style={{
            position: "absolute",
            backgroundColor: "rgba(255,255,255,0.95)",
            height: "100%",
            width: "100%",
          }}
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          ref={secondScroll}
        >
          <View
            style={[
              {
                backgroundColor: "#C32528",
                alignItems: "center",
                height: "70%",
                width: windowWidth,
                alignSelf: "center",
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
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <TouchableOpacity
                style={[styles.closeBtn]}
                onPress={() => {
                  secondScroll.current.scrollTo({ x: windowWidth * 2 });
                }}
              >
                <Text
                  style={[
                    { color: "#C32528", fontWeight: "bold", fontSize: 20 },
                  ]}
                >
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              {
                backgroundColor: "#C32528",
                alignItems: "center",
                height: "70%",
                width: windowWidth,
                alignSelf: "center",
              },
            ]}
          >
            <Text
              style={[
                {
                  color: "white",
                  fontSize: 28,
                  textAlign: "center",
                  marginTop: 40,
                  marginHorizontal: 30,
                  width: "95%",
                },
              ]}
            >
              YOU ARE CURRENTLY
            </Text>
            <Text
              style={[
                {
                  color: "white",
                  fontSize: 28,
                  textAlign: "center",
                  marginTop: 5,
                  marginHorizontal: 30,
                  fontWeight: "bold",
                },
              ]}
            >
              {2} MOVIES
            </Text>
            <Text
              style={[
                {
                  color: "white",
                  fontSize: 28,
                  textAlign: "center",
                  marginTop: 5,
                  marginHorizontal: 30,
                  width: "95%",
                },
              ]}
            >
              AWAY FROM YOUR NEXT REWARD!
            </Text>
            <View
              style={[
                styles.rewardsBar,
                settings.darkMode && darkStyles.rewardsBar,
              ]}
            >
              {purchases
                .slice(-1 * (3 - user.nextReward))
                .map((purchase, index) => (
                  <Image
                    key={index}
                    source={{ uri: purchase.poster }}
                    style={{
                      width: windowWidth / 4,
                      height: "100%",
                      opacity: 0.5,
                    }}
                  />
                ))}
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <TouchableOpacity
                style={[styles.closeBtn]}
                onPress={() => {
                  setVisible(false);
                }}
              >
                <Text
                  style={[
                    { color: "#C32528", fontWeight: "bold", fontSize: 20 },
                  ]}
                >
                  CLOSE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
    marginBottom: 40,
  },

  rewardsBar: {
    backgroundColor: "white",
    height: 85,
    marginTop: 35,
    width: "75%",
    borderRadius: 100,
    alignSelf: "center",
    flexDirection: "row",
    overflow: "hidden",
    marginBottom: 8,
  },
});
