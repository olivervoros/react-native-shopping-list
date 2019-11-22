import React, { Component } from 'react';
import { Text, View, Button, StyleSheet} from 'react-native';
import { Input } from 'react-native-elements';

export default class CreateShoppingList extends Component {

    constructor(props) {
        super(props);
    }

    backToMain = () => {
        this.setState({ loggedIn: true });
    }

    render() {

        return(
            <View style={styles.container}>
                <Text>Welcome to the Shopping List App!</Text>
                <Input label="Email"/>
                <Input label="Password"/>
                <Button onPress={this.backToMain} title="Back to Home"/>
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
});