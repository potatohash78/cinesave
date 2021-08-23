import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { firestore, auth } from "../../firebase";
import { UserContext } from "../UserProvider";
import { PurchaseContext } from "../PurchaseProvider";

const googleImage = require("../../assets/Google.png");

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const { setLoggedIn } = useContext(PurchaseContext);

  async function handleLogin() {
    const query = await firestore
      .collection("users")
      .where("username", "==", username)
      .get();
    const currUser = query.docs[0].data();
    const email = currUser.email;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setUser(currUser);
      setLoggedIn(true);
      props.nav.replace("Main", { screen: "Home" });
    } catch (error) {
      console.error("Error logging in user", error);
      setUsername("");
      setPassword("");
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.field}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.field}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.loginContainer} onPress={handleLogin}>
        <Text style={styles.login}>LOGIN</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <TouchableOpacity style={styles.googleContainer}>
          <Text style={styles.googleLogin}>Login using</Text>
          <Image source={googleImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flex: 1,
  },

  field: {
    backgroundColor: "white",
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 50,
    marginTop: 30,
    paddingVertical: 8,
    paddingHorizontal: 20,
    width: 300,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    borderWidth: 1,
    borderColor: "#C4C4C4",
  },

  loginContainer: {
    backgroundColor: "#C32528",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 62,
    paddingRight: 62,
    marginTop: 45,
    borderRadius: 50,
  },

  login: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },

  googleContainer: {
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 50,
    flexDirection: "row",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    borderWidth: 1,
    borderColor: "#C4C4C4",
  },

  googleLogin: {
    padding: 0,
    color: "#BCBCBC",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 5,
  },
});
