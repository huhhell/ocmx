import styled from "styled-components";
import {useEffect, useState} from "react";
import axios from 'axios';

interface ReviewProps {
    id: number,
    text: string,
}

export default function Reviews() {
    const [data, setData] =  useState<ReviewProps[]>([]);

    useEffect(() => {
        const url = 'http://o-complex.com:1337/reviews';
        axios.get(url).then(response => setData(response.data));
    }, [])


    return <Container>
        <List>
            {data && data.map(i => <Item key={i.id}>
                <ItemTitle>Отзыв</ItemTitle>
                <ItemSubtitle>Полученный с api</ItemSubtitle>
                <ItemText dangerouslySetInnerHTML={{__html: i.text}} />
            </Item>)}
        </List>
    </Container>
}

const Container = styled.section`
    width: 100%;
    margin: 0 auto;
`

const List = styled.ul`
    display: flex;
    justify-content: center;
    gap: 20px;
    
    @media(max-width: 500px) {
        flex-direction: column;
        align-items: center;
    }
`
const Item = styled.div`
    flex: 0 0 30%;
    background: #ffffff;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    padding: 15px;  
    max-width: 300px;
    aspect-ratio: 4/5;
    
    @media(max-width: 800px) {
        flex: 0 0 50%;
        width: 50%;
        max-width: unset;
        aspect-ratio: unset;
    }
    
    @media(max-width: 500px) {
        flex: 0 0 100%;
        width: 100%;
        aspect-ratio: unset;
    }
`

const ItemTitle = styled.h5`
    font-size: 24px;
    line-height: 120%;
    margin-bottom: 5px;
`

const ItemSubtitle = styled.p`
    font-size: 16px;
    line-height: 120%;
    margin-bottom: 10px;
`

const ItemText = styled.div`

`