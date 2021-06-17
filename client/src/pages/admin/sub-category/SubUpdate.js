import React, {useEffect, useState} from "react";
import {MDBContainer} from "mdb-react-ui-kit";
import AdminNav from "../../../components/nav/AdminNav";
import {useSelector} from "react-redux";
import {getCategories} from "../../../functions/category";
import {updateSub, getSub} from "../../../functions/sub";
import {toast} from "react-toastify";
import CategoryForm from "../../../components/forms/CategoryForm";

const SubUpdate = ({match, history}) => {
    const {user} = useSelector(state => ({...state}))
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [parent, setParent] = useState('')

    useEffect(() => {
        loadCategories()
        loadSub()
    }, [])

    const loadCategories = () => (
        getCategories()
            .then((c) => setCategories(c.data))
    )

    const loadSub = () => (
        getSub(match.params.slug)
            .then((s) => {
                setName(s.data.slug)
                setParent(s.data.parent)
            })
    )

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        updateSub(match.params.slug, {name, parent}, user.token)
            .then((res) => {
                setLoading(false)
                setName('')
                toast.success(`"${res.data.slug}" is update`)
                history.push('/admin/sub')
            })
            .catch((err) => {
                setLoading(false)
                if (err.response.data === 400) {
                    toast.error(err.response.data)
                }
            })
    }

    return (
        <MDBContainer className='p-0 d-flex' fluid>
            <MDBContainer className='w-25'>
                <AdminNav/>
            </MDBContainer>
            <MDBContainer className='d-flex row w-75'>
                <h4 className='my-4 ps-3 text-uppercase'>Update sub-category</h4>
                <MDBContainer className='w-75 m-0 px-3 my-3'>
                    <h5>Categories</h5>
                    <select name="category" id="" className='form-control w-50 bg-info text-white'
                            onChange={e => setParent(e.target.value)}>
                        {categories.length > 0 && categories.map((c) => (
                            <option key={c._id} value={c._id} selected={c._id === parent}>{c.slug}</option>))}
                    </select>
                </MDBContainer>
                <CategoryForm handleSubmit={handleSubmit} setName={setName} loading={loading} name={name}
                              header={'Sub-category name'}/>
            </MDBContainer>
        </MDBContainer>
    )
}

export default SubUpdate