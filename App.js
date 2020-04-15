import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {Platform, StatusBar, View} from 'react-native';
import {createStore} from "redux";
import reducer from './reducers';
import {Provider} from "react-redux";
import History from "./components/History";
import AddEntry from "./components/AddEntry";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {purple, white} from "./utils/colors";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import Constants from "expo-constants";


function UdaciStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </View>
    )
}


const Tabs =
    Platform.OS === "ios"
        ? createBottomTabNavigator()
        : createMaterialTopTabNavigator();

export default class App extends Component {


    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <NavigationContainer>
                        <UdaciStatusBar backgroundColor={purple} barStyle="light-content"/>
                        <Tabs.Navigator
                            initialRouteName="AddEntry"
                            screenOptions={({route}) => ({
                                tabBarIcon: ({color, size}) => {
                                    let icon;
                                    if (route.name === "Add Entry") {
                                        icon = (
                                            <FontAwesome name="plus-square" size={size} color={color}/>
                                        );
                                    } else if (route.name === "History") {
                                        icon = (
                                            <Ionicons name="ios-bookmarks" size={size} color={color}/>
                                        );
                                    }
                                    return icon;
                                }
                            })}
                            tabBarOptions={{
                                header: null,
                                activeTintColor: Platform.OS === "ios" ? purple : white,
                                showIcon: true,
                                style: {
                                    height: 80,
                                    backgroundColor: Platform.OS === "ios" ? white : purple,
                                    shadowColor: "rgba(0, 0, 0, 0.24)",
                                    shadowOffset: {
                                        width: 0,
                                        height: 3
                                    },
                                    shadowRadius: 6,
                                    shadowOpacity: 1
                                }
                            }}
                        >
                            <Tabs.Screen name="Add Entry" component={AddEntry}/>
                            <Tabs.Screen name="History" component={History}/>
                        </Tabs.Navigator>
                    </NavigationContainer>
                </View>
            </Provider>

        );
    }
}
