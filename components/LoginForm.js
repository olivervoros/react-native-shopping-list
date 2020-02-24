import React, { Component } from 'react';
import {Text, TextInput, View, TouchableOpacity} from 'react-native';
import styles from '../styles/Styles';

export default class CreateShoppingList extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { login, loginErrorMsg } = this.props;

        const errorMessage = <Text style={styles.loginErrorMessage}>Invalid household name or password!</Text>;

        return(
            <View style={styles.loginContainer}>
                <Text style={styles.loginTitle}>Welcome to the Shopping List App!</Text>
                { loginErrorMsg ? errorMessage : <Text></Text>}
                <TextInput onChangeText={(household) => this.setState({household: household})} placeholder="Household" style={styles.textInputStyle} />
                <TextInput secureTextEntry={true} onChangeText={(password) => this.setState({password: password})} placeholder="Password" style={styles.textInputStyle} />
                <TouchableOpacity onPress={() => login(this.state)}>
                <Text style={styles.loginButtonView}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        )
    }
}