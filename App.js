import { AppRegistry } from 'react-native';
import Home from './components/Home';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from "redux";
import reducer from './store/reducers/shoppinglistreducer';
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk));

const App = () => (
    <Provider store={store}>
        <Home />
    </Provider>
);

export default App;

AppRegistry.registerComponent('shoppinglistapp', () => App);