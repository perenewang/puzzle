import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import { styles } from '../scripts/constants.js';
import Images from '../assets/index.js'

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
    FlatList,
    TouchableHighlight,
    Pressable,
    TouchableOpacity
} from 'react-native';

const itemData = [
    {
        src: Images.default_imgs.lighthouse,
        img: (
            <Image style={styles.selectImages} source={Images.default_imgs.lighthouse} />
        )
    },
    {
        src: Images.default_imgs.highland,
        img: (
            <Image style={styles.selectImages} source={Images.default_imgs.highland} />
        )
    },
    {
        src: Images.default_imgs.malta,
        img: (
            <Image style={styles.selectImages} source={Images.default_imgs.malta} />
        )
    },
    {
        src: Images.default_imgs.muffin,
        img: (
            <Image style={styles.selectImages} source={Images.default_imgs.muffin} />
        )
    },
    {
        src: Images.default_imgs.otis,
        img: (
            <Image style={styles.selectImages} source={Images.default_imgs.otis} />
        )
    }
];

const Item = ({ item, onPress }) => {
    return <TouchableOpacity onPress={onPress} style={styles.item}>{item.img}</TouchableOpacity>;
};


function SelectScreen({ navigation }): JSX.Element {

    const handleOnPress = (src) => navigation.navigate('Preview Screen', {img_src: src});

    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                onPress={() => handleOnPress(item.src)}
            />
        );
    };

    return (
        <SafeAreaView style = {styles.selectContainer} >
            <FlatList
                data={itemData}
                numColumns={2}
                renderItem={renderItem}
                keyExtractor={item => item.src}
            />
        </SafeAreaView>
    )
}



export default SelectScreen;