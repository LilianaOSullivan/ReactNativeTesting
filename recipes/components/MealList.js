import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import MealItem from "./MealItem";


const MealList = (props) => {
	const renderMealItem = (itemData) => {
		return (
			<MealItem
				title={itemData.item.title}
				image={itemData.item.imageUrl}
				duration={itemData.item.duration}
				complexity={itemData.item.complexity.toUpperCase()}
				affordability={itemData.item.affordability.toUpperCase()}
				onSelect={() => {
					props.navigation.navigate("MealDetail", {
						mealId: itemData.item.id,
					});
				}}
			/>
		);
	};

	return (
		<View style={styles.screen}>
			<FlatList
				data={props.listData}
				renderItem={renderMealItem}
				style={{ width: "100%" }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default MealList;
