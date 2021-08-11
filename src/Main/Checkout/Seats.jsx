import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  useWindowDimensions,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import { CheckoutContext } from "../../CheckoutProvider";
import Seat from "./Seat";

const imagePath = require("../../../assets/screen.png");

export default function Seats({ scroll }) {
  const { width: windowWidth } = useWindowDimensions();
  const { date, currSeat, setSeat } = useContext(CheckoutContext);
  const [scale, setScale] = useState(new Animated.Value(1));
  const [zoom, setZoom] = useState(1);
  const [change, setChange] = useState(1);
  const [seats, setSeats] = useState(generateMatrix());
  scale.addListener(({ value }) => setZoom(value));

  function generateMatrix() {
    var matrix = [];
    for (let i = 0; i < 8; i++) {
      matrix[i] = [];
      for (let j = 0; j < 20; j++) {
        matrix[i][j] = <Seat key={[i, j]} seat={[i, j]} />;
      }
    }
    return matrix;
  }

  useEffect(() => {
    setSeat();
    setScale(new Animated.Value(1));
  }, [change]);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={[styles.dateTime]}>
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
        </Text>
        <Text style={[styles.instructions]}>
          Pinch to zoom and drag to find your desired seat.
        </Text>
        <View style={{ marginTop: 20, marginLeft: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={[styles.available]} />
            <Text style={[styles.instructionsText]}>Available</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={[styles.selected]} />
            <Text style={[styles.instructionsText]}>Selected</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={[styles.unavailable]} />
            <Text style={[styles.instructionsText]}>Unavailable</Text>
          </View>
        </View>

        <Image
          source={imagePath}
          style={{ width: "92%", alignSelf: "center", marginTop: 25 }}
        />
        <Text style={[styles.screen]}>SCREEN</Text>
        <View
          style={{
            width: "100%",
            height: 150,
            overflow: "hidden",
            marginTop: 15,
          }}
        >
          <PinchGestureHandler
            onGestureEvent={Animated.event(
              [
                {
                  nativeEvent: {
                    scale: scale,
                  },
                },
              ],
              {
                useNativeDriver: true,
              }
            )}
            onHandlerStateChange={(e) => {
              if (e.nativeEvent.oldState === State.ACTIVE) {
                if (zoom < 1) {
                  Animated.spring(scale, {
                    toValue: 1,
                    useNativeDriver: true,
                  }).start();
                }
              }
            }}
          >
            <Animated.View
              style={{
                width: "100%",
                flex: 1,
                transform: [{ scale: scale }],
                justifyContent: "space-between",
              }}
            >
              {seats.map((row, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                  }}
                >
                  {row.map((seat) => seat)}
                </View>
              ))}
            </Animated.View>
          </PinchGestureHandler>
        </View>
        <View style={[styles.seatContainer]}>
          <Text style={[styles.seatText]}>YOUR SEAT</Text>
          {currSeat && (
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flex: 1,
                marginTop: 5,
              }}
            >
              <TouchableOpacity
                style={[styles.seatBtn]}
                onPress={() => {
                  setSeat();
                }}
              >
                <Text style={[styles.selectedSeat]}>
                  {(currSeat[0] + 10).toString(36)}
                  {currSeat[1] + 1}
                </Text>
                <Ionicons name="close" color="#C32528" size={18} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmBtn]}
                onPress={() => {
                  scroll(windowWidth * 3);
                }}
              >
                <Text style={[styles.confirm]}>CONFIRM</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => {
            setChange(change * -1);
            scroll(windowWidth);
          }}
        >
          <Ionicons name="chevron-back-sharp" size={50} color="#C32528" />
          <Text style={[styles.backBtn]}>BACK</Text>
        </Pressable>
      </View>
      <SafeAreaView style={{ flex: 0, backgroundColor: "white" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  dateTime: {
    textTransform: "uppercase",
    fontSize: 21,
    color: "#C32528",
    marginLeft: 15,
  },

  instructions: {
    color: "#C32528",
    marginHorizontal: 15,
    marginTop: 20,
    fontSize: 16,
  },

  available: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#C32528",
    opacity: 0.1,
  },

  instructionsText: {
    marginLeft: 5,
    color: "#C32528",
  },

  selected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#C32528",
  },

  unavailable: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E4E4E4",
  },

  screen: {
    color: "#C32528",
    width: "100%",
    textAlign: "center",
    fontSize: 17,
    bottom: 15,
  },

  backBtn: {
    color: "#C32528",
    fontWeight: "bold",
    fontSize: 14,
    right: 10,
  },

  seatContainer: {
    width: "100%",
    height: 150,
    backgroundColor: "#C32528",
    paddingTop: 10,
    paddingLeft: 20,
    marginTop: 50,
    alignItems: "flex-start",
  },

  seatText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 25,
  },

  seatBtn: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 50,
    alignItems: "center",
  },

  selectedSeat: {
    color: "#C32528",
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  confirmBtn: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
  },

  confirm: {
    color: "#C32528",
    fontWeight: "bold",
    fontSize: 18,
  },
});
