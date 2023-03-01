import React, { useState } from 'react';
import { styles } from '../scripts/constants.js';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Button,
    Image,
    TouchableOpacity
} from 'react-native';


import { JigsawGenerator } from '../backend/puzzle-generator';
import Piece from '../components/Piece'

function WinScreen({ navigation, route }): JSX.Element {
    const { lvl, img_src, time } = route.params;

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

    const gen = () => {
        let width = 300, height = 400;
        const out = new JigsawGenerator({ width: width, height: height, xCount: xC, yCount: yC, radius: 20, fixedPattern: false });
        let cells = out["cells"];
        let pieces = [];

        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                let k = i.toString() + "-" + j.toString();
                let p = cells[i][j];

                const pieceProps = {
                    removed: false,
                    visible: false,
                    z: -100,
                    width: width,
                    height: height,
                    key: k,
                    p: p,
                    top: "15%",
                    left: "auto",
                    img_src: img_src
                }

                pieces.push(
                    <Piece {...pieceProps}/>
                );
            }
        };
        return pieces;
    };

    const puzzle = gen();


    
// add picture to album
    return (
        <SafeAreaView>
            <View style={styles.winscreen}>
                <Text style={{
                    fontSize: 48,
                    fontWeight: 'bold',
                    color: 'green',
                    textShadowColor: "'rgba(0, 0, 0, 0.4)'",
                    textShadowOffset: { width: 5, height: 5 },
                    textShadowRadius: 20,
                    textAlign: 'center',
                    padding: 10
                }}>COMPLETED!!</Text>
                {puzzle}
                <Text style={{
                    top: "70%",
                }}>You completed this puzzle in {time} on level {lvl}</Text>
                
            </View>
            <View style={styles.winButtonContainer}>
                <TouchableOpacity style={styles.winButtons}>
                    <Text>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.winButtons} >
                    <Text>Back Home</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default WinScreen;