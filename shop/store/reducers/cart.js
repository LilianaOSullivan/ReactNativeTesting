import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import CartItem from "../../models/cart-item";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
	items: {},
	total: 0,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			const addedProduct = action.product;
			const productPrice = addedProduct.price;
			const productTitle = addedProduct.title;

			let updatedCartItem;

			if (state.items[addedProduct.id]) {
				// Item in cart
				updatedCartItem = new CartItem(
					state.items[addedProduct.id].quantity + 1,
					productPrice,
					productTitle,
					state.items[addedProduct.id].sum + productPrice
				);
			} else {
				updatedCartItem = new CartItem(
					1,
					productPrice,
					productTitle,
					productPrice
				);
			}
			return {
				...state,
				items: { ...state.items, [addedProduct.id]: updatedCartItem },
				total: state.total + productPrice,
			};
		case REMOVE_FROM_CART:
			const selectedCartItem = state.items[action.productId];
			const currentQuantity = selectedCartItem.quantity;
			let updatedCartItems;
			if (currentQuantity > 1) {
				// Delete 1 from quantity
				const updatedCartItem = new CartItem(
					selectedCartItem.quantity - 1,
					selectedCartItem.productPrice,
					productTitle,
					selectedCartItem.sum - selectedCartItem.productPrice
				);
				updatedCartItems = {
					...state.items,
					[action.productId]: updatedCartItem,
				};
			} else {
				// Remove item
				updatedCartItems = { ...state.items };
				delete updatedCartItems[action.productId];
			}
			return {
				...state,
				items: updatedCartItems,
				total: state.total - selectedCartItem.productPrice,
			};
		case ADD_ORDER:
			return initialState;

		case DELETE_PRODUCT:
			if (!state.items[action.productId]) {
				return state;
			}
			const updatedItems = { ...state.items };
			const itemTotal = state.items[action.productId].sum;
			delete updatedItems[action.productId];
			return {
				...state,
				items: updatedItems,
				total: state.total - itemTotal,
			};
	}

	return state;
};
