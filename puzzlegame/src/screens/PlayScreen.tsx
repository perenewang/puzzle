import React, { useState, useEffect, useRef, useCallback } from 'react';
import { styles } from '../scripts/constants.js';
import { Stopwatch } from 'react-native-stopwatch-timer';
import {JigsawGenerator} from '../backend/puzzle-generator';
import Draggable from 'react-native-draggable';
import Images from '../assets/index.js'
import ReactNativeHapticFeedback from "react-native-haptic-feedback";


import {
    SafeAreaView,
    Text,
    Button,
    Image,
    TouchableOpacity,
    View,
} from 'react-native';

import SettingsMenu from '../components/SettingsMenu'
import Piece from '../components/Piece'


// TO DO:
// - determine if puzzle is finished —> give win screen —> add to album
// - settings popup
// - CSS


let PIECES: any[] = [];
let data: any[] = [];

function PlayScreen({ navigation, route }): JSX.Element {
    let {lvl, img_src, run} = route.params;
    const [isStart, setIsStart] = useState(true);
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [piecesVisible, setPiecesVisible] = useState(false);
    const [isLoading, setLoading] = useState(true);

    let src = img_src
    if (img_src == 1) {
        src = Images.default_imgs.lighthouse
    }
    else if (img_src == 2) {
        src = Images.default_imgs.highland
    }
    else if (img_src == 3) {
        src = Images.default_imgs.malta
    }
    else if (img_src == 4) {
        src = Images.default_imgs.muffin
    }
    else if (img_src == 5) {
        src = Images.default_imgs.otis
    }
    else {

    }
    

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
        yC = 8;
    }
    else {
        yC = 12;
    }
    let xC = Math.floor((yC * 2) / 3);

    const [keys, setKeys] = useState(Array.from(Array(xC*yC).keys()));

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
                    key: k,
                    p: p,
                    top: shiftTop,
                    left: shiftLeft,
                    img_src: src
                }

                pieces.push(pieceProps);
            }
        };
        route.params.run = true;
        return pieces;
    };

    data = route.params.run ? data : gen();
    const componentRefs = data.map((item) => useRef<Piece>(null));


    const click = (index:number) => {
        let res = false;
        let k = data[index].key.split('-');
        console.log(k);
        let row = parseInt(k[0]);
        let col = parseInt(k[1]);
        for (let i = 0; i < data.length; i++) {
            let temp = data[i].key.split('-');
            let tempRow = parseInt(temp[0]);
            let tempCol = parseInt(temp[1]);
            if ((row === tempRow && (col + 1 === tempCol || col - 1 === tempCol)) || // on top of each other
                (col === tempCol && (row + 1 === tempRow || row - 1 === tempRow))) { // next to each other
                let leftDif = Math.abs(data[index].left - data[i].left);
                let topDif = Math.abs(data[index].top - data[i].top);
                if (topDif <= 12 && leftDif <= 12 ) { 
                    res = true;
                    return i;
                }
            }
        }
        return -1;
    }

    
    return (
        <SafeAreaView>
                <View style={styles.playScreenHeader}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Preview', { img_src: img_src });

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
                    {piecesVisible && PIECES ? (
                        <View style={{borderWidth: 5, height: 550, width: 390, top: 1, }}> 
                            {data.map((item, index) => {
                                if (!item.visible) {
                                    
                                    return (
                                        <Draggable
                                            key={item.key}
                                            onDragRelease={(e, ges, bounds) => {
                                                console.log("drag release");
                                                if (ges["moveY"] > 630) {
                                                    console.log("should stay");
                                                    item.visible= true;
                                                    
                                                }
                                                else {
                                                    item.visible = false;
                                                }

                                                let l = item.left;
                                                let t = item.top;
                                                item.left = l + ges["dx"];
                                                item.top = t + ges["dy"];
                                                
                                            }}
                                        >
                                            <Piece {...item} ref={componentRefs[index]}/>

                                        </Draggable>
                                    )
                                }
                            })}
                            <Button title="X" onPress={() => setPiecesVisible(false)} /> 
                        </View>
                        ) : (
                        <View>
                            {data.map((item, index) => {
                                
                                if (item.visible) {

                                    return (
                                        <Draggable
                                            key={keys[index]}
                                            onDragRelease={(e, ges, bounds) => {
                                                let l = item.left;
                                                let t = item.top;
                                                item.left = l + ges["dx"];
                                                item.top = t + ges["dy"];
                                                componentRefs[index]?.current?.updateCoords(item.left, item.top);
                                                
                                                let clicked = click(index)
                                                if (clicked !== -1) {
                                                    console.log("should click");

                                                    item.top = data[clicked].top;
                                                    item.left = data[clicked].left;
                                                    componentRefs[index]?.current?.updateCoords(item.left, item.top);
                                                    

                                                    // const options = {
                                                    //     enableVibrateFallback: true,
                                                    //     ignoreAndroidSystemSettings: false
                                                    // };

                                                    // ReactNativeHapticFeedback.trigger("impactLight", options);
                                                }

                                                let temp = [...keys];
                                                if (temp[index] === index) {
                                                    temp[index] = item.key
                                                }
                                                else {
                                                    temp[index] = index;
                                                }
                                                setKeys(temp);

                                            }}

                                        >
                                            <Piece {...item} ref={componentRefs[index]} />

                                        </Draggable>
                                    )
                                }
                            })}
                        </View>
                        )}
                    
                {/* </View> */}
                
            {/* )} */}
                
            </SafeAreaView>
    );
} 



export default PlayScreen;
