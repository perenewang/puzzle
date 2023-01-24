import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import { styles } from '../scripts/constants.js';
import Images from '../assets/index.js'

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

function PreviewScreen({ navigation, route }): JSX.Element {
    const {img_src} = route.params;
    return (
        <SafeAreaView style={styles.previewContainer}>
            <Image style={styles.previewImage} source={img_src} />
        </SafeAreaView>
    )
}

export default PreviewScreen;