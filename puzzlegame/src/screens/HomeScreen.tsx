// Home screen

import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import { styles } from '../scripts/constants.js';
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

function HomeScreen({navigation}): JSX.Element {

    return (
        <SafeAreaView>
            <View>
                <Button title="New Game" 
                        onPress={() => navigation.navigate('Select Screen')} />
                <Button title="Album"
                    onPress={() => navigation.navigate('Album Screen')} />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;