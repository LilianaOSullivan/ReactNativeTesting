import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import Header from "./components/Header";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [guessAttempts, setGuessAttempts] = useState(0);

	const configureNewGame = () => {
		setGuessAttempts(0);
		setUserNumber(null);

	};

	const startGameHandler = (selectedNumber) => {
		setUserNumber(selectedNumber);
	};

	const gameOverHandler = (numberOfAttempts) => {
		setGuessAttempts(numberOfAttempts);
	};

	let content = <StartGameScreen onStartGame={startGameHandler} />;

	if (userNumber && guessAttempts <= 0) {
		content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>;
	}
	else if (guessAttempts > 0) {
		content = <GameOverScreen roundsNumber={guessAttempts} userNumber={userNumber} onRestart={configureNewGame}/>
	}
	return (
		<View style={styles.screen}>
			<Header title={"Guess a number"} />
			{content}
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
