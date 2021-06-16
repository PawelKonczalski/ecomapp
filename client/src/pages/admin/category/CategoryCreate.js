import React, {useState, useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {
    MDBContainer, MDBIcon, MDBListGroup,
    MDBListGroupItem
} from "mdb-react-ui-kit";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {createCategory, removeCategory, getCategories} from "../../../functions/category";
import {Link} from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
    const {user} = useSelector(state => ({...state}))
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState('')

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

    const searched = (search) => (c) => c.slug.toLowerCase().includes(search)

    return (
        <MDBContainer className='p-0' fluid>
            <div className='d-flex'>
                <div className='w-25'>
                    <AdminNav/>
                </div>
                <div className='d-flex row w-75'>
                    <h4 className='m-4 text-uppercase'>Create category</h4>
                    <CategoryForm handleSubmit={handleSubmit} setName={setName} loading={loading} name={name}/>
                    <MDBContainer className='w-75 m-0 px-3 mb-3'>
                        <LocalSearch search={search} setSearch={setSearch}/>
                    </MDBContainer>
                    <MDBContainer className='p-0'>
                        <MDBListGroup className='w-75 px-3' horizontal>
                            <MDBListGroupItem disabled active aria-current='true' className='w-100'>
                                Categories
                            </MDBListGroupItem>
                        </MDBListGroup>
                        {categories.filter(searched(search)).map((c) => (
                            <MDBListGroup className='px-3 w-75' horizontal key={c._id}>
                                <MDBListGroupItem className='w-100'>
                                    {c.slug}
                                </MDBListGroupItem>
                                <MDBListGroupItem>
                                    <Link to={`/admin/category/${c.slug}`}>
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