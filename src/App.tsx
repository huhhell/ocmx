import styled from "styled-components";
import Reviews from "./assets/components/Reviews /Reviews.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Cart from "./assets/components/Cart/Cart.tsx";
import {CartProvider} from "./assets/context/ProductsContext.tsx";
import Products from "./assets/components/Products /Products.tsx";

export interface Product {
    id: number,
    image_url: string,
    title: string,
    description: string,
    price: number,
}

export interface Page {
    page: number,
    amount: number,
    total: number,
    products: Product[]
}

export interface CartItem {
    id: number,
    quantity: number,
}

function App() {
    const [page, setPage] = useState<Page>();

    useEffect(() => {
        const url = 'http://o-complex.com:1337/products?page=1&page_size=20';
        axios.get(url).then(response => setPage(response.data));
    }, [])

    return <CartProvider>
        <Container>
            <Title>Тестовое задание</Title>
            <Reviews/>
            <Cart products={page ? page.products : []}/>
            <Products page={page}/>
    </Container>
    </CartProvider>
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
