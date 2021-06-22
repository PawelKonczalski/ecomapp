import React, {useEffect, useState} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {MDBContainer} from "mdb-react-ui-kit";
import {getProductsByCount} from "../../../functions/product";
import AdminProductCart from "../../../components/cards/AdminProductCart";
import {removeProduct} from "../../../functions/product";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";


const AllProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const {user} = useSelector((state) => ({...state}))

    useEffect(() => {
        loadAllProducts()
    }, [])

    const loadAllProducts = () => {
        setLoading(true)
        getProductsByCount(100)
            .then((res) => {
                setProducts(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }

    const handleRemove = (slug) => {
        let answer = window.confirm('Delete?')
        if (answer){
            removeProduct(slug, user.token)
                .then(res => {
                    loadAllProducts()
                    toast.success(`${res.data.title} is deleted`)
                }).catch(err =>{
                if (err.response.status === 400) {
                    toast.error(err.response.data)
                }
            })
        }
    }

    return (
        <MDBContainer className='p-0 d-flex' fluid>
            <MDBContainer className='w-25'>
                <AdminNav/>
            </MDBContainer>
            <MDBContainer className='d-flex row w-75'>
                {loading ? <h4 className={'text-danger my-4 ps-3 text-uppercase'}>Loading...</h4> : <h4 className={'my-4 ps-3 text-uppercase'}>All Products</h4>}
                {products.map((product) => (<AdminProductCart product={product} key={product._id} handleRemove={handleRemove}/>))}
            </MDBContainer>
        </MDBContainer>
    )
}

export default AllProducts