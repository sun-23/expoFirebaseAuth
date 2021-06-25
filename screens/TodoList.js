import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import firebase , { auth } from '../firebase'

export default function Profile({ navigation }) {

    const [todoArray, setTodoArray] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        console.log('user id :' + auth.currentUser.uid)
        const unsubscribeTodo = firebase
        .firestore() 
        .collection('todo')
        .doc(auth.currentUser.uid)
        .collection('data')
        .orderBy('date', 'desc')
        .limit(10)
        .onSnapshot((querySnapshot) => {
            var todos = [];
            querySnapshot.forEach(function(doc) {
                todos.push({data: doc.data(), "id": doc.id});
            });
            console.log("todo array", todos);
            setTodoArray(todos);
        });
        const unsubscribeUser = firebase
            .firestore() 
            .collection('users')
            .doc(auth.currentUser.uid)
            .onSnapshot(function(doc) {
                console.log("Current data: ", doc.data());
                setUser(doc.data());
            })

        return () => {
            console.log('unsubscribe collection todo')
            console.log('unsubscribe user')
            unsubscribeTodo()
            unsubscribeUser()
        }
    },[])

    const gotoProfile = () => {
        navigation.navigate('Profile', {
            user: user
        });
    }

    const goTodo = () => {
        navigation.navigate('Add');
    }

    const onDelete = (id) => {
        console.log('done id', id);
        firebase.firestore()
            .collection('todo')
            .doc(auth.currentUser.uid)
            .collection('data')
            .doc(id)
            .delete()
            .then(() => {
                alert('delete task success', id)
            }).catch(() => {
                alert('delete task error')
            })
        setTodoArray([])
    }

  return (
    <View style={styles.container}>
        <Button onPress={gotoProfile} title='Profile' />
        <Button onPress={goTodo} title='AddTodo' />

        <ScrollView style={{ marginTop : 20}}>
        {todoArray.map((object,i) => {
            return (
                <View style={styles.card} key={i}>
                    <Text style={styles.cardtext}>{object.data.title}</Text>
                    <Button onPress={() => onDelete(object.id)} title="Done"/>
                </View>
            )
        })}
        </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffdf9'
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
    card: {
        height: 80,
        width: '100%',
        borderRadius: 2,
        borderColor: "#CCC",
        borderWidth: 1,
        shadowOffset: {
            height: 2,
            width: -2,
          },
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        alignItems: "center",
        justifyContent: "center",
    },
    cardtext: {
        color: "#000",
        fontSize: 24,
    },
});
