import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    selectContainer: {
        flex: 2, // the number of columns you want to devide the screen into
        marginHorizontal: "auto",

    },

    selectImages: {
       width: "100%",
       height: 200
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
    }

})