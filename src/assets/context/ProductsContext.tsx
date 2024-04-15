import React, {createContext, Dispatch, useContext, useReducer} from 'react';
import {CartItem} from "../../App.tsx";
import cartReducer, {CartAction} from "../reducers /CartReducer.tsx";

// контексты для передачи значений и действий с ним в корзине

const CartContext = createContext<CartItem[]> ([]);

const CartDispatchContext = createContext<Dispatch<CartAction> | null>(null);


// тут создаем штуку чтобы передавать все это в app
interface Props {
    children: React.ReactNode;
}

export const CartProvider = ({ children }: Props) => {
    const [items, dispatch] = useReducer(
        cartReducer,
        []
    );

    return (
        <CartContext.Provider value={items}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}

export function useCartDispatch() {
    return useContext(CartDispatchContext);
}

