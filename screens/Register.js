import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    TextInput, 
    View, 
    TouchableOpacity, 
    Image, 
    StatusBar 
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import firebase, { uploadImage, registerWithEmail, auth } from '../firebase';

export default function Register({navigation}) {

    const [user,setUser] = useState({
        name: '',
        email: '',
        password: '',
        uri: '',
    })

    const handleSignUp = async () => {
        try {
            await registerWithEmail(user.email, user.password);
        } catch (error) {
            alert(error.message);
        }
        console.log(auth.currentUser.uid)
        await uploadImage(user.uri, `avatars/${auth.currentUser.uid}`,(uri) => {
            console.log('remoteUri' + uri)
            firebase.firestore().collection('users').doc(auth.currentUser.uid).set(
                {
                avatar: uri,
                },
                { merge: true 
                }).then(() => {
                console.log('hello update uri ok')
                setUser({}) // clear user
            }).catch((err) => {
                alert('err' + err)
            })
        })

        firebase.firestore().collection('users').doc(auth.currentUser.uid).set({
            name: user.name,
            email: user.email,
            uid: auth.currentUser.uid,
        }).then(() => {
            console.log('hello create user ok')
        }).catch((err) => {
            alert('err' + err)
        })
    }

    const handlePickAvatar = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }
        setUser({ ...user, uri: pickerResult.uri });
    }

  return (
    <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <View style={{ alignItems: "center", width: "100%" }}>
            <TouchableOpacity style={styles.avatarPlaceholder} onPress={handlePickAvatar}>
                <Image source={{ uri: user.uri }} style={styles.avatar} />
                <Ionicons
                    name="ios-add"
                    size={40}
                    color="#FFF"
                    style={{ marginTop: 6, marginLeft: 2 }}
                ></Ionicons>
            </TouchableOpacity>
        </View>
        <View style={styles.form}>
                <View style={{ marginTop: 32 }}>
                    <Text style={styles.inputTitle}>Name</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        onChangeText={name => setUser({...user, name: name})}
                        value={user.name}
                    ></TextInput>
                </View>
            <View style={{ marginTop: 32 }}>
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
                        autoCapitalize="none"
                        onChangeText={password => setUser({...user, password: password})}
                        value={user.password}
                    ></TextInput>
                </View>
        </View>

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ alignSelf: "center", marginTop: 32 }}
                onPress={() => navigation.goBack()}
            >
                <Text style={{ color: "#414959", fontSize: 13 }}>
                Already have an account? <Text style={{ fontWeight: "500", color: "#E9446A" }}>Sign In</Text>
                </Text>
            </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffdf9',
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
    avatarPlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: "#E1E2E6",
        borderRadius: 50,
        marginTop: 48,
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50
    }
});
