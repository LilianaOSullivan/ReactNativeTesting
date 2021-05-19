import React from "react";
import { View, StyleSheet, Image,Text } from "react-native";

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

import Colors from '../constants/color'

const GameOverScreen = (props) => {
	return (
		<View style={styles.screen}>
			<TitleText>The Game is Over!</TitleText>
			<View style={styles.imageContainer}>
				<Image
					source={require("../assets/success.png")}
					style={styles.image}
					resizeMode="cover"
				/>
			</View>
			<BodyText style={styles.resultText}>
				Your phone needed <Text style={styles.highlight}>{props.attemptsNumber}</Text> to guess
				the number <Text style={styles.highlight}>{props.userNumber}</Text>
			</BodyText>
			<MainButton onPress={props.onRestart} >New Game</MainButton>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	imageContainer: {
		width: 300,
		height: 300,
		borderRadius: 150,
		borderWidth: 3,
		borderColor: "black",
		overflow: "hidden",
		marginVertical: 30,
	},
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
    },
    resultText: {
        textAlign:'center',
        fontSize:20,
        marginVertical:15,
        marginHorizontal:50
    },
});

export default GameOverScreen;
