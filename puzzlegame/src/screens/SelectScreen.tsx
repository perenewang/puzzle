import React, { useState } from 'react';
import { styles } from '../scripts/constants.js';
import Images from '../assets/index.js'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


import {
    SafeAreaView,
    ScrollView,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    ActionSheetIOS,
    Alert
} from 'react-native';

const itemData = [
    {
        src: Images.icons.choose,
        img: (
            <Image style={styles.selectImages} source={Images.icons.choose} />
        )
    },
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
    const [imageSource, setImageSource] = useState(null);

    const camera = () => {
        let options = {
            mediaType:'photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchCamera(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorCode);
            } else if (response.errorMessage) {
                console.log('Error Message: ', response.errorMessage);
            } else if (response.assets) {
                console.log(response.assets[0]["uri"]);
            }
        });

    };

    const library = () => {
        let options = {
            mediaType: 'photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorCode);
            } else if (response.errorMessage) {
                console.log('Error Message: ', response.errorMessage);
            } else if (response.assets) {
                console.log(response.assets[0]["uri"]);
                navigation.navigate('Preview', { img_src: {uri: response.assets[0]["uri"]} });
            }
        });

    };

    const handleOnPress = (src) => navigation.navigate('Preview', {img_src: src});

    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                onPress={() => {
                    if (item.src === Images.icons.choose) {
                        ActionSheetIOS.showActionSheetWithOptions(
                            {
                                options: ['Cancel', 'Take Photo', 'Choose Photo'],
                                cancelButtonIndex: 0,
                                userInterfaceStyle: 'dark',
                            },
                            buttonIndex => {
                                if (buttonIndex === 0) {
                                    // cancel action
                                } else if (buttonIndex === 1) {
                                    console.log('take');
                                    camera();
                                } else {
                                    console.log("choose");
                                    library();
                                }
                            },
                        );
                    }
                    else {
                        handleOnPress(item.src)
                    }
                    
                }}
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