import { StyleSheet } from "react-native";

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

    settingsIcon: {
        width: 50,
        height: 50,
    },

    settingsMenu: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 100,
        backgroundColor: "red",
    },

    closeButton: {
        
        

    },

})