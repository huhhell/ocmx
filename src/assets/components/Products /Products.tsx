import styled from "styled-components";
import {Page} from "../../../App.tsx";
import ProductItem from "../ProductItem/ProductItem.tsx";


interface Props {
    page: Page | undefined;
}
export default function Products({page}: Props) {
    const products = page?.products

    return <Container>
        {products?.length === 0 ?
            <EmptyText>Пока что здесь нет товаров</EmptyText> :
            <List>
                {products?.map(i => <ProductItem product={i} key={i.id}/>)}
            </List>
        }

    </Container>
}

const Container = styled.div``

const EmptyText = styled.p`
    font-size: 20px;
    padding: 10px;
    background: #fff;
`

const List = styled.ul`
    display: grid;
    grid-template: repeat(2, 1fr) / repeat(3, 31%);
    gap: 20px;
    justify-content: space-between;
    
    @media(max-width: 1000px) {
        grid-template: repeat(2, 1fr) / repeat(2, 48%);
    }
    
    @media(max-width: 600px) {
        grid-template: repeat(2, 1fr) / repeat(1, 100%);
    }
`

