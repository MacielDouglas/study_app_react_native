import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Fontisto, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { commonStyles } from "@/styles/common/common.styles";
import { useMutation } from "@apollo/client";
import { ApolloError } from "@apollo/client";
import { NEW_USER } from "@/graphql/mutation/user.mutation";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

export default function SignUpScreen() {
  const [newUser, { loading, error }] = useMutation(NEW_USER);

  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Raleway_700Bold,
  });

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    profilePicture: "https://cdn-icons-png.flaticon.com/512/9187/9187604.png",
  });
  const [allErrors, setAllErrors] = useState({
    password: "",
    email: "",
    submitError: error,
  });

  const handlePasswordValidation = (value: string) => {
    const password = value;
    const passwordSpecialCharacters = /(?=.*[!@#$&*])/;
    const passwordOneNumber = /(?=.*[0-9])/;
    const passwordSixValue = /(?=.{6,})/;

    if (!passwordSpecialCharacters.test(password)) {
      setAllErrors({
        ...allErrors,
        password: "Write at least one special character ! @ # $ & *",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!passwordOneNumber.test(password)) {
      setAllErrors({
        ...allErrors,
        password: "Write at least one number",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!passwordSixValue.test(password)) {
      setAllErrors({
        ...allErrors,
        password: "Write at least 6 characters",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else {
      setAllErrors({
        ...allErrors,
        password: "",
      });
      setUserInfo({ ...userInfo, password: password });
    }
  };
  const handleEmailValidation = (value: string) => {
    const email = value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setAllErrors({
        ...allErrors,
        email: "Necessário um email válido, tipo: email@email.com",
      });
    } else {
      setAllErrors({
        ...allErrors,
        email: "",
      });
    }
    setUserInfo({ ...userInfo, email: email.toLowerCase() });
  };

  const handleSignIn = async () => {
    try {
      const username = userInfo.email.toLowerCase().split("@")[0];
      const updatedUserInfo = { ...userInfo, username };
      setUserInfo(updatedUserInfo);

      await newUser({
        variables: {
          user: updatedUserInfo,
        },
      });
      Alert.alert(
        `Seja bem vindo ${updatedUserInfo.name}, faça login para começar.`
      );
      router.push("/(routes)/login");
      // router.push("/(routes)/verifyAccount");
    } catch (error: ApolloError | any) {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        Alert.alert("Error", error.graphQLErrors[0].message);
      } else if (error.networkError) {
        Alert.alert("Error", "Network error. Please try again later.");
      } else {
        Alert.alert("Error", "An error occurred. Please try again later.");
      }
    }
  };

  if (!fontsLoaded) return null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={["#E5ECF9", "#F6F7F9"]}
        style={{ flex: 1, paddingTop: 20 }}
      >
        <ScrollView>
          <Image
            style={styles.signInImage}
            source={require("@/assets/sign-up/sign-up.png")}
          />
          <Text style={[styles.welcomeText, { fontFamily: "Raleway_700Bold" }]}>
            Let's get started!
          </Text>
          <Text style={styles.learningText}>
            Create an account to Becodemy to get all features
          </Text>
          <View style={styles.inputContainer}>
            <View>
              <TextInput
                style={[styles.input, { paddingLeft: 40, marginBottom: -12 }]}
                keyboardType="default"
                value={userInfo.name}
                placeholder="Seu nome"
                placeholderTextColor="#a9a9a9"
                onChangeText={(value) =>
                  setUserInfo({ ...userInfo, name: value })
                }
              />
              <FontAwesome
                style={{ position: "absolute", left: 26, top: 14 }}
                name="user"
                size={20}
                color={"#A1A1A1"}
              />
            </View>
            <View
              style={
                allErrors.email ? { marginBottom: 15 } : { marginBottom: 0 }
              }
            >
              <TextInput
                style={[styles.input, { paddingLeft: 40 }]}
                keyboardType="email-address"
                value={userInfo.email}
                autoCapitalize="none"
                placeholder="Seu email"
                placeholderTextColor="#a9a9a9"
                onChangeText={handleEmailValidation}
              />
              <Fontisto
                style={{ position: "absolute", left: 26, top: 17.8 }}
                name="email"
                size={20}
                color={"#A1A1A1"}
              />
              {allErrors.email && (
                <View style={[commonStyles.errorContainer, { top: 62 }]}>
                  <Entypo name="cross" size={18} color={"red"} />
                  <Text style={{ color: "red", fontSize: 11, marginTop: -1 }}>
                    {allErrors.email}
                  </Text>
                </View>
              )}
            </View>
            <View style={{ marginTop: -10 }}>
              <View>
                <TextInput
                  style={commonStyles.input}
                  keyboardType="default"
                  secureTextEntry={!isPasswordVisible}
                  placeholder="********"
                  placeholderTextColor="#a9a9a9"
                  defaultValue=""
                  onChangeText={handlePasswordValidation}
                />
                <TouchableOpacity
                  style={styles.visibleIcon}
                  onPress={() => setPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <Ionicons
                      name="eye-off-outline"
                      size={23}
                      color={"#747474"}
                    />
                  ) : (
                    <Ionicons name="eye-outline" size={23} color={"#747474"} />
                  )}
                </TouchableOpacity>
                <SimpleLineIcons
                  style={styles.icon2}
                  name="lock"
                  size={20}
                  color={"#A1A1A1"}
                />
              </View>
              {allErrors.password && (
                <View style={[commonStyles.errorContainer, { top: 70 }]}>
                  <Entypo name="cross" size={18} color={"red"} />
                  <Text style={{ color: "red", fontSize: 11, marginTop: -1 }}>
                    {allErrors.password}
                  </Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={{
                padding: 16,
                borderRadius: 8,
                marginHorizontal: 16,
                backgroundColor:
                  allErrors.password || allErrors.email ? "#92b2f2" : "#2467EC",
                marginTop: 15,
              }}
              onPress={handleSignIn}
              disabled={allErrors.password !== "" || allErrors.email !== ""}
            >
              {loading ? (
                <ActivityIndicator size="small" color={"white"} />
              ) : (
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 16,
                    fontFamily: "Raleway_700Bold",
                  }}
                >
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                gap: 10,
              }}
            >
              <TouchableOpacity>
                <FontAwesome name="google" size={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="github" size={30} />
              </TouchableOpacity>
            </View>
            <View style={styles.signUpRedirect}>
              <Text style={{ fontSize: 18, fontFamily: "Raleway_600SemiBold" }}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => router.push("/(routes)/login")}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Raleway_600SemiBold",
                    color: "#2467EC",
                    marginLeft: 5,
                  }}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  signInImage: {
    width: "60%",
    height: 250,
    alignSelf: "center",
    marginTop: 50,
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 24,
  },
  learningText: {
    textAlign: "center",
    color: "#575757",
    fontSize: 15,
    marginTop: 5,
  },
  inputContainer: {
    marginHorizontal: 16,
    marginTop: 30,
    rowGap: 30,
  },
  input: {
    height: 55,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingLeft: 35,
    fontSize: 16,
    backgroundColor: "white",
    color: "#A1A1A1",
  },
  visibleIcon: {
    position: "absolute",
    right: 30,
    top: 15,
  },
  icon2: {
    position: "absolute",
    left: 24,
    top: 17.8,
    marginTop: -2,
  },
  forgotSection: {
    marginHorizontal: 16,
    textAlign: "right",
    fontSize: 16,
    // marginTop: 10,
  },
  signUpRedirect: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "center",
  },
});
