import React, { Component } from 'react';
import {Text, TextInput, View, TouchableOpacity} from 'react-native';
import styles from '../styles/Styles';

export default class CreateShoppingList extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { login, loginErrorMsg } = this.props;

        const errorMessage = <Text style={styles.errorMessage}>Invalid household name or password!</Text>;

        return(
            <View style={styles.container}>
                <Text style={[styles.title, styles.font20]}>Welcome to the Shopping List App!</Text>
                { loginErrorMsg ? errorMessage : <Text></Text>}
                <TextInput onChangeText={(household) => this.setState({household: household})} placeholder="Household" style={[styles.createShoppingListStyle, styles.h40]} />
                <TextInput secureTextEntry={true} onChangeText={(password) => this.setState({password: password})} placeholder="Password" style={[styles.createShoppingListStyle, styles.h40]} />
                <TouchableOpacity onPress={() => login(this.state)}>
                <Text style={[styles.button, styles.bcDarkblue]}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        )
    }
}