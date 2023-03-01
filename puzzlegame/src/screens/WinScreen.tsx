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
    Button,
    Image
} from 'react-native';

function WinScreen({ navigation, route }): JSX.Element {
    const { lvl, img_src, time } = route.params;
    
// add picture to album
    return (
        <SafeAreaView>
            <View style={styles.winscreen}>
                <Text>You completed this puzzle in {time} at level {lvl}</Text>
                <Image style={styles.winImage} source={img_src} />
            </View>
        </SafeAreaView>
    )
}

export default WinScreen;