import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import signUp from './Screens/signUp.js';
import login from './Screens/login.js';
import todo from './Screens/todo.js';
import complete from './Screens/completed.js';
const stack=createStackNavigator();

export default function App()
{
  return(
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen name="signup" component={signUp} />
        <stack.Screen name="login" component={login} />
        <stack.Screen name="todo" component={todo} />
        <stack.Screen name="complete" component={complete} />
      </stack.Navigator>
    </NavigationContainer>
  );
}