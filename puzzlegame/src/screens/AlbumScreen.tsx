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

function AlbumScreen(): JSX.Element {
    const [count, setCount] = useState(0);

    return (
        <SafeAreaView>
            <StatusBar />
            <View>
                <Text>Hello world</Text> 
            </View>
        </SafeAreaView>
    )
}

export default AlbumScreen;