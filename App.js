import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {Dimensions, Platform, StatusBar, View} from 'react-native';
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
import {createStackNavigator} from '@react-navigation/stack';
import EntryDetail from "./components/EntryDetail";
import Live from "./components/Live";


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


const TabNav = () => (
    <Tabs.Navigator
        initialRouteName="AddEntry"
        screenOptions={({route}) => ({
            tabBarIcon: ({color, size}) => {
                switch (route.name) {
                    case "Add Entry": {
                        return <FontAwesome name="plus-square" size={size} color={color}/>
                    }
                    case "History": {
                        return <Ionicons name="ios-bookmarks" size={size} color={color}/>
                    }
                    case "Live": {
                        return <Ionicons name="ios-speedometer" size={size} color={color}/>
                    }
                    default:
                        return ""
                }
            }
        })}
        tabBarOptions={{
            header: null,
            activeTintColor: Platform.OS === "ios" ? purple : white,
            showIcon: Platform.OS === "ios",
            style: {
                height: Platform.OS === "ios" ? 80 : 50,
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
        <Tabs.Screen name="Live" component={Live}/>
    </Tabs.Navigator>
);


const Stack = createStackNavigator();
const MainNav = () => (
    <Stack.Navigator headerMode="screen">
        <Stack.Screen
            name="Home"
            component={TabNav}
            options={{headerShown: false}}/>
        <Stack.Screen
            name="EntryDetail"
            component={EntryDetail}
            options={{
                headerTintColor: white,
                headerStyle: {
                    backgroundColor: purple,
                },
                headerTitleStyle: {width: Dimensions.get("window").width}
            }}/>
    </Stack.Navigator>
);


export default class App extends Component {


    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <NavigationContainer>
                        <UdaciStatusBar backgroundColor={purple} barStyle="light-content"/>
                        <MainNav/>
                    </NavigationContainer>
                </View>
            </Provider>

        );
    }
}
