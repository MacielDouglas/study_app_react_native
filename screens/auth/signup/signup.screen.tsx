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
} from "react-native";
import {
  Fontisto,
  Ionicons,
  SimpleLineIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { ApolloError, useMutation } from "@apollo/client";
import { NEW_USER } from "@/graphql/mutation/user.mutation";
import { router } from "expo-router";
import { Toast } from "react-native-toast-notifications";
import { commonStyles } from "@/styles/common/common.styles";

export default function SignUpScreen() {
  const [newUser, { loading, error }] = useMutation(NEW_USER);
  const [fontsLoaded] = useFonts({ Nunito_400Regular, Raleway_700Bold });
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    profilePicture: "https://cdn-icons-png.flaticon.com/512/9187/9187604.png",
  });
  const [errorMessages, setErrorMessages] = useState({
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
      setErrorMessages({
        ...errorMessages,
        password: "Digite pelo menos um caractere especial ! @ # $ & *",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!passwordOneNumber.test(password)) {
      setErrorMessages({
        ...errorMessages,
        password: "Digite pelo menos um número",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!passwordSixValue.test(password)) {
      setErrorMessages({
        ...errorMessages,
        password: "Digite pelo menos 6 caracteres",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else {
      setErrorMessages({
        ...errorMessages,
        password: "",
      });
      setUserInfo({ ...userInfo, password });
    }
  };

  const handleEmailValidation = (value: string) => {
    const email = value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrorMessages({
        ...errorMessages,
        email: "Insira um email válido, por exemplo: email@email.com",
      });
    } else {
      setErrorMessages({
        ...errorMessages,
        email: "",
      });
    }
    setUserInfo({ ...userInfo, email: email.toLowerCase() });
  };

  const handleSignIn = async () => {
    try {
      const username =
        userInfo.email.toLowerCase().split("@")[0] +
        Math.floor(Math.random() * 9000);
      const updatedUserInfo = { ...userInfo, username };
      setUserInfo(updatedUserInfo);

      await newUser({
        variables: {
          user: updatedUserInfo,
        },
      });

      Toast.show(
        `Bem-vindo(a) ${updatedUserInfo.name}, faça login para começar.`,
        {
          type: "success",
          placement: "top",
          duration: 4000,
          animationType: "slide-in",
        }
      );
      setUserInfo({
        name: "",
        email: "",
        password: "",
        username: "",
        profilePicture: "",
      });

      router.push("/login");
    } catch (error: ApolloError | any) {
      Toast.show(error.graphQLErrors[0].message, {
        type: "danger",
        placement: "top",
        duration: 5000,
        animationType: "zoom-in",
      });
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
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Image
            style={styles.signInImage}
            source={require("@/assets/sign-up/sign-up.png")}
          />
          <Text style={[styles.welcomeText, { fontFamily: "Raleway_700Bold" }]}>
            Vamos começar!
          </Text>
          <Text style={styles.learningText}>
            Crie uma conta no Becodemy para acessar todas as funcionalidades.
          </Text>
          <View style={styles.inputContainer}>
            <View style={{ marginBottom: 20 }}>
              <TextInput
                style={[styles.input, { paddingLeft: 45, marginBottom: -12 }]}
                keyboardType="default"
                value={userInfo.name}
                placeholder="Seu nome"
                placeholderTextColor="#a9a9a9"
                onChangeText={(value) =>
                  setUserInfo({ ...userInfo, name: value })
                }
              />
              <FontAwesome
                style={styles.icon}
                name="user"
                size={20}
                color={"#A1A1A1"}
              />
            </View>
            <View
              style={
                errorMessages.email ? { marginBottom: 15 } : { marginBottom: 0 }
              }
            >
              <TextInput
                style={[styles.input, { paddingLeft: 45 }]}
                keyboardType="email-address"
                value={userInfo.email}
                autoCapitalize="none"
                placeholder="Seu email"
                placeholderTextColor="#a9a9a9"
                onChangeText={handleEmailValidation}
              />
              <Fontisto
                style={styles.icon}
                name="email"
                size={20}
                color={"#A1A1A1"}
              />
              {errorMessages.email && (
                <View style={commonStyles.errorContainer}>
                  <Entypo name="cross" size={18} color={"red"} />
                  <Text style={styles.errorText}>{errorMessages.email}</Text>
                </View>
              )}
            </View>
            <View>
              <TextInput
                style={[styles.input, { paddingLeft: 45 }]}
                keyboardType="default"
                secureTextEntry={!isPasswordVisible}
                placeholder="********"
                placeholderTextColor="#a9a9a9"
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
                style={styles.icon}
                name="lock"
                size={20}
                color={"#A1A1A1"}
              />
              {errorMessages.password && (
                <View style={commonStyles.errorContainer}>
                  <Entypo name="cross" size={18} color={"red"} />
                  <Text style={styles.errorText}>{errorMessages.password}</Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              style={[
                styles.signUpButton,
                {
                  backgroundColor:
                    errorMessages.password || errorMessages.email
                      ? "#92b2f2"
                      : "#2467EC",
                },
              ]}
              onPress={handleSignIn}
              disabled={
                errorMessages.password !== "" || errorMessages.email !== ""
              }
            >
              {loading ? (
                <ActivityIndicator size="small" color={"white"} />
              ) : (
                <Text style={styles.signUpButtonText}>Criar Conta</Text>
              )}
            </TouchableOpacity>
            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="google" size={30} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="github" size={30} />
              </TouchableOpacity>
            </View>
            <View style={styles.signInRedirect}>
              <Text style={styles.signInRedirectText}>Já tem uma conta?</Text>
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={[styles.signInRedirectText, styles.signInLink]}>
                  Entrar
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
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: 20,
  },
  signInImage: {
    width: "60%",
    height: 250,
    alignSelf: "center",
    marginTop: 50,
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Raleway_700Bold",
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
  },
  input: {
    height: 55,
    marginVertical: 8,
    paddingHorizontal: 45,
    borderRadius: 8,
    backgroundColor: "white",
    color: "#A1A1A1",
    fontSize: 16,
  },
  icon: {
    position: "absolute",
    left: 16,
    top: 25,
  },
  errorText: {
    color: "red",
    fontSize: 11,
    marginTop: -1,
    marginLeft: 5,
  },
  visibleIcon: {
    position: "absolute",
    right: 20,
    top: 25,
  },
  signUpButton: {
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 15,
  },
  signUpButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Raleway_700Bold",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    gap: 10,
  },
  socialButton: {
    paddingHorizontal: 20,
  },
  signInRedirect: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "center",
  },
  signInRedirectText: {
    fontSize: 18,
    fontFamily: "Raleway_600SemiBold",
  },
  signInLink: {
    color: "#2467EC",
    marginLeft: 5,
  },
});
