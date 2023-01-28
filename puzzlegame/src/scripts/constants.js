import { StyleSheet } from "react-native";
import { withSafeAreaInsets } from "react-native-safe-area-context";

export const styles = StyleSheet.create({

    selectContainer: {
        flex: 2, // the number of columns you want to devide the screen into
        marginHorizontal: "auto",

    },

    selectImages: {
       width: "97%",
       height: 200,
       margin: 3
    },

    item: {
        flex: 1,
        maxWidth: "50%", // 100% devided by the number of rows you want
        alignItems: "center",
    },
    
    previewContainer: {
        alignItems: "center",
        marginTop: 20
    },

    previewImage: {
        width: "90%",
        height: "85%",
    },

    level: {
        backgroundColor: 'blue'
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
        
    },

    closeButton: {
        
        

    },

    playScreenHeader: {
        backgroundColor: "blue",
        flexDirection: "row",
        height: 40,
        alignItems: 'center',
    },
    
    board: {
        backgroundColor: "silver",
        height: "100%",
        width: "100%",
    },

    piecesPopup: {

    },

})