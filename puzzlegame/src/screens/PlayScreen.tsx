import React, { useState, useEffect } from 'react';
import { styles } from '../scripts/constants.js';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import {JigsawGenerator} from '../backend/puzzle-generator';
import Svg, { Path } from "react-native-svg";

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    Button,
    Image,
    TouchableOpacity,
    View,
    Dimensions,
    useWindowDimensions
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
    const [isLoading, setLoading] = useState(true);

    const pause = () => {
        if (isStart) {
            setIsStart(false);
        }
        else {
            setIsStart(true);
        }
    }

    let num_pieces:number = 0;

    if (lvl === "Easy") {
        num_pieces = 5;
    }
    else if (lvl === "Medium") {
        num_pieces = 10;
    }
    else {
        num_pieces = 15;
    }
    const img = "../assets/defaults/muffin_dog.png";
    
    const gen = () => {
        const out = new JigsawGenerator({ width: 60, height: 100, xCount: 3, yCount: 5, radius: 20, fixedPattern: false });
        let cells = out["cells"];
        let pieces = [];
        let k = 0;
        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                let p = cells[i][j];
                pieces.push(
                    < Svg
                        width={60}
                        height={100}
                        fill="none"
                        key={k}
                    >
                        <Path
                            d={p}
                            stroke="black"
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg >
                );
                k++;
            }   
        };
        return pieces;
    };
    
    


    // const loadPuzzle = async () => {
    //     let puzzleEndpoint = `http://127.0.0.1:5000/createPuzzle`;
    //     let requestBody = {
    //         "img_src": img,
    //         "num_pieces": num_pieces
    //     };
    //     await axios.post(puzzleEndpoint, 
    //         JSON.stringify(requestBody), 
    //         { headers: { "Content-Type": "application/json" } 
    //         }).then((response) => {
    //             console.log(response);
    //             setLoading(false);
    //     }).catch((error) => console.log(error));
    // };
    

    // useEffect(() => {
    //     loadPuzzle();
    // }), [isLoading];

    return (
        
        <SafeAreaView>
                <View style={styles.playScreenHeader}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Preview Screen', { img_src: img_src })}>
                        <Image style={{ height: 20, width: 20 }} source={require("../assets/icons/backArrow.png")} />
                    </TouchableOpacity>
                    <Text style={{color:"white", fontSize:20}}>{lvl}</Text>
                    <Stopwatch start={isStart} options={styles.stopwatch} />
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
            {/* {isLoading ? (
                <Text> LOADING ...</Text>
            ) : ( */}
                <View style={styles.board}>
                    <View style={styles.settingsMenu}>
                        {settingsVisible ? <SettingsMenu /> : null}
                        {settingsVisible ? <Button title="X" onPress={() => { pause(); setSettingsVisible(false); }} /> : null}
                    </View>
                    <View style={styles.piecesPopup}>
                        {piecesVisible ? <Pieces /> : null}
                        {piecesVisible ? <Button title="X" onPress={() => setPiecesVisible(false)} /> : null}
                    </View>

                    {gen()}

                    {/* <WebView originWhitelist={['*']} source={require('../scripts/puzzle.html')} /> */}
                    {/* <WebView originWhitelist={['*']} source={require("../scripts/test.html")} /> */}
                </View>
                
            {/* )} */}
                
            </SafeAreaView>
    );
} 



export default PlayScreen;
