import React, { useState, useEffect, useRef } from 'react';
import { styles } from '../scripts/constants.js';
import { Stopwatch } from 'react-native-stopwatch-timer';
import axios from 'axios';
import {JigsawGenerator} from '../backend/puzzle-generator';
import * as SVG from "react-native-svg";
import Draggable from 'react-native-draggable';


import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    Button,
    Image,
    TouchableOpacity,
    View,
    PanResponder,
    Animated,
    Alert
} from 'react-native';

import SettingsMenu from '../components/SettingsMenu'
import Pieces from '../components/Pieces'
import { transformer } from '../../metro.config.js';


// TO DO:
// - click correct pieces
// - put pieces in collapsable view, but make sure once you drag one out of scope of view, 
//      it stays where it is rather than disapearing when view is collapsed again
// - determine if puzzle is finished —> give win screen —> add to album
// - share buttons
// - settings popup


let PIECES: any[] = []
let visiblePieces: any[] = [];
// let bagPieces: any[] = PIECES;

function PlayScreen({ navigation, route }): JSX.Element {
    let {lvl, img_src} = route.params;
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

    
    let yC: number = 0;

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
        let width = 390 - 10, height = 550 - 10;
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
                    // <Draggable 
                    //     key={k}
                    //     onDragRelease={(e, ges, bounds) => {
                    //         // if y coordinate is below threshold of bag, append this to 
                    //         // visible pieces and remove from bagPieces
                    //         // { fx, fy, width, height, px, py } = this.measure()
                    //         console.log("drag release");
                    //         console.log(ges["moveY"]);
                    //         if (ges["moveY"] > 630) {
                    //             visiblePieces.push(this)
                    //         }
                    //     }}
                    // >
                        <SVG.Svg
                            width={width}
                            height={height}
                            fill="none"
                            key={k}
                            style={{ zIndex: -100, overflow: "hidden", top: shiftTop, left: shiftLeft, position: "absolute" }}
                        >
                            <SVG.Defs>
                                <SVG.Pattern id="img1" width={width} height={height}>
                                    <SVG.Image
                                        width={width}
                                        height={height}
                                        x="0"
                                        y="0"
                                        preserveAspectRatio="xMidYMid slice"
                                        href={img_src}
                                    />
                                </SVG.Pattern>

                            </SVG.Defs>
                            <SVG.Path
                                d={p}
                                stroke="black"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="url(#img1)"
                            />
                        </SVG.Svg>
                    // </Draggable>
                );
                k++;
            }
        };
        route.params.run = true;
        return pieces;
    };

    PIECES = route.params.run ? PIECES : gen();
    visiblePieces = route.params.run ? visiblePieces : [];
        

    
    



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
                {/* <View style={styles.board}> */}
                    <View style={styles.settingsMenu}>
                        {settingsVisible ? <SettingsMenu /> : null}
                        {settingsVisible ? <Button title="X" onPress={() => { pause(); setSettingsVisible(false); }} /> : null}
                    </View>
                    {piecesVisible ? (
                        <View style={{borderWidth: 5, height: 550, width: 390, top: 1}}> 
                            {PIECES.map(piece => {
                                return (
                                    <Draggable
                                        onDragRelease={(e, ges, bounds) => {
                                            // if y coordinate is below threshold of bag, append this to
                                            // visiblePieces and remove from bagPieces
                                            console.log("drag release");
                                            console.log(ges["moveY"]);
                                            if (ges["moveY"] > 630) {
                                                visiblePieces.push(piece);
                                                console.log("should push");
                                                // need to remove from PIECES
                                            }
                                        }}>
                                        {piece}
                                        
                                    </Draggable>
                                )
                            })
                            }
                            <Button title="X" onPress={() => setPiecesVisible(false)} /> 
                        </View>
                        ) : (
                        <View>
                            {visiblePieces.map(piece => {
                                return (
                                <View style={{ 
                                    position: "absolute", 
                                    borderWidth: 5, 
                                    width: 50, 
                                    height: 50, 
                                    top:50, 
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}> 
                                    <Draggable >
                                        {piece}
                                    </Draggable>
                                </View>
                                )
                            })
                            }
                        </View>
                        )}
                        
                    
                    

                    {/* {PIECES} */}
                    
                {/* </View> */}
                
            {/* )} */}
                
            </SafeAreaView>
    );
} 



export default PlayScreen;
