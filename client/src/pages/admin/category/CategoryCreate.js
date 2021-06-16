import React, {useState, useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {
    MDBBtn,
    MDBContainer, MDBIcon,
    MDBInputGroup,
    MDBInputGroupElement,
    MDBListGroup,
    MDBListGroupItem
} from "mdb-react-ui-kit";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {createCategory, removeCategory, getCategories} from "../../../functions/category";
import {Link} from "react-router-dom";

const CategoryCreate = () => {
    const {user} = useSelector(state => ({...state}))
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])

    const loadCategories = () => (
        getCategories()
            .then((c) => setCategories(c.data))
    )

    useEffect(() => {
        loadCategories()
    }, [])

    const handleRemove = async (slug) => {
        if (window.confirm(`Are you sure to delete ${slug}?`)) {
            setLoading(true)
            removeCategory(slug, user.token)
                .then((res) => {
                    setLoading(false)
                    toast.success(`${res.data.slug} deleted`)
                    loadCategories()
                })
                .catch((err) => {
                    setLoading(false)
                    if (err.response.status === 400) {
                        toast.error(err.response.data)
                    }
                })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        createCategory({name}, user.token)
            .then((res) => {
                setLoading(false)
                setName('')
                toast.success(`"${res.data.slug}" is created`)
                loadCategories()
            })
            .catch((err) => {
                setLoading(false)
                if (err.response.status === 400) {
                    toast.error(err.response.data)
                }
            })
    }

    const CategoryForm = () => (
        <form onSubmit={handleSubmit} className='px-0'>
            <label className='form-label px-3'>
                Name
            </label>
            <MDBInputGroup className='w-75 px-3'>
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
                    <h4 className=' mt-3 text-uppercase'>Create category</h4>
                    {CategoryForm()}
                    <MDBContainer className='p-0'>
                        <MDBListGroup className='w-75 px-3' horizontal>
                            <MDBListGroupItem disabled active aria-current='true' className='w-100'>
                                Categories
                            </MDBListGroupItem>
                        </MDBListGroup>
                        {categories.map((c) => (
                            <MDBListGroup className='px-3 w-75' horizontal key={c._id}>
                                <MDBListGroupItem className='w-100'>
                                    {c.slug}
                                </MDBListGroupItem>
                                <MDBListGroupItem>
                                    <Link to={`/admin/category/${c.name}`}>
                                        <MDBIcon icon='edit' className='text-warning'/>
                                    </Link>
                                </MDBListGroupItem>
                                <MDBListGroupItem>
                                    <Link to={'/admin/category'} onClick={() => handleRemove(c.slug)}>
                                        <MDBIcon icon='trash-alt' className='text-danger'/>
                                    </Link>
                                </MDBListGroupItem>
                            </MDBListGroup>
                        ))}
                    </MDBContainer>
                </div>
            </div>
        </MDBContainer>
    )
}

export default CategoryCreate