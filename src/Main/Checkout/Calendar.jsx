import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CheckoutContext } from "../../CheckoutProvider";

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

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export default function Calendar({ scroll }) {
  const [activeDate, setActiveDate] = useState(new Date());
  const [rows, setRows] = useState([]);
  const [change, setChange] = useState(1);
  const { width: windowWidth } = useWindowDimensions();
  const { info, setMovieDate } = useContext(CheckoutContext);

  function generateMatrix() {
    var matrix = [];
    matrix[0] = weekDays;
    var year = activeDate.getFullYear();
    var month = activeDate.getMonth();
    var firstDay = new Date(year, month, 1).getDay();
    var maxDays = nDays[month];
    if (month == 1) {
      // February
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }
    var counter = 1;
    for (var row = 1; row < 7; row++) {
      matrix[row] = [];
      for (var col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row == 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          matrix[row][col] = counter++;
        }
      }
    }
    return matrix;
  }

  function changeMonth(n) {
    activeDate.setMonth(activeDate.getMonth() + n);
    setChange(change * -1);
  }

  useEffect(() => {
    const calendar = generateMatrix();
    const r = calendar.map((row, rowIndex) => {
      var rowItems = row.map((item, colIndex) => {
        var currDate = new Date();
        var copiedDate = new Date(activeDate);
        copiedDate.setDate(item);
        currDate.setHours(0, 0, 0, 0);
        return (
          <Text
            key={colIndex}
            style={[
              rowIndex == 0 && styles.day,
              rowIndex > 0 && styles.date,
              item === -1 && { opacity: 0.1 },
              copiedDate.getTime() <= currDate.getTime() && { opacity: 0.1 },
            ]}
            onPress={() => {
              if (copiedDate.getTime() > currDate.getTime()) {
                scroll(windowWidth);
                setMovieDate(copiedDate);
              }
            }}
          >
            {item != -1 ? item : ""}
          </Text>
        );
      });
      return rowItems.every((item) => {
        return item.props.style[2];
      }) ? null : (
        <View
          key={rowIndex}
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          {rowItems}
        </View>
      );
    });
    setRows(r);
  }, [change]);

  return (
    <View>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={[styles.showingsHeader]}>SHOWINGS FOR</Text>
        <Text style={[styles.movie]}>{info.title}</Text>
        <Text style={[styles.select]}>Tap on a date to choose.</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 35,
          justifyContent: "center",
          marginTop: 30,
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => {
            changeMonth(-1);
          }}
        >
          <Ionicons name="chevron-back-outline" size={30} color="#C32528" />
        </Pressable>
        <Text style={[styles.month]}>{months[activeDate.getMonth()]}</Text>
        <Pressable
          onPress={() => {
            changeMonth(1);
          }}
        >
          <Ionicons name="chevron-forward-outline" size={30} color="#C32528" />
        </Pressable>
      </View>
      {rows}
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

  month: {
    fontWeight: "bold",
    color: "#C32528",
    textAlign: "center",
    fontSize: 20,
    textTransform: "uppercase",
    marginHorizontal: 20,
  },

  day: {
    flex: 1,
    height: 18,
    textAlign: "center",
    color: "#C32528",
    textTransform: "uppercase",
    fontSize: 16,
  },

  date: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#C32528",
    height: 40,
    width: 40,
    fontSize: 22,
    paddingTop: 7,
    borderRadius: 20,
    overflow: "hidden",
  },
});
