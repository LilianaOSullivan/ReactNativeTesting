import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import Header from "./components/Header";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
	return Font.loadAsync({
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
	});
};

export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [guessAttempts, setGuessAttempts] = useState(0);
	const [dataLoaded, setDataLoaded] = useState(false);

	if (!dataLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setDataLoaded(true)}
				onError={(err) => console.log(err)}
			/>
		);
	}

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
		content = (
			<GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
		);
	} else if (guessAttempts > 0) {
		content = (
			<GameOverScreen
				attemptsNumber={guessAttempts}
				userNumber={userNumber}
				onRestart={configureNewGame}
			/>
		);
	}
	return (
		<SafeAreaView style={styles.screen}>
			<Header title={"Guess a number"} />
			{content}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
