export const APPLICATION_ACTION_TYPES = {
    RECEIVE_ENTRIES: "RECEIVE_ENTRIES",
    ADD_ENTRY: "ADD_ENTRY"
};

export function receiveEntries(entries) {
    return {
        type: APPLICATION_ACTION_TYPES.RECEIVE_ENTRIES,
        entries
    }
}


export function addEntry(entry) {
    return {
        type: APPLICATION_ACTION_TYPES.ADD_ENTRY,
        entry
    }
}
