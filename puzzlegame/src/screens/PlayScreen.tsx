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
    View
} from 'react-native';

import SettingsMenu from '../components/SettingsMenu'
import Pieces from '../components/Pieces'


// to do:
// SettingsMenu.tsx
// Pieces.tsx 
// style close button for settings and pieces popups



function PlayScreen({ navigation, route }): JSX.Element {
    const {lvl, img_src} = route.params;
    const [isStart, setIsStart] = useState(true);
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [piecesVisible, setPiecesVisible] = useState(false);

    const pause = () => {
        if (isStart) {
            setIsStart(false);
        }
        else {
            setIsStart(true);
        }
    }

    let numPieces:number = 0;

    if (lvl === "Easy") {
        numPieces = 5;
    }
    else if (lvl === "Medium") {
        numPieces = 10;
    }
    else {
        numPieces = 15;
    }



    return (
        <SafeAreaView>
            <View style={styles.playScreenHeader}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Preview Screen', { img_src: img_src })}>
                    <Image style={{ height: 20, width: 20 }} source={require("../assets/icons/backArrow.png")} />
                </TouchableOpacity>
                <Text style={{color:"white", fontSize:20}}>{lvl}</Text>
                <Stopwatch start={isStart} getTime={(time) => { console.log(time); }} options={styles.stopwatch} />
                <TouchableOpacity
                    onPress={() => {
                        setPiecesVisible(true);
                    }}>
                    <Image style={{ height: 35, width: 25 }} source={require("../assets/icons/piecesBag.png")} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setIsStart(false);
                        setSettingsVisible(true);
                    }}>
                    <Image style={{ height: 25, width: 25 }} source={require("../assets/icons/settings.png")} />
                </TouchableOpacity>
            </View>

            <View style={styles.board}>
                <View style={styles.settingsMenu}>
                    {settingsVisible ? <SettingsMenu /> : null}
                    {settingsVisible ? <Button title="X" onPress={() => { pause(); setSettingsVisible(false); }} /> : null}
                </View>
                <View style={styles.piecesPopup}>
                    {piecesVisible ? <Pieces /> : null}
                    {piecesVisible ? <Button title="X" onPress={() => setPiecesVisible(false)} /> : null}
                </View>
                
            </View>
            
            
        </SafeAreaView>
    )
} 



export default PlayScreen;
