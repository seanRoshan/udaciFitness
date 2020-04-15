import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import {connect} from 'react-redux';
import MetricCard from "./MetricCard";
import {white} from "../utils/colors";
import {addEntry} from "../actions";
import {getDailyReminderValue, timeToString} from "../utils/helpers";
import {removeEntry} from "../utils/api";
import TextButton from "./TextButton";


class EntryDetail extends Component {

    setTitle = (entryId) => {
        if (!entryId) return;

        const year = entryId.slice(0, 4)
        const month = entryId.slice(5, 7)
        const day = entryId.slice(8)

        this.props.navigation.setOptions({
            title: `${month}/${day}/${year}`
        });
    };

    reset = () => {
        const {remove, goBack, entryId} = this.props;
        remove();
        goBack();
        removeEntry(entryId);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.metrics && !nextProps.metrics.today;
    }

    render() {
        const {entryId, metrics} = this.props;
        this.setTitle(entryId);
        return (
            <View style={styles.container}>
                <MetricCard metrics={metrics} date={entryId}/>
                <TextButton onPress={this.reset} style={{margin: 20}}>Reset</TextButton>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15
    }
});


function mapStateToProps(state, {route}) {
    const {entryId} = route.params;
    return ({
            entryId,
            metrics: state[entryId]
        }
    )
}

function mapDispatchToProps(dispatch, {route, navigation}) {
    const {entryId} = route.params;
    return {
        remove: () => dispatch(addEntry({
            [entryId]: timeToString() === entryId
                ? getDailyReminderValue()
                : null
        })),
        goBack: () => navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);
