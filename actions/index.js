const RECEIVE_ENTRRIES = 'RECEIVE_ENTRIES'

const ADD_ENTRY = "ADD_ENTRY"

export function receiveEntries(entries) {
	return{
		action: RECEIVE_ENTRRIES,
		entries
	}
}

export function addEntry(entry) {
	return{
		action: ADD_ENTRY,
		entry
	}
}f