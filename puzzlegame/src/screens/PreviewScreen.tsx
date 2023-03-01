import React, { useState, useEffect } from 'react';
import { styles } from '../scripts/constants.js';
import Images from '../assets/index.js'

import {
    SafeAreaView,
    Image,
    ActionSheetIOS,
    Share,
    Alert,
    View,
    TouchableOpacity,
    Text
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
    
    

    const playPress = () => navigation.navigate('Play', {lvl: level, img_src: img_src, run: false});
    // const url_params = "puzzlegame://play/" + level + "/" + JSON.stringify(src) + "/" + "false"
    const url_params = "puzzlegame://preview/" + img_src 
    const sharePress = async () => {
        try {
            const result = await Share.share({
                message:
                    'Play this puzzle!',
                url: url_params
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    // const onShare = async () => {
    //     Share.share({
    //         message: `Check out the puzzle at puzzlegame://play/${level}/${img_src}/false`,
    //     });
    // };

    return (
        <SafeAreaView style={styles.previewContainer}>
            <View style={styles.header} >
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Select');
                    }}>
                    <Image style={{ height: 20, width: 20 }} source={require("../assets/icons/backArrow.png")} />
                </TouchableOpacity>

                <Text style={styles.headerText}> Preview </Text>
            </View>
            <Image style={styles.previewImage} source={img_src} />
            {/* <Button onPress={()=>navigation.navigate('Win', { lvl: level, img_src: img_src, time: 0 })} title="win"/> */}

            
            <TouchableOpacity style={styles.button} onPress={levelPress}>
                <Text style={styles.buttonText}>Level: {level}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={playPress}>
                <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={sharePress}>
                <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default PreviewScreen;
