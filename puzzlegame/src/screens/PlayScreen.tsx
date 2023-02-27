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
// - haptic and sound feedback
// - settings popup
//      - able to turn on/off haptic and sound?
//      - quit goes to home
//      - restart resets the puzzle
//      - instructions popup
// - CSS


let data: any[] = [];
let groups: any[] = [];

function PlayScreen({ navigation, route }): JSX.Element {
    let {lvl, img_src, run} = route.params;
    const [isStart, setIsStart] = useState(true);
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [piecesVisible, setPiecesVisible] = useState(false);
    const [isLoading, setLoading] = useState(true);
    // const [finished, setFinished] = useState(false);

    let finished = false;

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
    else if (img_src == 6) {
        src = Images.default_imgs.puzzle
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
    const [groupKeys, setGroupKeys] = useState(Array(0));

    const gen = () => {
        let width = 390 - 10, height = 550 - 10;
        let piece_width = Math.floor(width / xC), piece_height = Math.floor(height / yC);
        const out = new JigsawGenerator({ width: width, height: height, xCount: xC, yCount: yC, radius: 20, fixedPattern: false });
        let cells = out["cells"];
        let pieces = [];

        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                let k = i.toString() + "-" + j.toString();
                let p = cells[i][j];

                let left_bound = -(j * piece_width);
                let right_bound = (width - (j * piece_width) - piece_width);
                let top_bound = - (i * piece_height);
                let bot_bound = (height - (i * piece_height) - piece_height);
                let shiftTop = Math.random() * (bot_bound - top_bound) + top_bound;
                let shiftLeft = Math.random() * (right_bound - left_bound) + left_bound;

                
                const pieceProps = {
                    removed: false,
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

    groups = route.params.run ? groups : [];
    data = route.params.run ? data : gen();

    if (groups.length === 1 && groups[0].length === data.length) {
        
        finished = true;
    }

    const componentRefs = data.map((item) => useRef<Piece>(null));
    const componentGroupRefs = data.map((item) => useRef<Piece>(null));


    // click data pieces
    const clickPieces = (index:number) => {
        let res = false;
        let k = data[index].key.split('-');
        let row = parseInt(k[0]);
        let col = parseInt(k[1]);
        for (let i = 0; i < data.length; i++) {
            if (!data[i].removed) {
                let temp = data[i].key.split('-');
                let tempRow = parseInt(temp[0]);
                let tempCol = parseInt(temp[1]);
                if ((row === tempRow && (col + 1 === tempCol || col - 1 === tempCol)) || // on top of each other
                    (col === tempCol && (row + 1 === tempRow || row - 1 === tempRow))) { // next to each other
                    let leftDif = Math.abs(data[index].left - data[i].left);
                    let topDif = Math.abs(data[index].top - data[i].top);
                    if (topDif <= 12 && leftDif <= 12) {
                        res = true;
                        return i;
                    }
                }
            }
            
        }
        return -1;
    }

    // click data piece to a group
    const clickToGroup = (index: number) => {
        let res = false;
        let k = data[index].key.split('-');
        let row = parseInt(k[0]);
        let col = parseInt(k[1]);
        for (let i = 0; i < groups.length; i++) {
            for (let j = 0; j < groups[i].length; j++) {
                let temp = groups[i][j].key.split('-');
                let tempRow = parseInt(temp[0]);
                let tempCol = parseInt(temp[1]);
                if ((row === tempRow && (col + 1 === tempCol || col - 1 === tempCol)) || // on top of each other
                    (col === tempCol && (row + 1 === tempRow || row - 1 === tempRow))) { // next to each other
                    let leftDif = Math.abs(data[index].left - groups[i][j].left);
                    let topDif = Math.abs(data[index].top - groups[i][j].top);
                    if (topDif <= 12 && leftDif <= 12) {
                        res = true;
                        return i;
                    }
                }
            }
           
        }
        return -1;
    }

    // click two groups
    const clickGroups = (index: number) => {
        let res = false;
        for (let i = 0; i < groups.length; i++) {
            if (i !== index) {
                let leftDif = Math.abs(groups[index][0].left - groups[i][0].left);
                let topDif = Math.abs(groups[index][0].top - groups[i][0].top);
                if (topDif <= 12 && leftDif <= 12) {
                    // iterate through groups[index] and groups[i] to see if any piece in 
                    // groups[index] is on top or next to any piece in groups[i]
                    for (let x = 0; x < groups[index].length; x++) {
                        let k = groups[index][x].key.split('-');
                        let row = parseInt(k[0]);
                        let col = parseInt(k[1]);

                        for (let j = 0; j < groups[i].length; j++) {
                            let temp = groups[i][j].key.split('-');
                            let tempRow = parseInt(temp[0]);
                            let tempCol = parseInt(temp[1]);
                            if ((row === tempRow && (col + 1 === tempCol || col - 1 === tempCol)) || // on top of each other
                                (col === tempCol && (row + 1 === tempRow || row - 1 === tempRow))) {
                                res = true;
                                return i;
                            }

                        }
                    }
                }

            }
            
        }
        return -1;
    }

    // click group to piece
    const clickToPiece = (index: number) => {
        let res = false;

        for (let x = 0; x < groups[index].length; x++)
        {
            let k = groups[index][x].key.split('-');
            let row = parseInt(k[0]);
            let col = parseInt(k[1]);
            for (let i = 0; i < data.length; i++) {
                if (!data[i].removed) {
                    let temp = data[i].key.split('-');
                    let tempRow = parseInt(temp[0]);
                    let tempCol = parseInt(temp[1]);
                    if ((row === tempRow && (col + 1 === tempCol || col - 1 === tempCol)) || // on top of each other
                        (col === tempCol && (row + 1 === tempRow || row - 1 === tempRow))) { // next to each other
                        let leftDif = Math.abs(groups[index][x].left - data[i].left);
                        let topDif = Math.abs(groups[index][x].top - data[i].top);
                        if (topDif <= 12 && leftDif <= 12) {
                            res = true;
                            return i;
                        }
                    }
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
                    <Stopwatch start={isStart} options={styles.stopwatch} getTime={(time) => {
                        if (finished) {
                            setIsStart(false);
                            navigation.navigate('Win', { lvl: lvl, img_src: src, time: time });
                        }
                    }}/>
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

                                                item.left += ges["dx"];
                                                item.top += ges["dy"];
                                                
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
                                if (item.visible && !item.removed) {

                                    return (
                                        <Draggable
                                            key={keys[index]}
                                            onDragRelease={(e, ges, bounds) => {
                                                item.left += ges["dx"];
                                                item.top += ges["dy"];
                                                componentRefs[index]?.current?.updateCoords(item.left, item.top);
                                                
                                                let clicked = clickPieces(index);
                                                let clickedGroup = clickToGroup(index);

                                                if (clicked !== -1) {
                                                    console.log("should click pieces");

                                                    item.top = data[clicked].top;
                                                    item.left = data[clicked].left;
                                                    componentRefs[index]?.current?.updateCoords(item.left, item.top);

                                                    // add the two pieces to groups as one group
                                                    groups.push([data[index], data[clicked]]);

                                                    // remove both pieces from data
                                                    item.removed = true;
                                                    data[clicked].removed = true;
                                                    componentRefs[index]?.current?.updateRemoved(true);
                                                    componentRefs[clicked]?.current?.updateRemoved(true);

                                                    let temp = [...groupKeys];
                                                    temp.push(groupKeys.length);
                                                    setGroupKeys(temp);




                                                    // const options = {
                                                    //     enableVibrateFallback: true,
                                                    //     ignoreAndroidSystemSettings: false
                                                    // };

                                                    // ReactNativeHapticFeedback.trigger("impactLight", options);
                                                }

                                                
                                                else if (clickedGroup !== -1) {
                                                    console.log("should click piece to group");

                                                    item.top = groups[clickedGroup][0].top;
                                                    item.left = groups[clickedGroup][0].left;
                                                    componentRefs[index]?.current?.updateCoords(item.left, item.top);

                                                    // add the the piece at index to group it clicked with
                                                    groups[clickedGroup].push(data[index]);

                                                    // remove the piece from data
                                                    item.removed = true;
                                                    componentRefs[index]?.current?.updateRemoved(true);

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
                            {groups.map((group, index) => {

                                return (
                                    <Draggable
                                        key={groupKeys[index]}
                                        onDragRelease={(e, ges, bounds) => {
                                            group.map((item:any, i:number) => {
                                                item.left += ges["dx"];
                                                item.top += ges["dy"];
                                                const ref = index * groups[index].length + i;
                                                componentGroupRefs[ref]?.current?.updateCoords(item.left, item.top);

                                                

                                                    


                                                    // const options = {
                                                    //     enableVibrateFallback: true,
                                                    //     ignoreAndroidSystemSettings: false
                                                    // };

                                                    // ReactNativeHapticFeedback.trigger("impactLight", options);
                                                }
                                            )
                                            let clickedPiece = clickToPiece(index);
                                            let clickedGroup = clickGroups(index);

                                            if (clickedPiece !== -1) {
                                                console.log("should click group to piece");

                                                group.map((item: any, i: number) => {
                                                    item.top = data[clickedPiece].top;
                                                    item.left = data[clickedPiece].left;
                                                    const ref = index * groups[index].length + i;
                                                    componentGroupRefs[ref]?.current?.updateCoords(item.left, item.top);
                                                })

                                                // remove pieces from data
                                                data[clickedPiece].removed = true;
                                                componentRefs[clickedPiece]?.current?.updateRemoved(true);

                                                // add the piece to the group
                                                group.push(data[clickedPiece]);
                                            }

                                            else if (clickedGroup !== -1) {
                                                console.log("should click groups");

                                                group.map((item: any, i: number) => {
                                                    item.left = groups[clickedGroup][0].left;
                                                    item.top = groups[clickedGroup][0].top;
                                                    const ref = index * groups[index].length + i;
                                                    componentRefs[ref]?.current?.updateCoords(item.left, item.top);

                                                })
                                                
                                                // merge the two groups
                                                groups[index] = group.concat(groups[clickedGroup]);
                                                groups.splice(clickedGroup, 1);


                                            }

                                            
                                            let temp = [...groupKeys];
                                            if (temp[index] === index) {
                                                temp[index] = group[0].key;
                                            }
                                            else {
                                                temp[index] = index;
                                            }
                                            setGroupKeys(temp);

                                        }}
                                    >
                                        <View>
                                            {group.map((item:any, i:number) => {
                                                const ref = index * groups[index].length + i;
                                                return (<Piece {...item} ref={componentGroupRefs[ref]} />)
                                            })}
                                        </View>
                                    </Draggable>
                                )
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
