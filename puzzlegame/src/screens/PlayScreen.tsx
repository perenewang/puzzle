import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import { styles } from '../scripts/constants.js';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';

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

import SettingsMenu from '../components/SettingsMenu'

// need to do settingsmenu popup and style and figure out the close button 


function PlayScreen({ navigation, route }): JSX.Element {
    const {lvl, img_src} = route.params;
    const [isStart, setIsStart] = useState(true);
    const [settingsVisible, setSettingsVisible] = useState(false);

    const pause = () => {
        if (isStart) {
            setIsStart(false);
        }
        else {
            setIsStart(true);
        }
    }

    return (
        <SafeAreaView>
            <View>
                {settingsVisible ? <SettingsMenu/> : null}
                {settingsVisible ? <Button title="X" onPress={() => {pause(); setSettingsVisible(false);}}/> : null}
            </View>
            {/* <Button title="Go Back" onPress={ () => navigation.navigate('Preview Screen', {img_src: img_src}) }/> */}
            <Stopwatch start={isStart} getTime={(time) => {console.log(time);}} options={styles.stopwatch}/>
            <TouchableOpacity 
                onPress={() => {
                    pause();
                    setSettingsVisible(true);
                }}>
                <Image style={styles.settingsIcon} source={require("../assets/settings.png")}/>
            </TouchableOpacity>
        </SafeAreaView>
    )
} 



export default PlayScreen;
