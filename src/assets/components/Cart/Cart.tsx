import styled from "styled-components";
import {Product} from "../../../App.tsx";
import {useCart} from "../../context/ProductsContext.tsx";
// @ts-ignore
import InputMask from "react-input-mask";
import {ChangeEventHandler, MouseEventHandler, useEffect, useState} from "react";
import axios from "axios";
import Popup from "../Popup/Popup.tsx";

interface Props {
    products: Product[];
}

export interface Response {
    success: 0 | 1;
    error?: string;
}

export default function Cart({products}: Props) {
    const [phone, setPhone] = useState('');
    const [response, setResponse] = useState<Response>();
    const [isPopupShown, setIsPopupShown] = useState(false);
    const cart = useCart();


    useEffect(() => {
        let timeout: number;
        if (isPopupShown) {
            timeout = setTimeout(() => setIsPopupShown(false), 5000)
        }

        return () => clearTimeout(timeout)
    })

    const changePhoneHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPhone(e.target.value);
    }

    const sendFormHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        const phoneWithoutSymbols = phone.replace(/[+()-]/g, '').replace(/ +/g, '');

        const dataToSend = {
            phone: phoneWithoutSymbols,
            cart: cart
        }

        try {
            axios.post('http://o-complex.com:1337/order', dataToSend)
                .then(response => {
                    setResponse(response.data);
                    setIsPopupShown(true);
                });
        } catch (error) {
            console.error(error);
        }
    }

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

    return <>
        <Container>
            <Title>Добавленные товары</Title>
            {items.length === 0 ?
            <EmptyText>Корзина пуста</EmptyText> :
            <List>
                {itemsInCart}
            </List>}
            <Form action='#'>
                <PhoneInput mask='+7 (999) 999-9999' placeholder='+7 (___) ___-____' onChange={changePhoneHandler}/>
                <SubmitButton onClick={sendFormHandler}>Заказать</SubmitButton>
            </Form>
        </Container>
        { isPopupShown && <Popup response={response}/>}
    </>
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
    margin-bottom: 30px;
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
    
    @media(max-width: 600px) {
        flex-direction: column;
        gap: 10px;
    }
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


