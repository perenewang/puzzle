import React, { useState, useEffect, useRef, useCallback } from 'react';
import { styles } from '../scripts/constants.js';
import { Stopwatch } from 'react-native-stopwatch-timer';
import axios from 'axios';
import {JigsawGenerator} from '../backend/puzzle-generator';
import * as SVG from "react-native-svg";
import Draggable from 'react-native-draggable';
import Images from '../assets/index.js'


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
let data: any[] = [];

function PlayScreen({ navigation, route }): JSX.Element {
    let {lvl, img_src, run} = route.params;
    const [isStart, setIsStart] = useState(true);
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [piecesVisible, setPiecesVisible] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [test, setTest] = useState(true);
    const [currPiece, setCurrPiece] = useState();

    
    // const [renderPiece, setRenderPiece] = useState(true);

    const forceUpdate = useCallback(() => setTest(!test), [])

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
    

    // const pieceRef = useRef<Piece>(null);

    // const callGetVis = (index: number) => {
    //     console.log(componentRefs[index].current);
    //     if (componentRefs[index].current) {
    //         return componentRefs[index].current.getVis();
    //     }
    // }

    // const callGetLeft = (index: number) => {
    //     if (componentRefs[index].current) {
    //         return componentRefs[index].current.getLeft();
    //     }
    // }

    // const callGetTop = (index: number) => {
    //     if (pieceRef.current) {
    //         return pieceRef.current.getTop();
    //     }
    // }

    // const callGetKey = (index: number) => {
    //     if (pieceRef.current) {
    //         return pieceRef.current.getKey();
    //     }
    // }

    // const callUpdateVis = (index: number, vis: boolean) => {
    //     if (pieceRef.current) {
    //         return pieceRef.current.updateVis(vis);
    //     }
    // }

    const callUpdateCoords = (index: number, left: number, top: number) => {
        return componentRefs[index]?.current?.updateCoords(left, top);
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
        yC = 10;
    }
    else {
        yC = 15;
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

                // pieces.push(
                //     new Piece({ ...pieceProps })
                // );
                // const ref = useRef<Piece>(null);
                // pieces.push(
                //     <Piece ref={pieceRef} {...pieceProps} />
                // );
                pieces.push(pieceProps);
            }
        };
        route.params.run = true;
        return pieces;
    };

    data = route.params.run ? data : gen();
    const componentRefs = data.map((item) => useRef<Piece>(null));

    // PIECES = route.params.run ? PIECES : gen();

    // useEffect(() => {
    //     data = data;
    // },[data]);


    // const click = (piece:Piece) => {
    //     let res = false;
    //     let k = piece.getKey().split('-');
    //     console.log(k);
    //     let row = parseInt(k[0]);
    //     let col = parseInt(k[1]);
    //     for (let i = 0; i < PIECES.length; i++) {
    //         let temp = PIECES[i].getKey().split('-');
    //         // console.log(temp);
    //         let tempRow = parseInt(temp[0]);
    //         let tempCol = parseInt(temp[1]);
    //         let leftDif = Math.abs(piece.getLeft() - PIECES[i].getLeft());
    //         let topDif = Math.abs(piece.getTop() - PIECES[i].getTop());
    //         // need to seperate if they are next to each other or on top of each other
    //         if (row === tempRow && (col + 1 === tempCol || col - 1 === tempCol)) { // next to each other
    //             // console.log("pieces next to each other");
    //             // console.log(piece.getTop());
    //             // console.log(PIECES[i].getTop());
    //             // console.log(leftDif);
    //             // console.log(topDif);
    //             if (topDif <= 5 && leftDif <= 5 ) { // do math to see leftDif comparison (something with piece width)
    //                 res= true;
    //             }
    //         } else if (col === tempCol && (row + 1 === tempRow || row - 1 === tempRow)) { //on top of each other
    //             // console.log(leftDif);
    //             // console.log(topDif);
    //             if (leftDif <= 5 && topDif <= 5) { // do math to see topDif comparison (something with piece height)
    //                 res= true;
    //             }
    //         }
    //     }
    //     // if (res) {
    //     // console.log("click");
    //     // piece.updateCoords(0,0);
    //     // setTest(!test);
    //     // }
    //     return res;
    // }

    const click = (index:number) => {
        let res = false;
        let k = data[index].key.split('-');
        console.log(k);
        let row = parseInt(k[0]);
        let col = parseInt(k[1]);
        for (let i = 0; i < data.length; i++) {
            let temp = data[i].key.split('-');
            // console.log(temp);
            let tempRow = parseInt(temp[0]);
            let tempCol = parseInt(temp[1]);
            let leftDif = Math.abs(data[index].left - data[i].left);
            let topDif = Math.abs(data[index].top - data[i].top);
            // need to seperate if they are next to each other or on top of each other
            if (row === tempRow && (col + 1 === tempCol || col - 1 === tempCol)) { // next to each other
                // console.log("pieces next to each other");
                // console.log(piece.getTop());
                // console.log(PIECES[i].getTop());
                // console.log(leftDif);
                // console.log(topDif);
                if (topDif <= 5 && leftDif <= 5 ) { // do math to see leftDif comparison (something with piece width)
                    res= true;
                }
            } else if (col === tempCol && (row + 1 === tempRow || row - 1 === tempRow)) { //on top of each other
                // console.log(leftDif);
                // console.log(topDif);
                if (leftDif <= 5 && topDif <= 5) { // do math to see topDif comparison (something with piece height)
                    res= true;
                }
            }
        }
        // if (res) {
        // console.log("click");
        // piece.updateCoords(0,0);
        // setTest(!test);
        // }
        return res;
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
                                // if (!piece.getVis()) {
                                //     return (
                                //         <Draggable
                                //             key={piece.getKey()}
                                //             onDragRelease={(e, ges, bounds) => {
                                //                 console.log("drag release");
                                //                 if (ges["moveY"] > 630) {
                                //                     console.log("should stay");
                                //                     piece.updateVis(true);
                                //                     let l = piece.getLeft();
                                //                     let t = piece.getTop();
                                //                     piece.updateCoords(l + ges["dx"], t + ges["dy"]);
                            
                                //                 }
                                //             }}
                                //             >
                                //             {piece.render()}
                                            
                                //         </Draggable>
                                //     )
                                // }
                                if (!item.visible) {//(!componentRefs[index]?.current?.getVis()) {
                                    
                                    return (
                                        <Draggable
                                            key={item.key}
                                            onDragRelease={(e, ges, bounds) => {
                                                console.log("drag release");
                                                if (ges["moveY"] > 630) {
                                                    console.log("should stay");
                                                    // componentRefs[index]?.current?.updateVis(true);
                                                    item.visible= true;
                                                    
                                                }
                                                else {
                                                    item.visible = false;
                                                }

                                                let l = item.left;
                                                let t = item.top;
                                                // let l = componentRefs[index]?.current?.getLeft();
                                                // let t = componentRefs[index]?.current?.getTop();
                                                item.left = l + ges["dx"];
                                                item.top = t + ges["dy"];
                                                
                                                // componentRefs[index]?.current?.updateCoords(l + ges["dx"], t + ges["dy"]);
                                                // const newCoords = { left: l + ges["dx"], top: t + ges["dy"] };
                                                // setPieceCoords(pieceCoords.map((coord, i) => (i === index ? newCoords : coord)));
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
                                    console.log(item.key);
                                    console.log(item.top);
                                    // setRenderPiece(true);
                                    return (
                                        <Draggable
                                            key={keys[index]}
                                            onDragRelease={(e, ges, bounds) => {
                                                let l = item.left;
                                                let t = item.top;
                                                item.left = l + ges["dx"];
                                                item.top = t + ges["dy"];
                                                // const newCoords = { left: l + ges["dx"], top: t + ges["dy"] };
                                                // setPieceCoords(pieceCoords.map((coord, i) => (i === index ? newCoords : coord)));
                                                // componentRefs[index]?.current?.updateCoords(l + ges["dx"], t + ges["dy"]);
                                                // let l = componentRefs[index]?.current?.getLeft();
                                                // let t = componentRefs[index]?.current?.getTop();
                                                // console.log(l);
                                                // console.log(t);

                                                // let l = callGetLeft();
                                                // let t = callGetTop();
                                                // callUpdateCoords(l + ges["dx"], t + ges["dy"]);

                                                if (click(index)) {
                                                    console.log("should click");
                                                    item.top = 0;
                                                    item.left = 0;
                                                    componentRefs[index]?.current?.updateCoords(0,0);
                                                    //componentRefs[index]?.current?.componentWillUnmount();
                                                    let temp = [...keys];
                                                    temp[index] = item.key;
                                                    setKeys(temp);
                                                    //componentRefs[index]?.current?.componentDidMount();
                                                    // setRenderPiece(false);
                                                    // renderPiece = false;
                                                    // setKey(item.key)
                                                   
                                                

                                                    // const updatedCoords = { left: item.left, top: item.top };
                                                    // setPieceCoords(pieceCoords.map((coord, i) => (i === index ? updatedCoords : coord)));
                                                    

                                                    // forceUpdate();
                                                    // callUpdateCoords(index, 0, 0);
                                                    // componentRefs[index]?.current?.setState((prevState) => ({
                                                    //     ...prevState,
                                                    //     left: 0,
                                                    //     top: 0}), () => {
                                                    //         forceUpdate();
                                                    //     });
                                                    // }, () => {
                                                    //     console.log(componentRefs[index]?.current?.getLeft());
                                                    //     console.log(componentRefs[index]?.current?.getTop());
                                                    //     forceUpdate();
                                                    // });
                                                    
                                                    // componentRefs[index]?.current?.forceUpdate();
                                                

                                                }

                                            }}

                                        >
                                            <Piece {...item} ref={componentRefs[index]} />

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
