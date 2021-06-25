import React , { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import SignIn from './screens/SignIn';
import Register from './screens/Register';
import Profile from './screens/Profile';
import TodoList from './screens/TodoList';
import AddTodo from './screens/AddTodo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './firebase';

import {decode, encode} from 'base-64'// for firebase
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const StackAuth = createStackNavigator();
const AppStack = createStackNavigator();

const Auth = () => {
  return (
    <StackAuth.Navigator>
      <StackAuth.Screen name='SignIn' component={SignIn}/>
      <StackAuth.Screen name='Register' component={Register}/>
    </StackAuth.Navigator>
  )
}

const AppHome = () => {
  return (
    <AppStack.Navigator initialRouteName="Todo">
      <AppStack.Screen name='Profile' component={Profile}/>
      <AppStack.Screen name='Todo' component={TodoList}/>
      <AppStack.Screen name='Add' component={AddTodo}/>
    </AppStack.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(async authUser => {
      try {
        await (authUser ? setUser(authUser) : setUser(null));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    });
    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large"/>;
  }

  return (
    <NavigationContainer>
      {user ? <AppHome/> : <Auth/>}
    </NavigationContainer>
  );
}
