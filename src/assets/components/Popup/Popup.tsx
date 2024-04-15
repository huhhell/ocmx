import styled from "styled-components";
import {Response} from "../Cart/Cart.tsx";

interface Props {
    response: Response | undefined;
}

export default function Popup({response}: Props) {
    if (!response) return <></>

    return <Container>
        <Title>{response.success === 0 ? 'Произошла ошибка' : "Заказ создан"}</Title>
        <Text>
            {response.success === 0 ?
                response.error :
            'Наш менеджер свяжется с вами в течение суток'}
        </Text>
    </Container>
}

const Container = styled.div`
    padding: 20px;
    background: #fff;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    max-width: 500px;
    margin: 0 auto 50px auto;
`

const Title = styled.h5`
    font-size: 35px;
    font-weight: 600;
    margin-bottom: 10px;
    text-align: center;
`

const Text = styled.p`
    font-size: 24px;
    text-align: center;
    line-height: 120%;
`
