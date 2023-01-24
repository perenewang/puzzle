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

})