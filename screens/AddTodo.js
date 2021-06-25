import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert } from "react-native";
import firebase , { auth } from '../firebase'

function AddTodo({ navigation }) {

    const [todo, setTodo] = useState('');

    const AddTodo = () => {
        var d = new Date();
        console.log(todo,d)

        if(auth.currentUser.uid){
            firebase
            .firestore() 
            .collection('todo')
            .doc(auth.currentUser.uid)
            .collection('data')
            .add({
                date: d,
                title: todo
            }).then(() => {
                setTodo('')
                Alert.alert('add ok');
            })
            navigation.goBack()
        }else{
            //setUser({});
        }
    }

    const goBack = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <View style={{marginBottom: 30}}>
                    <Text style={styles.inputTitle}>Title</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        onChangeText={text => setTodo(text)}
                        value={todo}
                    ></TextInput>
                </View>
                <Button title="Add To" onPress={AddTodo} ></Button>
                <Button onPress={goBack} title='Back' />
            </View>
        </View>
    )
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


export default AddTodo;


