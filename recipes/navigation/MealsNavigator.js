import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Platform, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import Colors from "../constants/Colors";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";

const defaultStackNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === "android" ? Colors.primary : "",
	},
	headerTitleStyle: {
		fontFamily: "open-sans-bold",
	},
	headerBackTitleStyle: {
		fontFamily: "open-sans",
	},
	headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
	headerTitle: "A Screen",
};

const MealsNavigator = createStackNavigator(
	{
		Categories: {
			screen: CategoriesScreen,
			navigationOptions: {
				headerTitle: "Meal Categories",
			},
		},
		CategoryMeals: {
			screen: CategoryMealsScreen,
		},
		MealDetail: MealDetailScreen,
	},
	{
		defaultNavigationOptions: defaultStackNavOptions,
	}
);

const FavNavigator = createStackNavigator(
	{
		Favorites: FavoritesScreen,
		MealDetail: MealDetailScreen,
	},
	{
		defaultNavigationOptions: defaultStackNavOptions,
	}
);

const tabScreenConfig = {
	Meals: {
		screen: MealsNavigator,
		navigationOptions: {
			tabBarIcon: (tabInfo) => {
				return (
					<Ionicons
						name="restaurant"
						size={25}
						color={tabInfo.tintColor}
					/>
				);
			},
			tabBarColor: Colors.primary,
			tabBarLabel:
				Platform.OS === "android" ? (
					<Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
				) : (
					"Meals"
				),
		},
	},
	Favorites: {
		screen: FavNavigator,
		navigationOptions: {
			tabBarLabel: "Favorites!",
			tabBarIcon: (tabInfo) => {
				return (
					<Ionicons name="star" size={25} color={tabInfo.tintColor} />
				);
			},
			tabBarLabel:
				Platform.OS === "android" ? (
					<Text style={{ fontFamily: "open-sans-bold" }}>
						Favorites
					</Text>
				) : (
					"Favorites"
				),
			tabBarColor: Colors.accent,
		},
	},
};

const MealsFavTabNavigator =
	Platform.OS === "android"
		? createMaterialBottomTabNavigator(tabScreenConfig, {
				activeColor: "white",
				shifting: true,
		  })
		: createBottomTabNavigator(tabScreenConfig, {
				tabBarOptions: {
					labelStyle: {
						fontFamily: "open-sans-bold",
					},
					activeTintColor: Colors.accent,
				},
		  });

const FiltersNavigator = createStackNavigator(
	{
		Filters: FiltersScreen,
	},
	{
		// navigationOptions: {
		// 	drawerLabel: "Filter",
		// },
		defaultNavigationOptions: defaultStackNavOptions,
	}
);

const MainNavigator = createDrawerNavigator(
	{
		MealsFavs: {
			screen: MealsFavTabNavigator,
			navigationOptions: { drawerLabel: "Meals" },
		},
		Filter: FiltersNavigator,
	},
	{
		contentOptions: {
			activeTintColor: Colors.accent,
			labelStyle: {
				fontFamily: "open-sans-bold",
			},
		},
	}
);

export default createAppContainer(MainNavigator);
