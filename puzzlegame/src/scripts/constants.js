import { StyleSheet, Dimensions } from "react-native";
import { withSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({

    selectContainer: {
        flex: 2, // the number of columns you want to devide the screen into
        marginHorizontal: "auto",
        width: width,
        height: height

    },

    selectImages: {
    //    width: "97%",
        width: width/2.1,
        height: width/2,
        margin: 3,
    //    resizeMode: "contain",
    },

    item: {
        flex: 1,
        maxWidth: "50%", // 100% divided by the number of rows you want
        alignItems: "center",
    },
    
    previewContainer: {
        // justifyContent: "center",
        alignItems: "center",
        width: width,
        height: height,
    },

    previewImage: {
        width: "90%",
        height: "70%",
        marginTop: 20,
        resizeMode: "contain",
    },


    stopwatch: {
        container: {
            backgroundColor: '#FF0000',
            width: 100,
            alignItems: 'center',
        },
        text: {
            fontSize: 18,
            color: '#FFF',
        }
    },

    internalSettingsMenu: {
        height: 100,
        width: 100,
        backgroundColor: "red",

    },

    settingsMenu: {
        justifyContent: 'center',
        alignItems: 'center',
        top: "30%",
        zIndex: 100
    },

    closeButton: {
        
        

    },

    playScreenHeader: {
        backgroundColor: "blue",
        flexDirection: "row",
        height: 40,
        alignItems: 'center',
        zIndex: 100
    },

    winscreen: {
        // justifyContent: 'center',
        alignItems: 'center',
        height: "100%",
        width: "100%",

    },

    winButtons: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5

    },

    winButtonContainer: {
        // height: "90%",
        // width: "90%",
        // top: "80%",
        // left: "50%",
        // position: "absolute",
        borderColor: "black",
        borderWidth: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center" 

    }


})