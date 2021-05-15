import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Button,
	FlatList,
} from "react-native";

import GoalItem from './components/GoalItem'

export default function App() {
	const [enteredGoal, setEnteredGoal] = useState("");
	const [all_goals, setGoals] = useState([]);

	const goalInputHandler = (enteredText) => {
		setEnteredGoal(enteredText);
	};

	const addGoalHandler = () => {
		setGoals((current_goals) => [...current_goals, {key:Math.random().toString(),value:enteredGoal} ]);
	};

	return (
		<View style={styles.screen}>
			<View style={styles.innerView}>
				<TextInput
					placeholder="Course Goal"
					style={styles.inputField}
					onChangeText={goalInputHandler}
					value={enteredGoal}
				/>
				<Button title="Add" onPress={addGoalHandler} />
			</View>
			<FlatList
				data={all_goals}
				renderItem={itemData => (
					 <GoalItem title={itemData.item.value}/>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		padding: 50,
	},
	innerView: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	inputField: {
		width: "80%",
		borderBottomColor: "black",
		borderWidth: 1,
		padding: 10,
	},
});
