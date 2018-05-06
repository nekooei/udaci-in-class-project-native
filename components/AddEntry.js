import React, {Component} from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import {getMetricMetaInfo, timeToString, getDailyReminderValue} from '../utils/helpers'
import UdaciSlider from './UdacitSlider'
import UdaciStepper from './UdaciStepper'
import DateHelper from "./DateHelper"
import {Ionicons} from '@expo/vector-icons'
import TextButton from './TextButton'
import {submitEntry, removeEntry} from "../utils/api";
import { connect } from 'react-redux'
import { addEntry } from '../actions'

function SubmitBtn({onPress}) {
	return (
		<TouchableOpacity
			onPress={onPress}>
			<Text>Submit</Text>
		</TouchableOpacity>
	)
}

class AddEntry extends Component {

	state = {
		bike: 0,
		run: 0,
		swim: 0,
		sleep: 0,
		eat: 0
	}

	increment = (metric) => {
		const {max, step} = getMetricMetaInfo(metric)

		this.setState(state => {
			const count = state[metric] + step

			return {
				...state,
				[metric]: count > max ? max : count
			}
		})
	}

	submit = () => {
		const key = timeToString()
		const entry = this.state

		this.props.dispatch(addEntry({
			[key]: entry
		}))

		this.setState({
			bike: 0,
			run: 0,
			swim: 0,
			sleep: 0,
			eat: 0
		})

		submitEntry({entry, key})

		// navigate to home

		// reset notification
	}

	decrement = (metric) => {
		this.setState(state => {
			const count = state[metric] - getMetricMetaInfo(metric).step

			return {
				...state,
				[metric]: count < 0 ? 0 : count
			}
		})
	}

	slide = (metric, value) => {
		this.setState({
			[metric]: value
		})
	}

	reset = () => {
		const key = timeToString()

		this.props.dispatch(addEntry({
			[key] : getDailyReminderValue()
		}))

		// route to home

		removeEntry(key)
	}

	render() {
		const metaInfo = getMetricMetaInfo()

		if (this.props.alreadyLogged) {
			return (
				<View>
					<Ionicons
						name={'ios-happy-outline'}
						size={100}
					/>
					<Text>You have already logged for today</Text>
					<TextButton onPress={this.reset}>
						RESET
					</TextButton>
				</View>
			)
		}

		return (
			<View>
				<DateHelper date={new Date().toLocaleDateString()}/>
				{Object.keys(metaInfo).map(metricKey => {
					const {getIcon, type, ...rest} = metaInfo[metricKey]
					const value = this.state[metricKey]

					return (
						<View key={metricKey}>
							{getIcon()}
							{type === 'slider' ?
								<UdaciSlider
									value={value}
									onChange={(value) => this.slide(metricKey, value)}
									{...rest}
								/>
								:
								<UdaciStepper
									value={value}
									onIncrement={() => this.increment(metricKey)}
									onDecrement={() => this.decrement(metricKey)}
									{...rest}
								/>}

						</View>
					)
				})}
				<SubmitBtn onPress={this.submit}/>
			</View>
		);
	}

}

function mapStateToProps(state){
	const key = timeToString()

	return{
		alreadyLogged: state[key] && typeof state[key].today === 'undefined'
	}
}

export default connect(mapStateToProps)(AddEntry)