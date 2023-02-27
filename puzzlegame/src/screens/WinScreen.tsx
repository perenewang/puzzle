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

function WinScreen(): JSX.Element {
    
// add picture to album
    return (
        <SafeAreaView>
            <StatusBar />
            <View>
                <Text>YOU WIN</Text>
            </View>
        </SafeAreaView>
    )
}

export default WinScreen;