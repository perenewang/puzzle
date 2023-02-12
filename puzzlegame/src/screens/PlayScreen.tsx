import React, { useState, useEffect } from 'react';
import { styles } from '../scripts/constants.js';
import { Stopwatch } from 'react-native-stopwatch-timer';
import axios from 'axios';
import {JigsawGenerator} from '../backend/puzzle-generator';
import * as SVG from "react-native-svg";


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

let PIECES:any[] = []

function PlayScreen({ navigation, route }): JSX.Element {
    let {lvl, img_src, run} = route.params;
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

    let yC:number = 0;

    if (lvl === "Easy") {
        yC = 5;
    }
    else if (lvl === "Medium") {
        yC = 10;
    }
    else {
        yC = 15;
    }
    let xC = Math.floor((yC * 2) / 3);

    const gen = () => {
        let width = 390-10, height = 550-10;
        let piece_width = Math.floor(width / xC), piece_height = Math.floor(height / yC);
        const out = new JigsawGenerator({ width: width, height: height, xCount: xC, yCount: yC, radius: 20, fixedPattern: false });
        let cells = out["cells"];
        let pieces = [];
        let k = 0;

        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                let p = cells[i][j];

                let left_bound = -(j * piece_width);
                let right_bound = (width - (j * piece_width) - piece_width);
                let top_bound = - (i * piece_height);
                let bot_bound = (height - (i * piece_height) - piece_height); 
                let shiftTop = Math.random() * (bot_bound - top_bound) + top_bound;
                let shiftLeft = Math.random() * (right_bound - left_bound) + left_bound;
                pieces.push(
                    <SVG.Svg
                        width={width}
                        height={height}
                        fill="none"
                        key={k}
                        style={{ zIndex: -100, top: shiftTop, left: shiftLeft, position: "absolute" }}
                    >
                    <SVG.Defs>
                        <SVG.ClipPath id="clip">
                            <SVG.Path
                                d={p}
                                stroke="black"
                                strokeWidth={3}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </SVG.ClipPath>
                    </SVG.Defs>
                        
                        <SVG.Image
                            // x="5%"
                            // y="5%"
                            width={width}
                            height={height}
                            preserveAspectRatio="xMidYMid slice"
                            // opacity="0.5"
                            href={img_src}
                            clipPath="url(#clip)"
                        />
                    </SVG.Svg >
                );
                k++;
            }   
        };
        route.params.run = true;
        return pieces;
    };
    
    PIECES = route.params.run ? PIECES : gen();


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
                        onPress={() => {
                            navigation.navigate('Preview Screen', { img_src: img_src });
                        }}>
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

                    {PIECES}
                    
                </View>
                
            {/* )} */}
                
            </SafeAreaView>
    );
} 



export default PlayScreen;
