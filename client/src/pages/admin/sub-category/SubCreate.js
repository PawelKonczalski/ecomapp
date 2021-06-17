import React, {useEffect, useState} from "react";
import {MDBContainer, MDBIcon, MDBListGroup, MDBListGroupItem} from "mdb-react-ui-kit";
import AdminNav from "../../../components/nav/AdminNav";
import {useSelector} from "react-redux";
import {getCategories} from "../../../functions/category";
import {createSub, getSubs, removeSub} from "../../../functions/sub";
import {toast} from "react-toastify";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import {Link} from "react-router-dom";


const SubCreate = () => {
    const {user} = useSelector(state => ({...state}))
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [subs, setSubs] = useState([])
    const [category, setCategory] = useState('')
    const [search, setSearch] = useState('')

    const loadCategories = () => (
        getCategories()
            .then((c) => setCategories(c.data))
    )

    const loadSubs = () => (
        getSubs()
            .then((s) => setSubs(s.data))
    )

    useEffect(() => {
        loadCategories()
        loadSubs()
    }, [])

    const handleRemove = async (slug) => {
        if (window.confirm(`Are you sure to delete ${slug}?`)) {
            setLoading(true)
            removeSub(slug, user.token)
                .then((res) => {
                    setLoading(false)
                    toast.success(`${res.data.slug} deleted`)
                    loadSubs()
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
        createSub({name, parent: category}, user.token)
            .then((res) => {
                setLoading(false)
                setName('')
                toast.success(`"${res.data.slug}" is created`)
                loadSubs()
            })
            .catch((err) => {
                setLoading(false)
                if (err.response.data === 400) {
                    toast.error(err.response.data)
                }
            })
    }

    const searched = (search) => (c) => c.slug.toLowerCase().includes(search)

    return (
        <MDBContainer className='p-0 d-flex' fluid>
            <MDBContainer className='w-25'>
                <AdminNav/>
            </MDBContainer>
            <MDBContainer className='d-flex row w-75'>
                <h4 className='my-4 ps-3 text-uppercase'>Create sub-category</h4>
                <MDBContainer className='w-75 m-0 px-3 my-3'>
                    <h5>Categories</h5>
                    <select name="category" id="" className='form-control w-50 bg-info text-white'
                            onChange={e => setCategory(e.target.value)} defaultValue={'default'}>
                        <option value='default' disabled>Please select</option>
                        {categories.length > 0 && categories.map((c) => (
                            <option key={c._id} value={c._id}>{c.slug}</option>))}
                    </select>
                </MDBContainer>
                <CategoryForm handleSubmit={handleSubmit} setName={setName} loading={loading} name={name}
                              header={'Sub-category name'}/>
                <MDBContainer className='w-75 m-0 px-3 mb-3'>
                    <LocalSearch search={search} setSearch={setSearch}/>
                </MDBContainer>
                <MDBContainer className='p-0'>
                    <MDBListGroup className='w-75 px-3' horizontal>
                        <MDBListGroupItem disabled active aria-current='true' className='w-100'>
                            Categories
                        </MDBListGroupItem>
                    </MDBListGroup>
                    {subs.filter(searched(search)).map((s) => (
                        <MDBListGroup className='px-3 w-75' horizontal key={s._id}>
                            <MDBListGroupItem className='w-100'>
                                {s.slug}
                            </MDBListGroupItem>
                            <MDBListGroupItem>
                                <Link to={`/admin/sub/${s.slug}`}>
                                    <MDBIcon icon='edit' className='text-warning'/>
                                </Link>
                            </MDBListGroupItem>
                            <MDBListGroupItem>
                                <Link to={'/admin/sub'} onClick={() => handleRemove(s.slug)}>
                                    <MDBIcon icon='trash-alt' className='text-danger'/>
                                </Link>
                            </MDBListGroupItem>
                        </MDBListGroup>
                    ))}
                </MDBContainer>
            </MDBContainer>
        </MDBContainer>
    )
}

export default SubCreate