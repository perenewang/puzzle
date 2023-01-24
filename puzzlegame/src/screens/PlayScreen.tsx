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
    Image,
    Header
} from 'react-native';

function PlayScreen({ navigation, route }): JSX.Element {
    const {lvl, img_src} = route.params;

    return (
        <SafeAreaView>
          <Button title="Go Back" onPress={ () => navigation.navigate('Preview Screen', {img_src: img_src}) }/>

        </SafeAreaView>
    )
}

export default PlayScreen;
