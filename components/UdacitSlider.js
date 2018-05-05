import React from 'react'
import {Text, View, Slider} from 'react-native'

export default UdacitSlider = ({min, max, unit, step, value, onChange}) => (
	<View>
		<Slider
			step={step}
			value={value}
			maximumValue={max}
			minimumValue={min}
			onValueChange={onChange}
		/>
		<View>
			<Text>{unit}</Text>
			<Text>{value}</Text>
		</View>
	</View>
)