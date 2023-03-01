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
import WinScreen from './src/screens/WinScreen';

import {
  ActivityIndicator
} from 'react-native';

const linking = {
  prefixes: ['puzzlegame://'],
  config: {
    // initialRouteName: 'Home',
    screens: {
      Home: 'home',
      Play: 'play/:lvl/:img_src/:run',
      Preview: 'preview/:img_src'
    }
  }
};

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer
      linking={linking}
      // fallback={<ActivityIndicator/>}
    >
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Album" component={AlbumScreen} /> 
        <Stack.Screen name="Select" component={SelectScreen} />
        <Stack.Screen name="Preview" component={PreviewScreen} />
        <Stack.Screen name="Play" component={PlayScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Win" component={WinScreen} options={{ headerShown: false }} />
      </Stack.Navigator>

    </NavigationContainer>

  );
}


export default App;
