export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      let existingItem = state.items.find(
        (item) => action.payload.id === item.id
      );

      if (existingItem) {
        existingItem.quantity + 1;
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }

    case 'REMOVE_CART_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case 'INCREMENT_PRODUCT':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case 'DECREMENT_PRODUCT':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    default:
      return state;
  }
};
