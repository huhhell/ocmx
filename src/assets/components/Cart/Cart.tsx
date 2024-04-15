import styled from "styled-components";
import {Product} from "../../../App.tsx";
import {useCart} from "../../context/ProductsContext.tsx";
import InputMask from 'react-input-mask';

interface Props {
    products: Product[];
}

export default function Cart({products}: Props) {
    const items = useCart();

const itemsInCart = items.map(i => {
    const product = getProductWithId(i.id, products);
    if (product === undefined) return

    return <Item key={i.id}>
        <ItemName>{product.title}</ItemName>
        <ItemEndCnt>
            <ItemCount>x{i.quantity}</ItemCount>
            <ItemTotalPrice>{product.price * i.quantity}₽</ItemTotalPrice>
        </ItemEndCnt>
    </Item>
})

    return <Container>
        <Title>Добавленные товары</Title>
        {items.length === 0 ?
            <EmptyText>Корзина пуста</EmptyText> :
            <List>
                {itemsInCart}
            </List>}
        <Form action='#'>
            <PhoneInput mask='+7 (999) 999-9999' placeholder='+7 (___) ___-____'/>
            <SubmitButton>Заказать</SubmitButton>
        </Form>
    </Container>
}

function getProductWithId(id: number, products: Product[]) {
    return products.find(i => i.id === id);
}

const Container = styled.section`
    max-width: 500px;
    margin: 0 auto 50px auto;
    padding: 15px;
    background: #fff;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
`

const Title = styled.h3`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
    text-align: center;
`

const EmptyText = styled.p`
    font-size: 16px;
    margin-bottom: 30px;
`

const List = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Item = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
`

const ItemName = styled.p`
    font-size: 16px;
    word-wrap: break-word;
`

const ItemEndCnt = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 20px;
`

const ItemCount = styled.p`
    font-size: 16px;
`

const ItemTotalPrice = styled.p`
    font-size: 16px;
`

const Form = styled.form`
    display: flex;
    justify-content: space-between;
    gap: 30px;
`

const PhoneInput = styled(InputMask)`
    flex: 0 1 50%;
    padding: 10px;
    background: #000;
    color: #fff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;

    &::placeholder {
        color: #fff;
    }
`

const SubmitButton = styled.button`
    flex: 0 0 50%;
    padding: 10px;
    background: #000;
    color: #fff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
`


