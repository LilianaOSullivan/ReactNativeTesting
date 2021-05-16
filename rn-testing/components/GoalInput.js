import React, { useState } from "react";
import { View, Button, TextInput, StyleSheet, Modal } from "react-native";

const GoalInput = (props) => {
	const [enteredGoal, setEnteredGoal] = useState("");

	const goalInputHandler = (enteredText) => {
		setEnteredGoal(enteredText);
	};

	const addGoalHandler = () => {
		props.onAddGoal(enteredGoal);
		setEnteredGoal("");
	};

	return (
		<Modal visible={props.visible} animationType="slide">
			<View style={styles.innerView}>
				<TextInput
					placeholder="Course Goal"
					style={styles.inputField}
					onChangeText={goalInputHandler}
					value={enteredGoal}
				/>
				<View style={styles.buttonContainer}>
					<View style={styles.button}>
						<Button
							title="Cancel"
							color="red"
							onPress={props.onCancel}
						/>
					</View>
					<View style={styles.button}>
						<Button title="Add" onPress={addGoalHandler} />
					</View>
				</View>
			</View>
		</Modal>
	);
};
const styles = StyleSheet.create({
	innerView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	inputField: {
		width: "80%",
		borderBottomColor: "black",
		borderWidth: 1,
		padding: 10,
		marginBottom: 10,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "60%",
	},
	button: {
		width: "40%",
	},
});

export default GoalInput;
