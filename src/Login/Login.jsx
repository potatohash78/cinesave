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
      <TouchableOpacity style={styles.googleContainer}>
        <Text style={styles.googleLogin}>Login using</Text>
        <Image source={googleImage} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
  },

  loginContainer: {
    backgroundColor: "white",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 45,
    borderRadius: 50,
  },

  login: {
    color: "#C32528",
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
    marginTop: 80,
    borderRadius: 50,
    flexDirection: "row",
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
