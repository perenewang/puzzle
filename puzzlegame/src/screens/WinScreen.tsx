import React, { useState } from 'react';
// import { styles } from '../scripts/constants.js';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableOpacity,
    Share,
    Alert,
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

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
        let w = width-40, h = height/1.75;
        const out = new JigsawGenerator({ width: w, height: h, xCount: xC, yCount: yC, radius: 20, fixedPattern: false });
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
                    width: w,
                    height: h,
                    key: k,
                    p: p,
                    top: height/6,
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

    const url_params = "puzzlegame://preview/" + img_src
    const message = "I completed this puzzle in " + time + " on level " + lvl + ". Try and beat my time!"
    const sharePress = async () => {
        try {
            const result = await Share.share({
                message: message,
                url: url_params
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.completedText}>COMPLETED!</Text>
            {puzzle}
            <Text style={styles.resultText}>You completed this puzzle in 10 seconds on level easy</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={() => sharePress()}>
                    <Text style={styles.buttonText}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Go Home</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#dceaea',
        padding: 20,
    },
    completedText: {
        fontSize: width/10,
        //fontSize: width/15,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        textShadowColor: '#ffffff',
        top: height/25
    },

    resultText: {
        fontSize: width/18,
        //fontSize: width/25,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom: 20,
        top: height/1.55
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: height/1.5
    },
    button: {
        backgroundColor: '#008891',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginHorizontal: 18,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: width/22
        // fontSize: width / 22
    },
});


export default WinScreen;