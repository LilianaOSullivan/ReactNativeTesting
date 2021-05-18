import React, { useState, useRef,useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import NumberContainer from "../components/NumberContainer";

import Card from "../components/Card";

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);

	const randomNumber = Math.floor(Math.random() * (max - min) + min);
	if (randomNumber === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return randomNumber;
	}
};

const GameScreen = (props) => {
	const [currentGuess, setCurrentGuess] = useState(
		generateRandomBetween(1, 100, props.userChoice)
	);

    const [attempts,setAttempts] = useState(0);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);

    const {userChoice, onGameOver} = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(attempts);
        }
    },[currentGuess,userChoice,onGameOver]);

	const nextGuessHandler = (direction) => {
		if (
			(direction === "LOWER" && currentGuess < props.userChoice) ||
			(direction === "GREATER" && currentGuess > props.userChoice)
		) {
			Alert.alert("Don't lie!", "You know this is wrong....", [
				{ text: "Sorry!", style: "cancel" },
			]);
			return;
		}
		if (direction === "LOWER") {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess;
		}
		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);
        setCurrentGuess(nextNumber);
        setAttempts(curAttempts => curAttempts + 1);
	};

	return (
		<View style={styles.screen}>
			<Text>Opponent's Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<Button
					title="LOWER"
					onPress={nextGuessHandler.bind(this, "LOWER")}
				/>
				<Button
					title="HIGHER"
					onPress={nextGuessHandler.bind(this, "HIGHER")}
				/>
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
		width: 300,
		maxWidth: "80%",
	},
});

export default GameScreen;
