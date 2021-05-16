import React, { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
	const [goals, setGoals] = useState([]);
	const [isAddMode, setIsAddMode] = useState(false);

	const addGoalHandler = (goalTitle) => {
		setGoals((current_goals) => [
			...current_goals,
			{ key: Math.random().toString(), value: goalTitle },
		]);
		setIsAddMode(false);
	};

	const removeGoalHandler = (goalId) => {
		setGoals((goals) => {
			return goals.filter((goal) => goal.key !== goalId);
		});
	};

	const cancelGoalHandler = () => {
		setIsAddMode(false);
	};

	return (
		<View style={styles.screen}>
			<Button title="Add new goal" onPress={() => setIsAddMode(true)} />
			<GoalInput
				visible={isAddMode}
				onAddGoal={addGoalHandler}
				onCancel={cancelGoalHandler}
			/>
			<FlatList
				data={goals}
				renderItem={(itemData) => (
					<GoalItem
						title={itemData.item.value}
						id={itemData.item.key}
						onDelete={removeGoalHandler}
					/>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		padding: 50,
	},
});
