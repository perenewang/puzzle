import React, { useState, useEffect } from 'react';
import { styles } from '../scripts/constants.js';

import {
    SafeAreaView,
    Button,
    Image,
    ActionSheetIOS
} from 'react-native';

function PreviewScreen({ navigation, route }): JSX.Element {
    const {img_src} = route.params;

    const [level, setLevel] = useState('Easy');

    const levelPress = () =>
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Cancel', 'Easy', 'Medium', 'Hard'],
                cancelButtonIndex: 0,
                userInterfaceStyle: 'dark',
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    // cancel action
                } else if (buttonIndex === 1) {
                    setLevel('Easy');
                } else if (buttonIndex === 2) {
                    setLevel('Medium');
                }
                else {
                    setLevel('Hard');
                }
            },
        );

    const playPress = () => navigation.navigate('Play Screen', {lvl: level, img_src: img_src, run: false});

    const sharePress = () => navigation.navigate('Home Screen');

    return (
        <SafeAreaView style={styles.previewContainer}>
            <Image style={styles.previewImage} source={img_src} />

            <Button style={styles.level} onPress={levelPress} title={"Level: " + level}/>
            <Button style={styles.level} onPress={playPress} title="Play" />
            <Button style={styles.level} onPress={sharePress} title="Share" />

        </SafeAreaView>
    )
}

export default PreviewScreen;
