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
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 40,
        marginTop:20
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
    addShoppingListButtonView: {
        width:300,
        height:50,
        marginBottom: 25,
        backgroundColor: '#3fa9a1',
        padding: 10,
        color: '#fff',
        textAlign: 'center'
    },
    addShoppingListButtonText: {
        color: '#fff',
        textAlign: 'center',
        paddingTop: 5,
        fontWeight: "bold",
        fontSize: 16,
    },
    loginButtonView: {
        width:300,
        height:50,
        marginBottom: 25,
        backgroundColor: '#312784',
        padding: 10,
        color: '#fff',
        textAlign: 'center'
    }, imageStyle: {
        marginBottom:20
    }
});

module.exports = styles;