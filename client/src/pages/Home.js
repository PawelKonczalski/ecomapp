import React, {useEffect, useState} from "react";
import {getProductsByCount} from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import {MDBCol, MDBContainer} from "mdb-react-ui-kit";
import Jumbotron from "../components/cards/Jumbotron";

const Home = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadAllProduct()
    }, [])

    const loadAllProduct = () => {
        setLoading(true)
        getProductsByCount(3)
            .then((res) => {
                setProducts(res.data)
                setLoading(false)
            })
    }

    return (
        <MDBContainer fluid>
            <Jumbotron text={['Put it on yourself ', 'Grow with the best', 'Be who you want']}/>
            <MDBContainer>{loading ? (<h4>Loading...</h4>) : (<h4>All Products</h4>)}</MDBContainer>
            <MDBContainer className={'d-flex align-items-start bg-light mb-3'}>{products.map((product) => (
                <MDBContainer key={product._id}>
                   <MDBCol> <ProductCard product={product}/> </MDBCol>
                </MDBContainer>
            ))}
            </MDBContainer>
        </MDBContainer>
    )
}
export default Home