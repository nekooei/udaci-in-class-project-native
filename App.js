import React from 'react';
import {StyleSheet, View} from 'react-native';
import AddEntry from "./components/AddEntry";
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'

export default class App extends React.Component {
	render() {
		return (
			<Provider store={createStore(reducer)}>
				<View>
					<AddEntry/>
				</View>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
