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
import Piece from '../components/Piece'


// TO DO:
// - click correct pieces
// - determine if puzzle is finished —> give win screen —> add to album
// - share buttons
// - settings popup
// - CSS


let PIECES: any[] = [];

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

        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                let k = i.toString() + "-" + j.toString();
                // let k = {row: i, column: j};
                let p = cells[i][j];

                let left_bound = -(j * piece_width);
                let right_bound = (width - (j * piece_width) - piece_width);
                let top_bound = - (i * piece_height);
                let bot_bound = (height - (i * piece_height) - piece_height);
                let shiftTop = Math.random() * (bot_bound - top_bound) + top_bound;
                let shiftLeft = Math.random() * (right_bound - left_bound) + left_bound;

                const pieceProps = {
                    visible: false,
                    z: -100,
                    width: width,
                    height: height,
                    k: k,
                    p: p,
                    top: shiftTop,
                    left: shiftLeft,
                    img_src: img_src
                }

                pieces.push(
                    new Piece({ ...pieceProps })
                );
            }
        };
        route.params.run = true;
        return pieces;
    };

    PIECES = route.params.run ? PIECES : gen();
        
    const click = (piece:Piece) => {
        let k = piece.getKey().split('-');
        console.log(k);
        let row = parseInt(k[0]);
        let col = parseInt(k[1]);
        for (let i = 0; i < PIECES.length; i++) {
            let temp = PIECES[i].getKey().split('-');
            // console.log(temp);
            let tempRow = parseInt(temp[0]);
            let tempCol = parseInt(temp[1]);
            let leftDif = Math.abs(piece.getLeft() - PIECES[i].getLeft());
            let topDif = Math.abs(piece.getTop() - PIECES[i].getTop());
            // need to seperate if they are next to each other or on top of each other
            if (row === tempRow && (col + 1 === tempCol || col - 1 === tempCol)) { // next to each other
                // console.log("pieces next to each other");
                // console.log(piece.getTop());
                // console.log(PIECES[i].getTop());
                // console.log(leftDif);
                // console.log(topDif);
                if (topDif <= 1 && leftDif <= 200 ) { // do math to see leftDif comparison (something with piece width)
                    return true;
                }
            } else if (col === tempCol && (row + 1 === tempRow || row - 1 === tempRow)) { //on top of each other
                // console.log(leftDif);
                // console.log(topDif);
                if (leftDif <= 1 && topDif <= 200) { // do math to see topDif comparison (something with piece height)
                    return true;
                }
            }
        }
        return false;
    }


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
                        <View style={{borderWidth: 5, height: 550, width: 390, top: 1, }}> 
                            {PIECES.map(piece => {
                                if (!piece.getVis()) {
                                    return (
                                        <Draggable
                                            key={piece.getKey()}
                                            onDragRelease={(e, ges, bounds) => {
                                                console.log("drag release");
                                                if (ges["moveY"] > 630) {
                                                    console.log("should stay");
                                                    piece.updateVis(true);
                                                    let l = piece.getLeft()
                                                    let t = piece.getTop();
                                                    piece.updateCoords(l + ges["dx"], t + ges["dy"])
                                                }
                                            }}
                                            >
                                            {piece.render()}
                                            
                                        </Draggable>
                                    )
                                }
                            })}
                            <Button title="X" onPress={() => setPiecesVisible(false)} /> 
                        </View>
                        ) : (
                        <View>
                            {PIECES.map(piece => {
                                if (piece.getVis()) {
                                    return (
                                        <Draggable
                                            key={piece.getKey()}
                                            onDragRelease={(e, ges, bounds) => {
                                                let l = piece.getLeft()
                                                let t = piece.getTop();
                                                piece.updateCoords(l + ges["dx"], t + ges["dy"])
                                                if (click(piece)) {
                                                    console.log("should click");
                                                }
                                            }}
                                            >
                                            {piece.render()}

                                        </Draggable>
                                    )
                                }
                            })
                            }
                        </View>
                        )}
                    
                {/* </View> */}
                
            {/* )} */}
                
            </SafeAreaView>
    );
} 



export default PlayScreen;
