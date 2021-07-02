import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";
import Login from "./Login";
import SignUp from "./SignUp";

export default function LoginDisplay() {
  const [page, setPage] = useState(0);

  return (
    <View style={styles.layout}>
      <Text style={styles.brandName}>CINESAVE</Text>
      {page === 0 && (
        <TouchableOpacity
          style={styles.loginContainer}
          onPress={() => {
            setPage(1);
          }}
        >
          <Text style={styles.login}>LOGIN</Text>
        </TouchableOpacity>
      )}
      {page === 0 && (
        <Text style={styles.signupOne}>
          Not a member yet?{" "}
          <Text
            style={styles.signupTwo}
            onPress={() => {
              setPage(2);
            }}
          >
            Sign up for free!
          </Text>
        </Text>
      )}
      {page === 1 && <Login />}
      {page === 1 && (
        <Button title="return" onPress={() => setPage(0)}></Button>
      )}
      {page === 2 && <SignUp />}
      {page === 2 && (
        <Button title="return" onPress={() => setPage(0)}></Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: "#C32528",
    flex: 1,
    alignItems: "center",
    width: "100%",
  },

  brandName: {
    color: "white",
    fontSize: 60,
    marginTop: 120,
    marginBottom: 20,
    fontWeight: "bold",
  },

  loginContainer: {
    backgroundColor: "white",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: "50%",
    borderRadius: 50,
  },

  login: {
    color: "#C32528",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },

  signupOne: {
    color: "white",
    fontSize: 15,
    marginTop: 40,
  },

  signupTwo: {
    textDecorationLine: "underline",
  },
});
