import { StyleSheet, Dimensions } from "react-native";
import { withSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({

    home: {
        alignItems: "center",
        justifyContent: 'center',
        height: height,
        backgroundColor: "#dceaea"
    },

    header: {
        backgroundColor: "#8dbcbc",
        flexDirection: "row",
        height: 40,
        alignItems: 'center',
        width: width,
        paddingHorizontal: 5,
        
    },

    headerText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        marginRight: 20,
        color: "white",
        fontWeight: "500"

    },

    button: {
        backgroundColor: '#008891',
        paddingVertical: 8,
        width: width / 1.8,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,

    },
    buttonText: {
        color: 'white',
        // fontWeight: 'bold',
        fontSize: 18
    },

    selectContainer: {
        flex: 2, // the number of columns you want to devide the screen into
        // marginHorizontal: "auto",
        width: width,

    },

    selectImages: {
        width: "97%",
        // width: width/2.1,
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
        marginBottom: 15,
        resizeMode: "contain",
    },


    stopwatch: {
        container: {
            backgroundColor: '#008891',
            width: 110,
            alignItems: 'center',
            borderRadius: 10,
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
        backgroundColor: "#8dbcbc",
        flexDirection: "row",
        height: 40,
        alignItems: 'center',
        zIndex: 100,
        justifyContent: "space-around",
        width: width,
        
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