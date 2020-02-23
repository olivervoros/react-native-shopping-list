import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButtonView: {
        width:150,
        height:50,
        margin: 25,
        backgroundColor: '#312784',
        padding: 10,
        color: '#fff',
        textAlign: "center",
        paddingTop: 15,
        fontSize: 18,
        fontWeight: 'bold'
    },
    textInputStyle: {
        paddingLeft: 10,
        width:300,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom:15
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 40
    },
    loginErrorMessage: {
        width:300,
        height:50,
        backgroundColor: "red",
        color: "white",
        marginBottom: 25,
        fontWeight: "bold",
        fontSize:16,
        textAlign: "center",
        paddingTop: 15,
    }
});

module.exports = styles;