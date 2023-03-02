import React, { useState } from 'react';
import { styles } from '../scripts/constants.js';
import {
    SafeAreaView,
    Text,
    TouchableOpacity, 
    Dimensions
} from 'react-native';

function HomeScreen({ navigation }): JSX.Element {
    const { width, height } = Dimensions.get('window');

    return (
        <SafeAreaView style={styles.home}>
            <Text style={{fontSize: width/10, fontWeight: "bold", paddingBottom: height/20}}>PUZZLEGAME</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Select')}>
                <Text style={styles.buttonText}>New Game</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Album')}>
                <Text style={styles.buttonText}>Album</Text>
            </TouchableOpacity> */}
        </SafeAreaView>
    )
}

export default HomeScreen;