import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  SafeAreaView,
} from "react-native";
import Login from "./Login";
import SignUp from "./SignUp";

export default function LoginDisplay({ navigation }) {
  const [page, setPage] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
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
          <TouchableOpacity
            style={styles.signupContainer}
            onPress={() => {
              setPage(2);
            }}
          >
            <Text style={styles.login}>SIGN UP</Text>
          </TouchableOpacity>
        )}
        {page === 1 && <Login nav={navigation} />}
        {page === 1 && (
          <Button title="return" onPress={() => setPage(0)}></Button>
        )}
        {page === 2 && <SignUp nav={navigation} />}
        {page === 2 && (
          <Button title="return" onPress={() => setPage(0)}></Button>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    width: "100%",
  },

  brandName: {
    color: "#C32528",
    fontSize: 60,
    marginTop: 80,
    marginBottom: 20,
    fontWeight: "bold",
  },

  loginContainer: {
    backgroundColor: "#C32528",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 62,
    paddingRight: 62,
    marginTop: 180,
    borderRadius: 50,
  },

  login: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },

  signupContainer: {
    backgroundColor: "#C32528",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 50,
    marginTop: 20,
  },
});
