/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { styles } from './src/scripts/constants.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen from './src/screens/HomeScreen';
import AlbumScreen from './src/screens/AlbumScreen';
import SelectScreen from './src/screens/SelectScreen';
import PreviewScreen from './src/screens/PreviewScreen';
import PlayScreen from './src/screens/PlayScreen';
// import PlayScreen from './src/screens/temp';
import WinScreen from './src/screens/WinScreen';


function App(): JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home Screen" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Album Screen" component={AlbumScreen} /> 
        <Stack.Screen name="Select Screen" component={SelectScreen} />
        <Stack.Screen name="Preview Screen" component={PreviewScreen} />
        <Stack.Screen name="Play Screen" component={PlayScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Win Screen" component={WinScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}


export default App;
