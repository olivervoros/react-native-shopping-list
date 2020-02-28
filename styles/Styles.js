import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 75
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 40,
        marginTop:20

    },
    subTitle: {
        width:'100%',
        color: "darkgreen",
        marginBottom: 25,
        fontWeight: "bold",
        fontSize:26,
        textAlign: "center",
        paddingTop: 15,
    },
    shoppingListItem : {
        padding: 10,
        backgroundColor: '#ffa500',
        margin: 10,
        width: 300,
        height: 50,
        textAlign: 'center',
        paddingTop: 15,
        fontSize: 16
    },
    addShoppingListButtonText: {
        color: '#fff',
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        fontWeight: "bold",
        fontSize: 16,
    },
    button: {
        width: 300,
        height: 50,
        marginBottom: 25,
        padding: 10,
        color: '#fff',
        textAlign: 'center',
        paddingTop: 15,
        fontSize: 18,
        fontWeight: "bold"
    },
    viewShoppingListText: {
        fontSize: 18,
        fontWeight: "normal",
        paddingTop: 20,
        textAlign: "left",
        marginLeft: 20,
        marginRight: 20
    },
    completed: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },
    shoppingListItemText: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "left",
        marginBottom: 15
    },
    errorMessage: {
        width: 300,
        height: 50,
        backgroundColor: "red",
        color: "white",
        marginBottom: 25,
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
        paddingTop: 15,
    },
    createShoppingListStyle: {
        paddingLeft: 10,
        width:300,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom:15
    },
    createShoppingListItemText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
        marginBottom: 15
    },
    image: {
        width: 300,
        height: 200,
        marginBottom: 20
    },
    mb25: {
        marginBottom:25
    },
    mt75: {
        marginTop: 75
    },
    bcRed: {
        backgroundColor: '#cd0000'
    },
    bcLightBlue: { backgroundColor: '#3fa9a1'
    },
    bcOrange: {
        backgroundColor: '#ffa500'
    },
    bcDarkblue: {
        backgroundColor: '#312784',
    },
    h40: {
        height: 40
    },
    h120: {
        height: 120
    },
    font20: {
        fontSize: 20
    }

});

module.exports = styles;