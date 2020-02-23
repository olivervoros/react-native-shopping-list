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
    addShoppingListButtonView1: {
        width: 300,
        height: 50,
        marginBottom: 25,
        backgroundColor: '#ffa500',
        padding: 10,
        color: '#fff',
        textAlign: 'center',
        paddingTop: 15,
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 75
    },
    addShoppingListButtonView2: {
        width: 300,
        height: 50,
        marginBottom: 25,
        backgroundColor: '#3fa9a1',
        padding: 10,
        color: '#fff',
        textAlign: 'center',
        paddingTop: 15,
        fontSize: 18,
        fontWeight: "bold",
    },
    deleteButtonView: {
        width: 300,
        height: 50,
        marginBottom: 25,
        backgroundColor: '#cd0000',
        padding: 10,
        color: '#fff',
        textAlign: 'center',
        paddingTop: 15,
        fontSize: 18,
        fontWeight: "bold",
    },
    viewShoppingListText: {
        fontSize: 18,
        fontWeight: "normal",
        paddingTop: 20,
        textAlign: "left",
        marginLeft: 20,
        marginRight: 20
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 40,
        marginBottom: 20
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
    }

});

module.exports = styles;