import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Entypo,
  FontAwesome,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import {
  useFonts,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { commonStyles } from "@/styles/common/common.styles";
import { router } from "expo-router";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_USER } from "@/graphql/queries/user.query";
import { Toast } from "react-native-toast-notifications";

export default function LoginScreen() {
  let [fontsLoaded, fontError] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Raleway_600SemiBold,
    Raleway_700Bold,
  });

  const [loginQuery, { loading, error, data }] = useLazyQuery(LOGIN_USER, {
    onError: (error) => {
      console.error("ApolloError: ", error.message);
      Toast.show(error.message, {
        type: "danger",
        placement: "top",
        duration: 5000,
        animationType: "zoom-in",
      });
    },
    onCompleted: (data) => {
      Toast.show(`Bem-vindo(a) ${data.loginUser.name}.`, {
        type: "success",
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
      });
      console.log("Login Successful: ", data);
    },
  });

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [required, setRequired] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    password: "",
    email: "",
    submitError: error,
  });

  const handlePasswordValidation = (value: string) => {
    const password = value;
    const passwordOneNumber = /(?=.*[0-9])/;
    const passwordSixValue = /(?=.{6,})/;

    if (!passwordOneNumber.test(password)) {
      setErrorMessages({
        ...errorMessages,
        password: "Write at least one number",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!passwordSixValue.test(password)) {
      setErrorMessages({
        ...errorMessages,
        password: "Write at least 6 characters",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else {
      setErrorMessages({
        ...errorMessages,
        password: "",
      });
      setUserInfo({ ...userInfo, password: password });
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

  const handleSignIn = () => {
    if (!userInfo.email || !userInfo.password) {
      setRequired("Please fill in all fields.");
      return;
    }

    setRequired("");
    setButtonSpinner(true);

    loginQuery({
      variables: {
        email: userInfo.email,
        password: userInfo.password,
      },
    }).finally(() => {
      setButtonSpinner(false);
      router.push("/");
    });
  };

  if (!fontsLoaded && !fontError) return null;

  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingTop: 20 }}
    >
      <ScrollView>
        <Image
          style={styles.signInImage}
          source={require("@/assets/sign-in/sign_in.png")}
        />
        <Text style={[styles.welcomeText, { fontFamily: "Raleway_700Bold" }]}>
          Welcome Back!
        </Text>
        <Text style={styles.learningText}>
          Login to your existing account of Becodemy
        </Text>
        <View style={styles.inputContainer}>
          <View style={{ marginBottom: 10 }}>
            <TextInput
              style={[
                styles.input,
                { paddingLeft: 40 } && errorMessages.email
                  ? { marginBottom: 15 }
                  : { marginBottom: 0 },
              ]}
              keyboardType="email-address"
              value={userInfo.email}
              placeholder="email@fulano.com.br"
              onChangeText={handleEmailValidation}
              // onChangeText={(value) =>
              //   setUserInfo({ ...userInfo, email: value })
              // }
            />
            <Fontisto
              style={{ position: "absolute", left: 26, top: 17.8 }}
              name="email"
              size={20}
              color={"#A1A1A1"}
            />
            {errorMessages.email && (
              <View style={commonStyles.errorContainer}>
                <Entypo name="cross" size={18} color={"red"} />
                <Text style={{ color: "red", fontSize: 11, marginTop: -1 }}>
                  {errorMessages.email}
                </Text>
                {/* <Text style={styles.errorText}>
                 */}
              </View>
            )}
            {required && (
              <View style={commonStyles.errorContainer}>
                <Entypo name="cross" size={18} color={"red"} />
                <Text style={{ color: "red", fontSize: 11, marginTop: -1 }}>
                  {required}
                </Text>
              </View>
            )}
            <View style={{ marginTop: 15 }}>
              <TextInput
                style={commonStyles.input}
                keyboardType="default"
                secureTextEntry={!isPasswordVisible}
                placeholder="********"
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
            {errorMessages.password && (
              <View style={[commonStyles.errorContainer, { top: 145 }]}>
                <Entypo name="cross" size={18} color={"red"} />
                <Text style={{ color: "red", fontSize: 11, marginTop: -1 }}>
                  {errorMessages.password}
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={() => router.push("/(routes)/forgot-password")}
          >
            <Text
              style={[
                styles.forgotSection,
                { fontFamily: "Nunito_600SemiBold" },
              ]}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 16,
              borderRadius: 8,
              marginHorizontal: 16,
              backgroundColor: "#2467EC",
            }}
            onPress={handleSignIn}
          >
            {buttonSpinner ? (
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
                Sign In
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
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => router.push("/(routes)/sign-up")}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Raleway_600SemiBold",
                  color: "#2467EC",
                  marginLeft: 5,
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
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
  },
  signUpRedirect: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "center",
  },
});
