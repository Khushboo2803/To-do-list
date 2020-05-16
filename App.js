import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import signUp from './Screens/signUp.js';
import login from './Screens/login.js';

const stack=createStackNavigator();

export default function App()
{
  return(
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen name="signup" component={signUp} />
        <stack.Screen name="login" component={login} />
      </stack.Navigator>
    </NavigationContainer>
  );
}