import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 75
    },
    addShoppingListButton: {
        width:300,
        height:50,
        marginBottom: 25,
        backgroundColor: '#3fa9a1',
        padding: 10,
        color: '#fff',
        textAlign: 'center',
        paddingTop: 15,
        fontSize: 18,
        fontWeight: "bold",
    },
    backToHomeButton: {
        width:300,
        height:50,
        marginBottom: 25,
        backgroundColor: '#ffa500',
        padding: 10,
        color: '#fff',
        textAlign: 'center',
        paddingTop: 15,
        fontSize: 18,
        fontWeight: "bold",
    },
    createShoppingListTextInput: {
        paddingLeft: 10,
        width:300,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom:15
    },
    createShoppingListTextArea: {
        paddingLeft: 10,
        width:300,
        height: 120,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom:15,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 40
    },
    shoppingListItemText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
        marginBottom: 15
    },
    shoppingListItemTextArea: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
        marginTop: 30,
        marginBottom: 15
    },
    missingTitleErrorMessage: {
        width:300,
        height:50,
        backgroundColor: "red",
        color: "white",
        marginBottom: 25,
        fontWeight: "bold",
        fontSize:16,
        textAlign: "center",
        paddingTop: 15,
    },
    subTitle: {
        width:'100%',
        color: "darkgreen",
        marginBottom: 25,
        fontWeight: "bold",
        fontSize:26,
        textAlign: "center",
        paddingTop: 15,
    }
});

module.exports = styles;