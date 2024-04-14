import styled from "styled-components";
import {CartItem, Product} from "../../../App.tsx";


interface Props {
    items: CartItem[];
    products: Product[];
}
export default function Cart({items, products}: Props) {

const itemsInCart = items.map(i => {
    const product = getProductWithId(i.id, products);
    if (product === undefined) return

    return <Item key={i.id}>
        <ItemName>{product.title}</ItemName>
        <ItemCount>x{i.quantity}</ItemCount>
        <ItemTotalPrice>{product.price * i.quantity}₽</ItemTotalPrice>
    </Item>
})

    return <Container>
        <Title>Добавленные товары</Title>
        {items.length === 0 ?
            <EmptyText>Корзина пуста</EmptyText> :
            <List>
                {itemsInCart}
            </List>}
    </Container>
}

function getProductWithId(id: number, products: Product[]) {
    return products.find(i => i.id === id);
}

const Container = styled.section`
    max-width: 500px;
    margin: 0 auto;
    padding: 15px;
    background: #fff;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
`

const Title = styled.h3`
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
`

const EmptyText = styled.p`
    font-size: 16px;
`

const List = styled.ul``

const Item = styled.li``

const ItemName = styled.p``

const ItemCount = styled.p``

const ItemTotalPrice = styled.p``
