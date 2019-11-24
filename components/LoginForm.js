import React, { Component } from 'react';
import {Text, TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';

export default class CreateShoppingList extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { login } = this.props;

        return(
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to the Shopping List App!</Text>
                <TextInput placeholder="Email" style={styles.textInputStyle} />
                <TextInput placeholder="Password" style={styles.textInputStyle} />
                <TouchableOpacity onPress={login}>
                <Text style={styles.loginButtonView}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

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
    }
});