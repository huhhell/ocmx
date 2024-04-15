import {CartItem} from "../../App.tsx";

export enum CartActionKind {
    ADD= 'ADD',
    INCREASE = 'INCREASE',
    DECREASE = "DECREASE",
}

export interface CartAction {
    type: CartActionKind;
    itemId: number;
}

export default function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
    const indexInCart = items.findIndex(i => i.id === action.itemId);

    switch (action.type) {
        case CartActionKind.ADD:
            return [...items, {id: action.itemId, quantity: 1}]

        case CartActionKind.INCREASE:
            return items.map(i => i.id === action.itemId ? {...i,  quantity: i.quantity + 1} : i)

        case CartActionKind.DECREASE:
            let newCart = [...items];
            newCart[indexInCart].quantity -= 1;

            if (newCart[indexInCart].quantity === 0) {
                newCart = newCart.filter(i => i.id !== action.itemId && i)
            }
            return newCart

        default:
            throw Error('Unknown action: ' + action.type);
    }
}