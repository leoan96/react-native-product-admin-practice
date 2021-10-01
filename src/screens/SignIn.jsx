import React, { useContext } from "react";
import { Text, View, TextInput, StyleSheet, Pressable } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import { AuthContext } from "../context/auth/AuthContextProvider";
import { useFonts } from "@use-expo/font";
import { useForm, Controller } from "react-hook-form";

const SignIn = () => {
  const authContext = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    // setError("password", {
    //   type: "manual",
    //   message: "you are just not allowed in :)",
    // });
    authContext.signIn();
  };

  const [isLoaded] = useFonts({
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!isLoaded) {
    return <Text>Font is loading...</Text>;
  }

  return (
    <Background>
      <View
        style={{
          maxWidth: "40%",
          maxHeight: "30%",
        }}
      >
        <Logo />
        <View style={{ marginTop: "20%" }}>
          <Text
            style={{
              fontSize: 40,
              paddingBottom: "20%",
              // fontFamily: "Roboto-Regular",
              fontFamily: "Roboto-Bold",
              color: "darkslateblue",
            }}
          >
            Admin
          </Text>
        </View>
      </View>
      <View>
        <View
          style={{
            paddingBottom: 25,
          }}
        >
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Email is required",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="email"
                  autoCapitalize="none"
                />
              </>
            )}
            name="email"
            defaultValue=""
          />
          {errors.email && (
            <Text style={styles.error}>{errors.email.message}</Text>
          )}
        </View>
        <View
          style={{
            paddingBottom: 25,
          }}
        >
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Password is required",
              },
              validate: (value) =>
                value === getValues("email") || "wrong password",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="password"
                secureTextEntry={true}
                autoCapitalize="none"
              />
            )}
            name="password"
            defaultValue=""
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}
        </View>
        <Pressable style={styles.loginButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.loginText}>Sign In </Text>
        </Pressable>
      </View>
    </Background>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  label: {
    paddingBottom: 10,
    fontSize: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 14,
    width: 250,
    color: "purple",
    fontSize: 18,
  },
  loginButton: {
    borderWidth: 1,
    maxWidth: "40%",
    alignSelf: "center",
    paddingHorizontal: "10%",
    paddingVertical: "3%",
    backgroundColor: "darkslateblue",
    color: "white",
    marginTop: "3%",
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  error: {
    color: "red",
  },
});
