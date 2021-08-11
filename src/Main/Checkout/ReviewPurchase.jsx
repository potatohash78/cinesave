import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CheckoutContext } from "../../CheckoutProvider";

const line = require("../../../assets/line.png");

export default function ReviewPurchase({ scroll, setPurchased }) {
  const { width: windowWidth } = useWindowDimensions();
  const { poster, date, info, currSeat, concessions } =
    useContext(CheckoutContext);

  return currSeat ? (
    <View style={{ flex: 1, width: "100%" }}>
      <Text style={[styles.header]}>REVIEW PURCHASE</Text>
      <View style={{ marginTop: 10, width: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            paddingHorizontal: 10,
          }}
        >
          <Image
            source={{ uri: poster }}
            style={{ width: "15%", aspectRatio: 27 / 40 }}
          />
          <View
            style={{
              alignItems: "flex-end",
              width: "85%",
            }}
          >
            <TouchableOpacity style={[styles.editTime]}>
              <Text
                style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
              >
                EDIT
              </Text>
            </TouchableOpacity>
            <Text style={[styles.title]}>{info.title}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View style={{ width: "82%" }}>
            <Text style={[styles.movieInfo]}>{info.theater_name}</Text>
            <Text style={[styles.movieInfo]}>
              {date.toLocaleString("default", { weekday: "long" })}
              {", "}
              {date.toLocaleString("default", {
                month: "long",
              })}{" "}
              {date.getDate()}
              {"  "}|{"  "}
              {date.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
              {"  "}|{"  "}
              {(currSeat[0] + 10).toString(36)}
              {currSeat[1] + 1}
            </Text>
          </View>
          <View
            style={{
              width: "18%",
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={[
                styles.movieInfo,
                { fontSize: 18, textAlign: "right", marginRight: 10 },
              ]}
            >
              ${info.discounted_price}
            </Text>
          </View>
        </View>
      </View>
      <Image
        source={line}
        style={{ width: "95%", alignSelf: "center", marginVertical: 20 }}
      />
      <View style={{ width: "100%" }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          <Text style={[styles.concessions]}>CONCESSIONS</Text>
          <TouchableOpacity style={[styles.editTime]}>
            <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
              EDIT
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          {concessions.length ? (
            concessions.map((item, index) => (
              <Text key={index}>{item.name}</Text>
            ))
          ) : (
            <Text
              style={[
                {
                  color: "#C32528",
                  marginTop: 10,
                  marginLeft: 10,
                  fontWeight: "bold",
                },
              ]}
            >
              You do not have any concessions in your cart.
            </Text>
          )}
        </View>
      </View>
      <Image
        source={line}
        style={{ width: "95%", alignSelf: "center", marginVertical: 20 }}
      />
      <View style={{ width: "100%" }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={[{ fontWeight: "bold", fontSize: 20, color: "#C32528" }]}
          >
            TOTAL
          </Text>
          <Text
            style={[{ fontWeight: "bold", fontSize: 18, color: "#C32528" }]}
          >
            $
            {(
              info.discounted_price +
              concessions
                .map((item) => item.qty * item.price)
                .reduce((a, b) => a + b, 0)
            ).toFixed(2)}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.buyBtn]}
        onPress={() => {
          // Add in confirmation that the user has purchased the ticket.
          setPurchased(true);
        }}
      >
        <Text style={[{ color: "white", fontWeight: "bold", fontSize: 20 }]}>
          BUY NOW
        </Text>
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => {
            scroll(windowWidth * 2);
          }}
        >
          <Ionicons name="chevron-back-sharp" size={50} color="#C32528" />
          <Text style={[styles.backBtn]}>BACK</Text>
        </Pressable>
      </View>
      <SafeAreaView style={{ flex: 0, backgroundColor: "white" }} />
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#C32528",
    marginLeft: 10,
  },

  editTime: {
    textAlign: "center",
    backgroundColor: "#C32528",
    borderRadius: 50,
    paddingVertical: 3,
    paddingHorizontal: 25,
  },

  title: {
    color: "#C32528",
    fontSize: 20,
    textTransform: "uppercase",
    textAlign: "left",
    width: "100%",
    paddingLeft: 10,
    marginTop: 10,
  },

  movieInfo: {
    color: "#C32528",
    textTransform: "uppercase",
    marginLeft: 10,
    fontSize: 14,
  },

  concessions: {
    fontSize: 20,
    color: "#C32528",
  },

  buyBtn: {
    textAlign: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 50,
    alignSelf: "center",
    backgroundColor: "#C32528",
    marginTop: 50,
  },

  backBtn: {
    color: "#C32528",
    fontWeight: "bold",
    fontSize: 14,
    right: 10,
  },
});
