import React, { Component } from 'react';
import { View, Button, StyleSheet} from 'react-native';
import { Input } from 'react-native-elements';

export default class CreateShoppingList extends Component {

    constructor(props) {
        super(props);
    }

    backToMain = () => {
        this.setState({ displayCreateForm: false });
    }

    render() {

        return(
            <View style={styles.container}>
                <Input label="Title"/>
                <Input label="Author"/>
                <Input label="Date: (dd/mm/yyyy)"/>
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