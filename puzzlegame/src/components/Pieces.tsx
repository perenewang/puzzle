import React from 'react';
import { styles } from '../scripts/constants.js';
import { JigsawGenerator } from '../backend/puzzle-generator';
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
    TouchableHighlight,
    Modal,
    Settings,
    Pressable,
    View
} from 'react-native';

let PIECES: any[] = []

function Pieces({run, xC, yC, img_src}): JSX.Element {

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
                    <Draggable>
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
                    </Draggable>
                );
                k++;
            }
        };
        run = true;
        return pieces;
    };

    PIECES = run ? PIECES : gen();

    return (
        <SafeAreaView>
            {/* <View style={{borderWidth: 5, width: 380, height: 540}}>
                {PIECES}
            </View> */}
            <Text>pieces popup</Text>
        </SafeAreaView>
    )

}

export default Pieces;