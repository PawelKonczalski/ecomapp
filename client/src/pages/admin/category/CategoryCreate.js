import React, {useState, useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {MDBBtn, MDBContainer, MDBInputGroup, MDBInputGroupElement} from "mdb-react-ui-kit";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {createCategory, removeCategory, getCategories} from "../../../functions/category";

const CategoryCreate = () => {
    const {user} = useSelector(state => ({...state}))
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])

    const loadCategories = () => {
        getCategories()
            .then((c) => setCategories(c.data))
    }

    useEffect(() => {
        loadCategories()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        createCategory({name}, user.token)
            .then((res) => {
                setLoading(false)
                setName('')
                toast.success(`"${res.data.slug}" is created`)
            })
            .catch((err) => {
                setLoading(false)
                if (err.response.status === 400) {
                    toast.error(err.response.data)
                }
            })
    }

    const CategoryForm = () => (
        <form onSubmit={handleSubmit} className='w-50'>
            <label className='form-label'>
                Name
            </label>
            <MDBInputGroup>
                {loading ? <h4 className='text-danger'>Loading...</h4> :
                    <MDBInputGroupElement type='text' onChange={(e) => setName(e.target.value)}
                                          placeholder="Category name" autoFocus required/>}
                <MDBBtn type='submit' disabled={loading} outline>Button</MDBBtn>
            </MDBInputGroup>
        </form>
    )

    return (
        <MDBContainer className='p-0' fluid>
            <div className='d-flex'>
                <div className='w-25'>
                    <AdminNav/>
                </div>
                <div className='d-flex row w-75'>
                    <h4>Create category</h4>
                    {CategoryForm()}
                    <div>
                        {JSON.stringify(categories)}
                    </div>
                </div>
            </div>
        </MDBContainer>
    )
}

export default CategoryCreate