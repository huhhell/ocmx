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
    border: 5px solid #000;
`

const Title = styled.h5`
    font-size: 35px;
    font-weight: 600;
    margin-bottom: 20px;
`

const Text = styled.p`
    font-size: 24px;
`
