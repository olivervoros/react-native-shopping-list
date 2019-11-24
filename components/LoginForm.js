import React, { Component } from 'react';
import {Text, TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';

export default class CreateShoppingList extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { login, loginErrorMsg } = this.props;

        const errorMessage = <Text style={styles.loginErrorMessage}>Invalid email address or password!</Text>;

        return(
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to the Shopping List App!</Text>
                { loginErrorMsg ? errorMessage : <Text></Text>}
                <TextInput onChangeText={(email) => this.setState({email: email})} placeholder="Email" style={styles.textInputStyle} />
                <TextInput onChangeText={(password) => this.setState({password: password})} placeholder="Password" style={styles.textInputStyle} />
                <TouchableOpacity onPress={() => login(this.state)}>
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