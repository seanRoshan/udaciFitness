import {APPLICATION_ACTION_TYPES} from "../actions";

function entries(state = {}, action) {
    switch (action.type) {
        case APPLICATION_ACTION_TYPES.RECEIVE_ENTRIES: {
            return {
                ...state,
                ...action.entries
            }
        }
        case APPLICATION_ACTION_TYPES.ADD_ENTRY: {
            return {
                ...state,
                ...action.entry
            }
        }
        default: {
            return state;
        }

    }
}

export default entries;
