import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    ScrollView,
    Alert,
    Image
} from 'react-native';
import CreateShoppingList from './CreateShoppingList';
import LoginForm from './LoginForm';
import ViewShoppingList from "./ViewShoppingList";
import UpdateShoppingList from "./UpdateShoppingList";
import styles from '../styles/Styles';
import { supermarketImage } from '../assets/index';
import * as ActionCreator from "../store/actions/actions";
import { connect } from 'react-redux';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedIn : false,
            loginErrorMsg : false,
            shoppingLists: [],
            viewShoppingListID: 0,
            updateShoppingListID: 0,
            page: "HOME"
        }
    }

    componentDidUpdate = async () => {

        await this.props.loadShoppingList();

    };

    confirmDeleteAlert = async (deletedId) => {
        Alert.alert(
            'Hello!',
            'You are about to delete a shopping list item! Are you sure?',
            [
                {text: 'Ooops, NO!', onPress: () => {} },
                {text: 'YES, delete it!', onPress: () => this.props.deleteShoppingList(deletedId)},
            ],
            {cancelable: false},
        );
    }

    render() {

        if( ! this.props.loggedIn) {
            return <LoginForm loginErrorMsg={this.props.loginErrorMsg} login={this.props.login}></LoginForm>
        }


        if( this.props.page==="VIEW") {
            return <ViewShoppingList backToHome={this.props.backToHome} confirmDeleteAlert={this.confirmDeleteAlert} loadUpdateForm={this.props.loadUpdateForm} shoppingLists={this.props.shoppingLists} viewShoppingListID={this.props.viewShoppingListID}></ViewShoppingList>
        }

        if (this.props.page==="UPDATE") {
            return <UpdateShoppingList backToHome={this.props.backToHome} updateShoppingList={this.props.updateShoppingList} shoppingLists={this.props.shoppingLists} updateShoppingListID={this.props.updateShoppingListID}></UpdateShoppingList>
        }

        if(this.props.page==="CREATE") {
            return <CreateShoppingList backToHome={this.props.backToHome} createShoppingList={this.props.createShoppingList} ></CreateShoppingList>
        }

        const loginButton = <TouchableOpacity onPress={this.props.login}><Text style={styles.addShoppingListButtonText}>LOGIN</Text></TouchableOpacity>;

        const logoutButton = <TouchableOpacity onPress={this.props.logout}><Text style={styles.addShoppingListButtonText}>LOGOUT</Text></TouchableOpacity>;

        return (
                <ScrollView>
                    <View style={[styles.container, styles.mt75]}>
                        <Text style={styles.title}>Shopping List App</Text>
                        <Image
                            style={ styles.image }
                            source={ supermarketImage }
                        />
                        <TouchableOpacity style={[styles.button, styles.bcLightBlue]} onPress={this.props.loadCreateForm}>
                            <Text style={styles.addShoppingListButtonText}>CREATE NEW SHOPPING LIST</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>View Shopping Lists:</Text>
                        {this.props.shoppingLists.map((shoppingList, i) =>
                            <TouchableOpacity key={shoppingList._id} onPress={() => this.props.viewShoppingListItem(shoppingList._id)}>
                                <Text style={styles.shoppingListItem} key={shoppingList._id}>{shoppingList.title}</Text>
                            </TouchableOpacity>
                        )}
                        <View style={[styles.button, styles.bcDarkblue]}>
                            {this.props.loggedIn ? logoutButton : loginButton}
                        </View>
                    </View>
                </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn : state.loggedIn,
        loginErrorMsg : state.loginErrorMsg,
        shoppingLists: state.shoppingLists,
        fullShoppingList: state.fullShoppingList,
        viewShoppingListID: state.viewShoppingListID,
        updateShoppingListID: state.updateShoppingListID,
        page: state.page
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadShoppingList: () => dispatch(ActionCreator.loadAllShoppingLists()),
        createShoppingList: (args) => dispatch(ActionCreator.createNewShoppingList(args)),
        updateShoppingList: (updateShoppingListID, shoppingListItem, args) => dispatch(ActionCreator.updateShoppingList(updateShoppingListID, shoppingListItem, args)),
        deleteShoppingList: (id) => dispatch(ActionCreator.deleteShoppingList(id)),
        loadCreateForm: () => dispatch({type: 'LOAD_CREATE_FORM'}),
        loadUpdateForm: (id) => dispatch(ActionCreator.loadUpdateForm(id)),
        login: (args) => dispatch(ActionCreator.login(args)),
        logout: () => dispatch(ActionCreator.logout()),
        viewShoppingListItem: (_id) => dispatch(ActionCreator.viewShoppingListItem(_id)),
        backToHome: () => dispatch({type: 'BACK_TO_HOME'})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);