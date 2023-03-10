import React from 'react';
import { styles } from '../scripts/constants.js';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    Button,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    Modal,
    Settings,
    Pressable,
    View
} from 'react-native';

function SettingsMenu(): JSX.Element {

    return (
        <SafeAreaView>
            <View style={styles.internalSettingsMenu}>
                <Text>Hello There</Text>
            </View>
        </SafeAreaView>
    )

}

export default SettingsMenu;