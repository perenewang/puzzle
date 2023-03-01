import React, { useState } from 'react';
// import { styles } from '../scripts/constants.js';
import {
    SafeAreaView,
    StyleSheet,
    Text,
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
                    z: -1,
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

    return (
        <View style={styles.container}>
            <Text style={styles.completedText}>COMPLETED!</Text>
            <View style={styles.imageContainer}>
                <Image source={img_src} style={styles.image} />
            </View>
            {/* {puzzle} */}
            <Text style={styles.resultText}>You completed this puzzle in 10 seconds on level easy</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Go Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dceaea',
        padding: 20,
    },
    completedText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        textShadowColor: '#ffffff',
    },
    
    imageContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    resultText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#008891',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});


export default WinScreen;