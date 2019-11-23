import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { Input } from 'react-native-elements';

export default class CreateShoppingList extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { login } = this.props;

        return(
            <View style={styles.container}>
                <Text>Welcome to the Shopping List App!</Text>
                <Input label="Email"/>
                <Input label="Password"/>
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
    }
});