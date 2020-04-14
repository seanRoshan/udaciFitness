import React, {Component} from 'react';
import {View} from 'react-native';
import AddEntry from "./components/AddEntry";
import {createStore} from "redux";
import reducer from './reducers';
import {Provider} from "react-redux";



export default class App extends Component {
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <AddEntry/>
                </View>
            </Provider>

        );
    }
}
