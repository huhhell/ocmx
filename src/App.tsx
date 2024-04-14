import styled from "styled-components";
import Reviews from "./assets/components/Reviews /Reviews.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Cart from "./assets/components/Cart/Cart.tsx";

export interface Product {
    id: number,
    image_url: string,
    title: string,
    description: string,
    price: number,
}

interface Page {
    page: number,
    amount: number,
    total: number,
    items: Product[]
}

export interface CartItem {
    id: number,
    quantity: number,
}

function App() {
    const [products, setProducts] =  useState<Page>();
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const url = 'http://o-complex.com:1337/reviews';
        axios.get(url).then(response => setProducts(response.data));
    }, [])

    function addToCart(id: number) {
        setCart([...cart, {id: id, quantity: 1}])
    }

    function increaseItemInCart(id: number) {
        let newCart = [...cart];
        newCart[id].quantity += 1;

        setCart(newCart);
    }

    function decreaseItemInCart(id: number) {
        let newCart = [...cart];
        newCart[id].quantity -= 1;
        if (newCart[id].quantity === 0) {
            newCart = newCart.filter(i => i.id !== id && i)
        }

        setCart(newCart);
    }

    return <Container>
        <Title>Тестовое задание</Title>
        <Reviews/>
        <Cart items={cart} products={products?.items}/>
    </Container>
}

export default App

const Container = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    padding: 40px;
`

const Title = styled.h1`
    font-size: 40px;
    padding: 20px;
    color: #ffffff;
    background: #777;
    text-align: center;
    margin-bottom: 30px;
    
    @media(max-width: 500px) {
        font-size: 30px;
    }
`
