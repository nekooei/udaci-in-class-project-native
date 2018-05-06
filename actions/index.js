export const RECEIVE_ENTRRIES = 'RECEIVE_ENTRIES'

export const ADD_ENTRY = "ADD_ENTRY"

export function receiveEntries(entries) {
	return{
		type: RECEIVE_ENTRRIES,
		entries
	}
}

export function addEntry(entry) {
	return{
		type: ADD_ENTRY,
		entry
	}
}