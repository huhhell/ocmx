import styled from "styled-components";
import Reviews from "./assets/components/Reviews /Reviews.tsx";


function App() {
    const

    return <Container>
        <Title>Тестовое задание</Title>
        <Reviews/>
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
