// Home screen

import React, { useState } from 'react';
import { styles } from '../scripts/constants.js';
import {
    SafeAreaView,
    StatusBar,
    Text,
    Button
} from 'react-native';

function HomeScreen({navigation}): JSX.Element {

    return (
        <SafeAreaView>
            <Button title="New Game" 
                    onPress={() => navigation.navigate('Select Screen')} />
            <Button title="Album"
                onPress={() => navigation.navigate('Album Screen')} />
        </SafeAreaView>
    )
}

export default HomeScreen;