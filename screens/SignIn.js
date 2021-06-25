import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from "react-native";
import { loginWithEmail } from "../firebase";

export default function SignIn({ navigation }) {

    const [ user,setUser ] = useState({
        email: '',
        password: ''
    });

    const handleSignIn = async () => {
        await loginWithEmail(user.email, user.password);
    }

  return (
    <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <Text style={styles.greeting}>{`Hello again.\nWelcome back.`}</Text>
        <View style={styles.form}>
            <View>
                <Text style={styles.inputTitle}>Email Address</Text>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={email => setUser({...user, email: email})}
                    value={user.email}
                ></TextInput>
            </View>
                <View style={{ marginTop: 32 }}>
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        autoCapitalize="none"
                        onChangeText={password => setUser({...user, password: password})}
                        value={user.password}
                    ></TextInput>
                </View>
        </View>

            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ alignSelf: "center", marginTop: 32 }}
                onPress={() => navigation.navigate("Register")}
            >
                <Text style={{ color: "#414959", fontSize: 13 }}>
                    New to SocialApp? <Text style={{ fontWeight: "500", color: "#E9446A" }}>Sign up</Text>
                </Text>
            </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffdf9'
    },
    greeting: {
        marginTop: 64,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    form: {
        marginTop: 30,
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: 1,//StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
});
