import React, {useEffect, useState} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {MDBContainer} from "mdb-react-ui-kit";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {createProduct} from "../../../functions/product";
import {getCategories, getCategorySubs} from "../../../functions/category";
import ProductCreateForm from "../../../functions/ProductCreateForm";

const initialState = {
    title: '',
    slug: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    subs: [],
    quantity: '',
    images: [],
    shipment: ['YES', 'NO'],
    languages: ['english', 'german', 'polish', 'italian', 'spanish'],
    brands: ['animals', 'architecture', 'nature', 'people', 'tech'],
    shipping: '',
    language: '',
    brand: ''
}

const ProductCreate = () => {
    const [values, setValues] = useState(initialState)
    const [subOptions, setSubOptions] = useState([])
    const [showSub, setShowSubs] = useState(false)
    const {user} = useSelector((state) => ({...state}))

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = () => (
        getCategories()
            .then((c) => setValues({...values, categories: c.data}))
    )

    const handleSubmit = (e) => {
        e.preventDefault()
        createProduct(values, user.token)
            .then(res => {
                window.alert(`"${res.data.title}" is created`)
                window.location.reload()
            })
            .catch(err => {
                toast.error(err.response.data.err)
            })
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleCategoryChange = (e) => {
        e.preventDefault()
        setValues({...values, subs: [], category: e.target.value})
        getCategorySubs(e.target.value)
            .then(res => {
                setSubOptions(res.data)
            })
        setShowSubs(true)

    }

    return (
        <MDBContainer className='p-0 d-flex' fluid>
            <MDBContainer className='w-25'>
                <AdminNav/>
            </MDBContainer>
            <MDBContainer className='d-flex row w-75'>
                <h4 className='my-4 ps-3 text-uppercase'>Create Product</h4>
                <MDBContainer className='p-3'>
                    <ProductCreateForm handleSubmit={handleSubmit} handleChange={handleChange}
                                       handleCategoryChange={handleCategoryChange} subOptions={subOptions}
                                       setValues={setValues} showSub={showSub} values={values}/>
                </MDBContainer>
            </MDBContainer>
        </MDBContainer>
    )
}

export default ProductCreate