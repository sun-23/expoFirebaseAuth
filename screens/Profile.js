import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image } from "react-native";
import firebase , { auth , logout } from '../firebase'

export default function Profile({ route, navigation }) {

    const { user } = route.params

    console.log(user);

    //const [user, setUser] = useState({});

    /*useEffect(() => {
        console.log('user id :' + auth.currentUser.uid)
        const unsubscribe = firebase
            .firestore() 
            .collection('users')
            .doc(auth.currentUser.uid)
            .onSnapshot(function(doc) {
                console.log("Current data: ", doc.data());
                setUser(doc.data());
            })
        return () => {
            console.log('unsubscribe collection user')
            unsubscribe()
        }
    },[auth.currentUser.uid])*/

  return (
    <View style={styles.container}>
        <View style={{ marginTop: 64, alignItems: "center" }}>
            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri : user.avatar }}
                    style={styles.avatar}
                />
            </View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
        </View>
        <Button
            onPress={async () => {
                await logout();
            }}
            title="Log out"
        />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profile: {
        marginTop: 64,
        alignItems: "center"
    },
    avatarContainer: {
        shadowColor: "#151734",
        shadowRadius: 30,
        shadowOpacity: 0.4
    },
    avatar: {
        width: 136,
        height: 136,
        borderRadius: 68
    },
    name: {
        marginTop: 24,
        fontSize: 16,
        fontWeight: "600"
    },
    email: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "300"
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 32
    },
    stat: {
        alignItems: "center",
        flex: 1
    },
    statAmount: {
        color: "#4F566D",
        fontSize: 18,
        fontWeight: "300"
    },
    statTitle: {
        color: "#C3C5CD",
        fontSize: 12,
        fontWeight: "500",
        marginTop: 4
    }
});
