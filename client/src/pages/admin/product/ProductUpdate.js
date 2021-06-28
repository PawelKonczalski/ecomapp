import React, {useEffect, useState} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {MDBContainer, MDBSpinner} from "mdb-react-ui-kit";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {updateProduct} from "../../../functions/product";
import {getCategories, getCategorySubs} from "../../../functions/category";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import FileUpload from "../../../components/forms/FileUpload";
import {getProduct} from "../../../functions/product";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
    title: '',
    slug: '',
    description: '',
    price: '',
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

const ProductUpdate = ({match, history}) => {
    const [values, setValues] = useState(initialState)
    const [subOptions, setSubOptions] = useState([])
    const [loading, setLoading] = useState(false)
    const [showSub, setShowSubs] = useState(false)
    const [categories, setCategories] = useState([])
    const [arrayOfSub, setArrayOfSub] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const {user} = useSelector((state) => ({...state}))
    const {slug} = match.params

    useEffect(() => {
        loadProduct()
        loadCategories()
    }, []);

    const loadProduct = () => {
        getProduct(slug)
            .then((p) => {
                setValues({...values, ...p.data})
                getCategorySubs(p.data.category._id)
                    .then((res) => {
                        setSubOptions(res.data)
                    })
                let arr = []
                p.data.subs.map((s) => {
                    arr.push(s._id)
                })
                setArrayOfSub((prev) => arr)
            })
    }

    const loadCategories = () => (
        getCategories()
            .then((c) => setCategories(c.data))
    )

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        values.subs = arrayOfSub
        values.category = selectedCategory ? selectedCategory : values.category
        updateProduct(slug, values, user.token)
            .then((res) => {
                setLoading(false)
                toast.success(`${res.data.title} is updated`)
                history.push('/admin/products')
            }).catch(err => {
                console.log(err)
                setLoading(false)
                toast.error(err.response.data.err)
        })
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleCategoryChange = (e) => {
        e.preventDefault()
        setValues({...values, subs: []})
        setSelectedCategory(e.target.value)
        getCategorySubs(e.target.value)
            .then((res) => {
                setSubOptions(res.data)
            })
        if (values.category._id === e.target.value){
            loadProduct()
        }
        setArrayOfSub([])
    }

    return (
        <MDBContainer className='p-0 d-flex' fluid>
            <MDBContainer className='w-25'>
                <AdminNav/>
            </MDBContainer>
            <MDBContainer className='d-flex row w-75'>
                {loading ?     <MDBSpinner role='status' className={'m-4 p-4 text-danger'}>
                    <span className='visually-hidden'>Loading...</span>
                </MDBSpinner> : <h4 className='my-4 ps-3 text-uppercase'>Product Update</h4>}
                <FileUpload values={values} setValues={setValues} setLoading={setLoading}/>
                <ProductUpdateForm handleSubmit={handleSubmit} handleChange={handleChange} setValues={setValues}
                                   values={values} handleCategoryChange={handleCategoryChange} categories={categories}
                                   subOptions={subOptions} arrayOfSub={arrayOfSub} setArrayOfSub={setArrayOfSub}
                                   selectedCategory={selectedCategory}/>
            </MDBContainer>
        </MDBContainer>
    )
}

export default ProductUpdate