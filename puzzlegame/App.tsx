/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import { styles } from './src/scripts/constants.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';


import HomeScreen from './src/screens/HomeScreen';
import AlbumScreen from './src/screens/AlbumScreen';
import SelectScreen from './src/screens/SelectScreen';
import PreviewScreen from './src/screens/PreviewScreen';
import PlayScreen from './src/screens/PlayScreen';
import WinScreen from './src/screens/WinScreen';


function App(): JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home Screen" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Album Screen" component={AlbumScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Select Screen" component={SelectScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Preview Screen" component={PreviewScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Play Screen" component={PlayScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Win Screen" component={WinScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}


export default App;
