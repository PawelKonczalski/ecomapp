import React, {useState, useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {MDBContainer} from "mdb-react-ui-kit";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {getCategory, updateCategory} from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryUpdate = ({history, match}) => {
    const {user} = useSelector(state => ({...state}))
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
            getCategory(match.params.slug)
                .then((c) => setName(c.data.slug))
    }, [match])

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        updateCategory(match.params.slug, {name}, user.token)
            .then((res) => {
                setLoading(false)
                setName('')
                toast.success(`"${res.data.slug}" is updated`)
                history.push('/admin/category')
            })
            .catch((err) => {
                setLoading(false)
                if (err.response.status === 400) {
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
                    <h4 className=' my-4 text-uppercase'>Update category</h4>
                    <CategoryForm handleSubmit={handleSubmit} setName={setName} loading={loading} name={name}/>
                </MDBContainer>
        </MDBContainer>
    )
}

export default CategoryUpdate