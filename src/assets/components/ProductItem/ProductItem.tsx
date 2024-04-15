import styled from "styled-components";
import {Product} from "../../../App.tsx";
import {useCart, useCartDispatch} from "../../context/ProductsContext.tsx";
import {CartActionKind} from "../../reducers /CartReducer.tsx";
import plusImg from '../../img/plus.svg';
import minusImg from '../../img/minus.svg';


interface Props {
    product: Product;
}

export default function ProductItem({product}: Props) {
    const cart = useCart();
    const idOfProductInCart = cart.findIndex((i) => product.id === i.id)
    const dispatch = useCartDispatch();

    const addToCartHandler = () => {
        dispatch && dispatch({type: CartActionKind.ADD, itemId: product.id})
    }

    const increaseProductHandler = () => {
        dispatch && dispatch({type: CartActionKind.INCREASE, itemId: product.id})
    }

    const decreaseProductHandler = () => {
        dispatch && dispatch({type: CartActionKind.DECREASE, itemId: product.id})
    }

    return <Item>
        <ItemUpCnt>
            <ItemImgCnt>
                <ItemImg src={product.image_url}/>
            </ItemImgCnt>
            <ItemName>{product.title}</ItemName>
            <ItemDescription>{product.description}</ItemDescription>
        </ItemUpCnt>
        <ItemDownCnt>
            <ItemPrice>Цена: {product.price}₽</ItemPrice>

            {idOfProductInCart === -1 ?
                <ItemAddToCart onClick={addToCartHandler}>Купить</ItemAddToCart> :
                <ItemChange>
                    <ItemChangeButton onClick={decreaseProductHandler}>
                        <Icon src={minusImg} />
                    </ItemChangeButton>
                    <ItemAmount>{cart[idOfProductInCart].quantity}</ItemAmount>
                    <ItemChangeButton onClick={increaseProductHandler}>
                        <Icon src={plusImg}/>
                    </ItemChangeButton>
                </ItemChange>
            }
        </ItemDownCnt>
    </Item>
}


const Item = styled.li`
    padding: 20px;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const ItemUpCnt = styled.div`

`

const ItemDownCnt = styled.div`

`

const ItemImgCnt = styled.div`
    width: 100%;
    aspect-ratio: 4/5;
    margin-bottom: 20px;
`

const ItemImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const ItemName = styled.h5`
    font-size: 24px;
    font-weight: 500;
    word-wrap: break-word;
    overflow: hidden;
    margin-bottom: 20px;
`

const ItemDescription = styled.p`
    font-size: 16px;
    line-height: 120%;
    word-wrap: break-word;
    margin-bottom: 20px;
`

const ItemPrice = styled.p`
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 20px;
    text-align: center;
`

const ItemAddToCart = styled.button`
    text-align: center;
    padding: 15px;
    color: #fff;
    font-size: 24px;
    background: #000;
    width: 100%;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
`

const ItemChange = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    height: 58px;
`

const ItemChangeButton = styled.button`
    font-size: 30px;
    padding: 5px;
    background: #000;
    color: #fff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
`


const ItemAmount = styled.p`
    text-align: center;
    padding: 15px;
    font-size: 40px;
    line-height: unset;
    background: #000;
    color: #fff;
    width: 100%;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
`

const Icon = styled.img`
    width: 40px;
    height: auto;
`

