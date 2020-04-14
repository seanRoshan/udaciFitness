import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getDailyReminderValue, getMetricMetaInfo, timeToString} from "../utils/helpers";
import UdaciSlider from "./UdaciSlider";
import UdaciSteppers from "./UdaciSteppers";
import DateHeader from "./DateHeader";
import {Ionicons} from "@expo/vector-icons";
import TextButton from "./TextButton";
import {removeEntry, submitEntry} from "../utils/api";
import {connect} from 'react-redux';
import {addEntry} from "../actions";
import {purple, white} from "../utils/colors";

function SubmitBtn({onPress}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}


class AddEntry extends Component {

    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0,
    }


    increment = (metric) => {
        const {max, step} = getMetricMetaInfo(metric);
        this.setState((state) => {
            const count = state[metric] + step;
            return {
                ...state,
                [metric]: count > max ? max : count
            }
        })
    }

    decrement = (metric) => {
        const {step} = getMetricMetaInfo(metric);
        this.setState((state) => {
            const count = state[metric] - step;
            return {
                ...state,
                [metric]: count > 0 ? count : 0
            }
        })
    }

    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value
        }))
    }

    submit = () => {
        const key = timeToString();
        const entry = this.state;

        this.props.dispatch(addEntry({
            [key]: entry
        }));

        this.setState(() => ({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0,
        }))

        // todo: Navigate to Home

        submitEntry({entry, key});

        // todo: Clear local notification
    }


    reset = () => {
        const key = timeToString();

        this.props.dispatch(addEntry({
            [key]: getDailyReminderValue()
        }));

        // todo: Route to Home

        removeEntry(key);
    }


    render() {

        const metaInfo = getMetricMetaInfo();


        if (this.props.alreadyLogged) {
            return (
                <View style={styles.center}>
                    <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-happy' : 'md-happy'}
                        size={100}
                    />
                    <Text>You already logged your information for today!</Text>
                    <TextButton style={{padding: 10}} onPress={this.reset}>Reset</TextButton>
                </View>
            )
        }


        return (
            <View style={styles.container}>
                <DateHeader date={new Date().toLocaleDateString()}/>
                {Object.keys(metaInfo).map((key) => {
                    const {getIcon, type, ...rest} = metaInfo[key];
                    const value = this.state[key];
                    return (
                        <View key={key} style={styles.row}>
                            {getIcon()}
                            {
                                type === 'slider'
                                    ? <UdaciSlider
                                        value={value}
                                        onChange={(value) => this.slide(key, value)}
                                        {...rest}
                                    />
                                    : <UdaciSteppers
                                        value={value}
                                        onIncrement={() => this.increment(key)}
                                        onDecrement={() => this.decrement(key)}
                                        {...rest}
                                    />
                            }
                        </View>)
                })}
                <SubmitBtn onPress={this.submit}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
        marginLeft: 30,
    }
});

function mapStateToProps(state) {
    const key = timeToString();
    return {
        alreadyLogged: state[key] && !state[key].today
    }
}

export default connect(mapStateToProps)(AddEntry);
