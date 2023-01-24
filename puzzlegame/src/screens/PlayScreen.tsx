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

function PlayScreen(): JSX.Element {
    const [count, setCount] = useState(0);

    return (
        <SafeAreaView>
            <StatusBar />
            <View>
                <Button onPress={() => setCount(count + 1)} title={`Count : ${count}`} />
            </View>
        </SafeAreaView>
    )
}

export default PlayScreen;